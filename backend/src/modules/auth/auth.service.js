// src/modules/auth/auth.service.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const prisma = require("../../database/prisma");

const { auth: authConfig } = require("../../config/app.config");
class AuthService {
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
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

    // Generate accessToken
    const payload = {
      userId: user.id,
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

  async checkEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return { exists: true };
    } else {
      const waitlist = await prisma.waitlistLead.findUnique({
        where: { email },
      });
      return { exists: false, inWaitlist: !!waitlist };
    }
  }
}

module.exports = new AuthService();
