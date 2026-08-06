// src/modules/auth/auth.service.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../../database/prisma");
const mailer = require("../../utils/mailer");
const { renderTemplate } = require("../emails/email.template");

const { auth: authConfig } = require("../../config/app.config");
const sessionService = require("./session.service");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
class AuthService {
  async register(name, email, password, termsAccepted, country, timezone) {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.status = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const otpCode = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        termsAcceptedAt: termsAccepted ? new Date() : null,
        otpCode,
        otpExpiresAt,
        otpLastSentAt: new Date(),
        country: country || null,
        timezone: timezone || null,
      },
    });

    // Send verification email in the background
    const htmlBody = renderTemplate("email_verification", { 
      subject: "Verify your Soseki account",
      name: user.name,
      otpCode: otpCode 
    });

    mailer.sendMail({
      to: user.email,
      subject: "Verify your Soseki account",
      html: htmlBody
    }).catch(error => {
      console.error("[AuthService] Failed to send verification email:", error);
    });

    return await sessionService.createSession(user);
  }
  async login(email, password, termsAccepted) {
    const normalizedEmail = email.trim().toLowerCase();
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    if (!user.passwordHash) {
      const error = new Error("This account uses social login. Please sign in with Google.");
      error.status = 401;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    if (termsAccepted && !user.termsAcceptedAt) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { termsAcceptedAt: new Date() }
      });
    }

    return await sessionService.createSession(user);
  }

  async logout(refreshToken) {
    if (refreshToken) {
      try {
        await prisma.session.delete({
          where: { refreshToken },
        });
      } catch (error) {
        // If session doesn't exist, ignore the error (idempotent logout)
        if (error.code !== 'P2025') throw error;
      }
    }
  }

  async checkEmail(email) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { authProviders: true }
    });

    if (user) {
      return { 
        exists: true, 
        termsAcceptedAt: user.termsAcceptedAt,
        hasPassword: !!user.passwordHash,
        authProviders: user.authProviders.map(p => p.provider)
      };
    } else {
      return { exists: false, inWaitlist: false };
    }
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      const error = new Error("No refresh token provided");
      error.status = 401;
      throw error;
    }

    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || new Date() > session.expiresAt) {
      if (session) {
        await prisma.session.delete({ where: { id: session.id } });
      }
      const error = new Error("Invalid or expired refresh token");
      error.status = 401;
      throw error;
    }

    const payload = {
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name,
      hasOrg: !!session.user.organizationId,
      organizationId: session.user.organizationId || null,
      emailVerified: session.user.emailVerified,
    };
    
    const accessToken = jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });
    
    return { accessToken };
  }

  async verifyEmail(userId, otp) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
    if (user.emailVerified) return true;

    if (!user.otpCode || !user.otpExpiresAt || user.otpCode !== otp) {
      throw Object.assign(new Error("Invalid verification code"), { status: 400 });
    }

    if (new Date() > user.otpExpiresAt) {
      throw Object.assign(new Error("Verification code expired"), { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: true,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    return true;
  }

  async resendVerification(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
    if (user.emailVerified) throw Object.assign(new Error("Email already verified"), { status: 400 });

    // 1 minute cooldown
    if (user.otpLastSentAt && new Date(Date.now() - 60000) < user.otpLastSentAt) {
      throw Object.assign(new Error("Please wait a minute before requesting a new code"), { status: 429 });
    }

    const otpCode = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { id: userId },
      data: {
        otpCode,
        otpExpiresAt,
        otpLastSentAt: new Date(),
      },
    });

    const htmlBody = renderTemplate("email_verification", { 
      subject: "Verify your Soseki account",
      name: user.name,
      otpCode: otpCode 
    });

    mailer.sendMail({
      to: user.email,
      subject: "Verify your Soseki account",
      html: htmlBody
    }).catch(error => {
      console.error("[AuthService] Failed to send verification email:", error);
    });
    
    return true;
  }

  async forgotPassword(email) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // For security, don't reveal if user exists
      return true;
    }

    const resetPasswordOtp = generateOTP();
    const resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordOtp,
        resetPasswordExpiresAt,
      },
    });

    const htmlBody = renderTemplate("email_reset_password", { 
      subject: "Reset your Soseki password",
      name: user.name || user.email,
      otpCode: resetPasswordOtp 
    });

    mailer.sendMail({
      to: user.email,
      subject: "Reset your Soseki password",
      html: htmlBody
    }).catch(error => {
      console.error("[AuthService] Failed to send password reset email:", error);
    });

    return true;
  }

  async verifyResetOtp(email, otp) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) throw Object.assign(new Error("Invalid request"), { status: 400 });

    if (!user.resetPasswordOtp || !user.resetPasswordExpiresAt) {
      throw Object.assign(new Error("No reset code requested"), { status: 400 });
    }

    if (user.resetPasswordExpiresAt < new Date()) {
      throw Object.assign(new Error("Reset code has expired"), { status: 400 });
    }

    if (user.resetPasswordOtp !== otp) {
      throw Object.assign(new Error("Invalid reset code"), { status: 400 });
    }

    return true;
  }

  async resetPassword(email, otp, newPassword) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) throw Object.assign(new Error("Invalid request"), { status: 400 });

    if (!user.resetPasswordOtp || !user.resetPasswordExpiresAt || user.resetPasswordOtp !== otp) {
      throw Object.assign(new Error("Invalid reset code"), { status: 400 });
    }

    if (new Date() > user.resetPasswordExpiresAt) {
      throw Object.assign(new Error("Reset code expired"), { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordOtp: null,
        resetPasswordExpiresAt: null,
      },
    });

    return true;
  }
}

module.exports = new AuthService();
