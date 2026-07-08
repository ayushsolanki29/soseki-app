// src/modules/super-admin/super-admin.service.js
const prisma = require("../../database/prisma");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

class SuperAdminService {
  async getCharts() {
    // Return mock data for super admin dashboard charts
    return {
      revenueOverview: [
        { month: "Jan", revenue: 20000, expenses: 15000 },
        { month: "Feb", revenue: 22000, expenses: 16000 },
        { month: "Mar", revenue: 25000, expenses: 18000 },
        { month: "Apr", revenue: 28000, expenses: 17000 },
        { month: "May", revenue: 32000, expenses: 19000 },
        { month: "Jun", revenue: 35000, expenses: 20000 },
        { month: "Jul", revenue: 40000, expenses: 22000 },
        { month: "Aug", revenue: 45000, expenses: 24000 },
      ],
      growthPctNum: 15.3,
      invoiceStatus: [
        { status: "Paid", share: 65, fill: "var(--color-paid)" },
        { status: "Pending", share: 20, fill: "var(--color-pending)" },
        { status: "Overdue", share: 10, fill: "var(--color-overdue)" },
        { status: "Draft", share: 5, fill: "var(--color-draft)" },
      ],
    };
  }

  async createUser(data) {
    const { name, email } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.status = 400;
      throw error;
    }

    // Generate a secure random password
    const password = crypto.randomBytes(8).toString("hex");
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return { user, password };
  }

  async getOrganizations() {
    const organizations = await prisma.organization.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
    return organizations;
  }
}

module.exports = new SuperAdminService();
