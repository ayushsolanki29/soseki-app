// src/modules/auth/auth.service.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../../database/prisma");

const { auth: authConfig } = require("../../config/app.config");
class AuthService {
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
    };
    
    const accessToken = jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });
    
    return { accessToken };
  }
}

module.exports = new AuthService();
