// src/modules/super-admin/super-admin.service.js
const prisma = require("../../database/prisma");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-development";

class SuperAdminService {
  async login(email, password) {
    const user = await prisma.superUser.findUnique({
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
      type: "superadmin",
    };
    
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

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

    // Generate a secure random password with mixed characters
    const generatePassword = (length = 16) => {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-_=+";
      let pwd = "";
      const randomBytes = crypto.randomBytes(length);
      for (let i = 0; i < length; i++) {
        pwd += charset[randomBytes[i] % charset.length];
      }
      return pwd;
    };
    const password = generatePassword();
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
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
            clients: true,
            invoices: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return organizations;
  }

  async getAllTickets() {
    const tickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true } },
        _count: { select: { messages: true } }
      }
    });
    return tickets;
  }

  async getAccessRequests() {
    const requests = await prisma.waitlistLead.findMany({
      orderBy: { createdAt: "desc" }
    });
    return requests;
  }
}

module.exports = new SuperAdminService();
