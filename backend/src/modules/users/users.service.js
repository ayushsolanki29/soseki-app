// src/modules/users/users.service.js
const prisma = require("../../database/prisma");
const bcrypt = require("bcryptjs");

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
      }
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    return user;
  }

  async updateProfile(userId, data) {
    const { name, email, password } = data;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
      }
    });

    return updatedUser;
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

    const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!passwordMatch) {
      const error = new Error("Invalid current password");
      error.status = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return true;
  }
}

module.exports = new UsersService();
