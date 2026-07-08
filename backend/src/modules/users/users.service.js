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
}

module.exports = new UsersService();
