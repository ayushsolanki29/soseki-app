// src/modules/auth/auth.service.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../../database/prisma");
const mailer = require("../../utils/mailer");
const { renderTemplate } = require("../emails/email.template");

const { auth: authConfig, server: serverConfig } = require("../../config/app.config");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
class AuthService {
  async register(name, email, password, termsAccepted) {
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
      },
    });

    // Send verification email
    try {
      const htmlBody = renderTemplate("email_verification", { 
        subject: "Verify your Soseki account",
        name: user.name,
        otpCode: otpCode 
      });

      await mailer.sendMail({
        to: user.email,
        subject: "Verify your Soseki account",
        html: htmlBody
      });
    } catch (error) {
      console.error("[AuthService] Failed to send verification email:", error);
    }

    // Generate accessToken
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      hasOrg: false,
      organizationId: null,
      emailVerified: false,
    };
    
    const accessToken = jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });

    // Generate refreshToken
    const refreshToken = crypto.randomBytes(40).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save session
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: false,
      },
    };
  }
  async login(email, password, termsAccepted) {
    const normalizedEmail = email.trim().toLowerCase();
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.passwordHash) {
      const error = new Error("Invalid email or password");
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

    // Generate accessToken
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      hasOrg: !!user.organizationId,
      organizationId: user.organizationId || null,
      emailVerified: user.emailVerified,
    };
    
    const accessToken = jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });

    // Generate refreshToken
    const refreshToken = crypto.randomBytes(40).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save session
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
      },
    };
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
    });

    if (user) {
      return { exists: true, termsAcceptedAt: user.termsAcceptedAt };
    } else {
      const waitlist = await prisma.waitlistLead.findUnique({
        where: { email: normalizedEmail },
      });
      return { exists: false, inWaitlist: !!waitlist };
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

    try {
      const htmlBody = renderTemplate("email_verification", { 
        subject: "Verify your Soseki account",
        name: user.name,
        otpCode: otpCode 
      });

      await mailer.sendMail({
        to: user.email,
        subject: "Verify your Soseki account",
        html: htmlBody
      });
    } catch (error) {
      console.error("[AuthService] Failed to send verification email:", error);
    }
    
    return true;
  }
}

module.exports = new AuthService();
