// src/modules/auth/session.service.js
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../../database/prisma");
const { auth: authConfig } = require("../../config/app.config");

class SessionService {
  /**
   * Generates tokens and creates a session in the database.
   * @param {Object} user - The user object from Prisma.
   * @param {Object} [metadata={}] - Optional metadata for the session (ipAddress, userAgent, provider).
   */
  async createSession(user, metadata = {}) {
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      hasOrg: !!user.organizationId,
      organizationId: user.organizationId || null,
      emailVerified: user.emailVerified,
    };
    
    const accessToken = jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });

    const refreshToken = crypto.randomBytes(40).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
        provider: metadata.provider || null,
        ipAddress: metadata.ipAddress || null,
        userAgent: metadata.userAgent || null,
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
        avatarUrl: user.avatarUrl || null,
      },
    };
  }
}

module.exports = new SessionService();
