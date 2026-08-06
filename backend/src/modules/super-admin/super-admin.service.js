// src/modules/super-admin/super-admin.service.js
const prisma = require("../../database/prisma");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mailer = require("../../utils/mailer");
const { renderTemplate } = require("../emails/email.template");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const { auth: authConfig, server: serverConfig } = require("../../config/app.config");
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

    // If 2FA is enabled, do not generate accessToken yet (ignore in local env)
    if (user.isTwoFactorEnabled && process.env.NODE_ENV !== "development") {
      const tempPayload = { userId: user.id, type: "superadmin-temp" };
      const tempToken = jwt.sign(tempPayload, authConfig.jwtSecret, { expiresIn: '15m' });
      return {
        requires2FA: true,
        tempToken,
      };
    }

    // Generate accessToken
    const payload = {
      userId: user.id,
      type: "superadmin",
    };
    
    const accessToken = jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async verify2FALogin(tempToken, token) {
    let payload;
    try {
      payload = jwt.verify(tempToken, authConfig.jwtSecret);
    } catch (err) {
      const error = new Error("Invalid or expired temporary token");
      error.status = 401;
      throw error;
    }

    if (payload.type !== "superadmin-temp") {
      const error = new Error("Invalid token type");
      error.status = 401;
      throw error;
    }

    const user = await prisma.superUser.findUnique({ where: { id: payload.userId } });
    if (!user || !user.isTwoFactorEnabled || !user.twoFactorSecret) {
      const error = new Error("2FA is not enabled for this user");
      error.status = 400;
      throw error;
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: token,
      window: 1, // allow 1 step before/after
    });

    if (!verified) {
      const error = new Error("Invalid 2FA code");
      error.status = 401;
      throw error;
    }

    const newPayload = {
      userId: user.id,
      type: "superadmin",
    };
    const accessToken = jwt.sign(newPayload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async getSuperAdminDetails(id) {
    const admin = await prisma.superUser.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, isTwoFactorEnabled: true }
    });
    return admin;
  }

  async generate2FA(id) {
    const admin = await prisma.superUser.findUnique({ where: { id } });
    if (!admin) throw new Error("Admin not found");

    const secret = speakeasy.generateSecret({
      name: `Soseki SuperAdmin (${admin.email})`
    });

    await prisma.superUser.update({
      where: { id },
      data: { twoFactorSecret: secret.base32 }
    });

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    return {
      secret: secret.base32,
      qrCodeUrl
    };
  }

  async verify2FASetup(id, token) {
    const admin = await prisma.superUser.findUnique({ where: { id } });
    if (!admin || !admin.twoFactorSecret) throw new Error("No 2FA setup in progress");

    const verified = speakeasy.totp.verify({
      secret: admin.twoFactorSecret,
      encoding: "base32",
      token: token,
      window: 1,
    });

    if (!verified) {
      const error = new Error("Invalid 2FA code");
      error.status = 400;
      throw error;
    }

    await prisma.superUser.update({
      where: { id },
      data: { isTwoFactorEnabled: true }
    });

    return { success: true };
  }

  async disable2FA(id, token) {
    const admin = await prisma.superUser.findUnique({ where: { id } });
    if (!admin || !admin.isTwoFactorEnabled) throw new Error("2FA is not enabled");

    const verified = speakeasy.totp.verify({
      secret: admin.twoFactorSecret,
      encoding: "base32",
      token: token,
      window: 1,
    });

    if (!verified) {
      const error = new Error("Invalid 2FA code");
      error.status = 400;
      throw error;
    }

    await prisma.superUser.update({
      where: { id },
      data: { isTwoFactorEnabled: false, twoFactorSecret: null }
    });

    return { success: true };
  }

  async updateSettings(id, data) {
    const { name, email, password } = data;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, authConfig.bcryptSaltRounds || 10);
    }
    
    return prisma.superUser.update({
      where: { id },
      data: updateData,
      select: { id: true, email: true, name: true }
    });
  }

  async getCharts() {
    // Revenue Overview (Last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const invoices = await prisma.invoice.findMany({
      where: {
        issueDate: { gte: sixMonthsAgo },
        status: { in: ['Paid', 'Partially Paid'] }
      },
      select: { totalAmount: true, issueDate: true }
    });

    const expenses = await prisma.expense.findMany({
      where: {
        date: { gte: sixMonthsAgo },
        status: 'Paid'
      },
      select: { amount: true, date: true }
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueOverview = [];
    
    for (let i = 0; i < 6; i++) {
      const targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() - (5 - i));
      const monthLabel = monthNames[targetDate.getMonth()];
      
      const monthInvoices = invoices.filter(inv => inv.issueDate.getMonth() === targetDate.getMonth() && inv.issueDate.getFullYear() === targetDate.getFullYear());
      const monthExpenses = expenses.filter(exp => exp.date.getMonth() === targetDate.getMonth() && exp.date.getFullYear() === targetDate.getFullYear());
      
      const rev = monthInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
      const exp = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
      
      revenueOverview.push({ month: monthLabel, revenue: rev, expenses: exp });
    }

    // Invoice Status Distribution
    const statusCounts = await prisma.invoice.groupBy({
      by: ['status'],
      _count: { status: true }
    });
    
    const totalInvoices = statusCounts.reduce((sum, item) => sum + item._count.status, 0);
    const getShare = (count) => totalInvoices > 0 ? Math.round((count / totalInvoices) * 100) : 0;
    
    const getColor = (status) => {
      switch (status) {
        case 'Paid': return 'var(--color-paid)';
        case 'Pending': case 'Sent': return 'var(--color-pending)';
        case 'Overdue': return 'var(--color-overdue)';
        default: return 'var(--color-draft)';
      }
    };

    const invoiceStatus = statusCounts.map(item => ({
      status: item.status,
      share: getShare(item._count.status),
      fill: getColor(item.status)
    })).sort((a, b) => b.share - a.share); // Sort largest to smallest

    // Visits Overview (Last 4 weeks)
    const twentyEightDaysAgo = new Date();
    twentyEightDaysAgo.setDate(twentyEightDaysAgo.getDate() - 28);
    twentyEightDaysAgo.setHours(0, 0, 0, 0);

    const visits = await prisma.pageVisit.findMany({
      where: {
        createdAt: { gte: twentyEightDaysAgo }
      },
      select: { createdAt: true }
    });

    const visitsOverview = [];
    
    for (let i = 0; i < 4; i++) {
      const weekStartDate = new Date(twentyEightDaysAgo);
      weekStartDate.setDate(weekStartDate.getDate() + (i * 7));
      
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6);
      
      const dayLabel = `${weekStartDate.getDate()} ${monthNames[weekStartDate.getMonth()]} - ${weekEndDate.getDate()} ${monthNames[weekEndDate.getMonth()]}`;
      
      const nextWeekDate = new Date(weekEndDate);
      nextWeekDate.setDate(nextWeekDate.getDate() + 1);
      
      const weekVisits = visits.filter(v => v.createdAt >= weekStartDate && v.createdAt < nextWeekDate);
      
      visitsOverview.push({ month: dayLabel, visits: weekVisits.length });
    }

    return {
      revenueOverview,
      invoiceStatus,
      visitsOverview,
    };
  }

  async getDashboardStats() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Parallel execution of all basic counts and aggregates
    const [
      totalOrgs, 
      activeUsers, 
      openTickets, 
      mrrResult,
      totalVisits,
      recentOrgsData,
      recentTickets,
      templateRequestsCount,
      recentSignups
    ] = await Promise.all([
      prisma.organization.count({ where: { status: 'Active' } }),
      prisma.user.count(),
      prisma.supportTicket.count({ where: { status: 'Open' } }),
      prisma.invoice.aggregate({
        where: { status: 'Paid', issueDate: { gte: thirtyDaysAgo } },
        _sum: { totalAmount: true }
      }),
      prisma.pageVisit.count(),
      prisma.organization.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { users: { take: 1, select: { email: true } } }
      }),
      prisma.supportTicket.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { organization: { select: { name: true } } }
      }),
      prisma.templateRequest.count({ where: { status: 'Pending' } }),
      prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } })
    ]);

    const mrr = mrrResult._sum.totalAmount || 0;

    // Map recent organizations
    const recentOrgs = recentOrgsData.map(org => ({
      id: org.id,
      name: org.name,
      email: org.users[0]?.email || 'No owner',
      plan: 'Standard', // Default plan since there's no billing table
      status: org.status
    }));

    // Map recent tickets
    const recentTicketsMapped = recentTickets.map(ticket => ({
      id: ticket.id.substring(0, 8).toUpperCase(),
      subject: ticket.title,
      organization: ticket.organization.name,
      priority: ticket.priority
    }));

    // Create activity timeline by combining recent orgs, tickets, and leads
    let activities = [];
    
    recentOrgsData.forEach(org => activities.push({
      id: `org-${org.id}`,
      type: 'ORG_JOINED',
      title: 'New Organization Joined',
      subtitle: `${org.name} joined Soseki`,
      date: org.createdAt,
    }));

    recentTickets.forEach(ticket => activities.push({
      id: `ticket-${ticket.id}`,
      type: 'TICKET_OPENED',
      title: 'Support Ticket Opened',
      subtitle: `${ticket.title} - ${ticket.organization.name}`,
      date: ticket.createdAt,
    }));


    // Sort by newest first, take top 5
    activities.sort((a, b) => b.date - a.date);
    const activityTimeline = activities.slice(0, 5);

    return {
      stats: {
        totalOrgs,
        activeUsers,
        mrr,
        totalVisits,
        openTickets,
        templateRequestsCount,
       
        newSignups: recentSignups,
       
      },
      recentOrgs,
      recentTickets: recentTicketsMapped,
      activityTimeline
    };
  }

  async getTrafficStats() {
    // Get total visits
    const totalVisits = await prisma.pageVisit.count();

    // Get top sources (utm_source)
    const sources = await prisma.pageVisit.groupBy({
      by: ['utmSource'],
      _count: { _all: true },
      orderBy: { _count: { utmSource: 'desc' } },
      take: 10,
    });

    // Get top referrers
    const referrers = await prisma.pageVisit.groupBy({
      by: ['referrer'],
      _count: { _all: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 10,
    });

    return {
      totalVisits,
      sources: sources.map(s => ({ source: s.utmSource || 'Direct', count: s._count._all })),
      referrers: referrers.map(r => ({ referrer: r.referrer || 'Direct', count: r._count._all })),
    };
  }

  async createUser(data) {
    const { name, email, country, timezone } = data;

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
    const passwordHash = await bcrypt.hash(password, authConfig.bcryptSaltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        country: country || null,
        timezone: timezone || null,
      },
    });

    // Send the generated credentials to the new user via email
    const emailService = require("../emails/email.service");
    emailService.queueEmail({
      to: email,
      subject: "Your new Soseki App Account",
      template: "new_account",
      context: { 
        name, 
        email, 
        password,
        loginUrl: `${serverConfig.clientUrl}/login`
      },
      category: "Transactional"
    }).catch(err => console.error("Failed to queue new account email:", err));

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
            country: true,
            timezone: true,
            emailVerified: true,
            passwordHash: true,
            authProviders: {
              select: { provider: true }
            }
          },
        },
      },
    });

    const { admin: adminConfig } = require("../../config/app.config");
    const superAdmins = await prisma.superUser.findMany({
      select: { email: true }
    });
    const superAdminEmails = superAdmins.map(admin => admin.email);
    if (adminConfig.email) superAdminEmails.push(adminConfig.email);
    superAdminEmails.push("demo@soseki.com"); // explicitly exclude demo owner

    const orphanUsers = await prisma.user.findMany({
      where: { 
        organizationId: null,
        email: { notIn: superAdminEmails }
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        timezone: true,
        emailVerified: true,
        passwordHash: true,
        authProviders: {
          select: { provider: true }
        },
        createdAt: true,
      }
    });

    const formattedOrphans = orphanUsers.map(user => ({
      id: `orphan-${user.id}`,
      isOrphanUser: true,
      name: "Not created yet",
      masterCurrency: "-",
      status: "Active",
      createdAt: user.createdAt,
      _count: {
        users: 1,
        projects: 0,
        clients: 0,
        invoices: 0,
      },
      users: [{
        id: user.id,
        name: user.name,
        email: user.email,
        country: user.country,
        timezone: user.timezone,
        emailVerified: user.emailVerified,
        authProviders: user.authProviders,
        hasPassword: !!user.passwordHash
      }]
    }));

    const transformedOrganizations = organizations.map(org => {
      const users = org.users.map(u => {
        const { passwordHash, ...rest } = u;
        return { ...rest, hasPassword: !!passwordHash };
      });
      return { ...org, users };
    });

    return [...transformedOrganizations, ...formattedOrphans];
  }

  async getOrganizationDetails(id) {
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
            clients: true,
            invoices: true,
          },
        },
        profile: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!organization) {
      const error = new Error("Organization not found");
      error.status = 404;
      throw error;
    }

    // Calculate total earnings in master currency
    const invoices = await prisma.invoice.findMany({
      where: { 
        organizationId: id,
        status: { in: ["Paid", "Partially Paid"] }
      },
      select: {
        paidAmount: true,
        exchangeRate: true
      }
    });

    const totalEarnings = invoices.reduce((acc, inv) => {
      // Assuming exchangeRate converts invoice currency to master currency
      return acc + (inv.paidAmount * (inv.exchangeRate || 1));
    }, 0);

    return { ...organization, totalEarnings };
  }

  async updateOrganization(id, data) {
    const { 
      name, masterCurrency, address, dateFormat, 
      invoiceFooterNote, expenseFooterNote, 
      invoiceTemplate, expenseTemplate, termsAndConditions 
    } = data;
    
    const organization = await prisma.organization.update({
      where: { id },
      data: {
        name,
        masterCurrency,
        address,
        dateFormat,
        profile: {
          upsert: {
            create: {
              invoiceFooterNote,
              expenseFooterNote,
              invoiceTemplate: invoiceTemplate || "soseki-modern",
              expenseTemplate: expenseTemplate || "soseki-modern",
              termsAndConditions
            },
            update: {
              invoiceFooterNote,
              expenseFooterNote,
              invoiceTemplate,
              expenseTemplate,
              termsAndConditions
            }
          }
        }
      },
    });
    return organization;
  }

  async updateUser(id, data) {
    const { name, email, password } = data;
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (password) {
      const bcrypt = require("bcryptjs");
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }
    
    return prisma.user.update({
      where: { id },
      data: updateData
    });
  }

  async deleteUser(id) {
    return prisma.user.delete({
      where: { id }
    });
  }

  async updateOrganizationStatus(id, status) {
    if (!["Active", "Blocked"].includes(status)) {
      const error = new Error("Invalid status");
      error.status = 400;
      throw error;
    }
    return prisma.organization.update({
      where: { id },
      data: { status }
    });
  }

  async deleteOrganization(id) {
    return prisma.organization.delete({
      where: { id }
    });
  }

  async sendUserEmail(id, subject, message) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const htmlBody = renderTemplate("admin_direct_message", {
      subject: subject || "Message from Soseki Support",
      name: user.name || "User",
      message
    });

    await mailer.sendMail({
      to: user.email,
      subject: subject || "Message from Soseki Support",
      html: htmlBody
    });

    return { success: true };
  }

  async changeOrgAdminPassword(id, newPassword) {
    // Find the oldest user in the org (assuming they are the admin/owner)
    const adminUser = await prisma.user.findFirst({
      where: { organizationId: id },
      orderBy: { createdAt: 'asc' },
    });

    if (!adminUser) {
      const error = new Error("No users found in this organization");
      error.status = 404;
      throw error;
    }

    const passwordHash = await bcrypt.hash(newPassword, authConfig.bcryptSaltRounds);
    const updatedUser = await prisma.user.update({
      where: { id: adminUser.id },
      data: { passwordHash },
    });

    return updatedUser;
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



  async getMailQueueStats() {
    const [pending, processing, sent, failed] = await Promise.all([
      prisma.emailQueue.count({ where: { status: "Pending" } }),
      prisma.emailQueue.count({ where: { status: "Processing" } }),
      prisma.emailQueue.count({ where: { status: "Sent" } }),
      prisma.emailQueue.count({ where: { status: "Failed" } })
    ]);

    return {
      pending,
      processing,
      sent,
      failed,
      total: pending + processing + sent + failed
    };
  }

  async getMailLogs(page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    
    const [logs, total] = await Promise.all([
      prisma.emailQueue.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
        select: {
          id: true,
          to: true,
          subject: true,
          category: true,
          status: true,
          attempts: true,
          lastError: true,
          createdAt: true,
          updatedAt: true,
        }
      }),
      prisma.emailQueue.count()
    ]);

    return {
      logs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  async getTemplateRequests() {
    return prisma.templateRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        organization: {
          select: { name: true }
        }
      }
    });
  }

  async updateTemplateRequestStatus(id, status) {
    return prisma.templateRequest.update({
      where: { id },
      data: { status }
    });
  }

  async getAiStats() {
    const [
      totalGenerations,
      successfulGenerations,
      failedGenerations,
      tokenAggregations,
      recentLogs,
      orgUsageData
    ] = await Promise.all([
      prisma.aiUsage.count(),
      prisma.aiUsage.count({ where: { success: true } }),
      prisma.aiUsage.count({ where: { success: false } }),
      prisma.aiUsage.aggregate({
        _sum: {
          promptTokens: true,
          completionTokens: true,
          totalTokens: true
        }
      }),
      prisma.aiUsage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
          organization: { select: { name: true } },
          user: { select: { name: true, email: true } }
        }
      }),
      prisma.aiUsage.groupBy({
        by: ['organizationId'],
        _count: { _all: true },
        _sum: { totalTokens: true },
        orderBy: { _count: { organizationId: 'desc' } },
        take: 10
      })
    ]);

    // Format top organizations
    const orgIds = orgUsageData.map(o => o.organizationId);
    const orgs = await prisma.organization.findMany({
      where: { id: { in: orgIds } },
      select: { id: true, name: true }
    });
    
    const topOrganizations = orgUsageData.map(data => {
      const org = orgs.find(o => o.id === data.organizationId);
      return {
        id: data.organizationId,
        name: org ? org.name : 'Unknown',
        generations: data._count._all,
        totalTokens: data._sum.totalTokens || 0
      };
    });

    const successRate = totalGenerations > 0 
      ? Math.round((successfulGenerations / totalGenerations) * 100) 
      : 0;

    return {
      overview: {
        totalGenerations,
        successfulGenerations,
        failedGenerations,
        successRate,
        tokens: {
          prompt: tokenAggregations._sum.promptTokens || 0,
          completion: tokenAggregations._sum.completionTokens || 0,
          total: tokenAggregations._sum.totalTokens || 0
        }
      },
      topOrganizations,
      recentLogs
    };
  }
}

module.exports = new SuperAdminService();
