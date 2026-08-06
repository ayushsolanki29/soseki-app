// src/modules/users/users.service.js
const prisma = require("../../database/prisma");
const bcrypt = require("bcryptjs");
const { auth: authConfig } = require("../../config/app.config");
class UsersService {
  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        organizationId: true,
        createdAt: true,
        emailVerified: true,
        passwordHash: true,
      }
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const hasPassword = !!user.passwordHash;
    delete user.passwordHash;

    return { ...user, hasPassword };
  }

  async updateProfile(userId, data) {
    const { name, email, password } = data;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) {
      updateData.email = email;
      const currentUser = await prisma.user.findUnique({ where: { id: userId } });
      if (currentUser && currentUser.email !== email) {
        updateData.emailVerified = false;
      }
    }
    
    if (password) {
      const salt = await bcrypt.genSalt(authConfig.bcryptSaltRounds);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          emailVerified: true,
        }
      });
      return updatedUser;
    } catch (error) {
      if (error.code === 'P2002') {
        const err = new Error("This email is already in use by another account");
        err.status = 400;
        throw err;
      }
      throw error;
    }
  }
  async updatePassword(userId, currentPassword, newPassword) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    if (user.passwordHash) {
      const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!passwordMatch) {
        const error = new Error("Invalid current password");
        error.status = 400;
        throw error;
      }
    }

    const salt = await bcrypt.genSalt(authConfig.bcryptSaltRounds);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return true;
  }
}

module.exports = new UsersService();
