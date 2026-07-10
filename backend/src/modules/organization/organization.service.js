// src/modules/organization/organization.service.js
const prisma = require("../../database/prisma");

class OrganizationService {
  async getOrganization(organizationId) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        profile: true,
        _count: {
          select: { invoices: true, expenses: true },
        },
      },
    });

    if (!organization) {
      const error = new Error("Organization not found");
      error.status = 404;
      throw error;
    }

    return organization;
  }

  async updateOrganization(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { 
      name, address, masterCurrency, dateFormat,
      // Profile fields
      phone, email, taxId, registrationNumber, region,
      invoiceFooterNote, expenseFooterNote, invoiceTemplate, expenseTemplate,
      termsAndConditions, accountNumber, bankName, routingNumber, branch
    } = data;
    
    const updateData = {};

    if (name !== undefined) {
      if (!name || name.trim().length === 0) {
        const error = new Error("Name cannot be empty");
        error.status = 400;
        throw error;
      }
      updateData.name = name.trim();
    }

    if (address !== undefined) updateData.address = address?.trim() || null;
    if (dateFormat !== undefined) updateData.dateFormat = dateFormat;

    const profileData = {};
    if (phone !== undefined) profileData.phone = phone || null;
    if (email !== undefined) profileData.email = email || null;
    if (taxId !== undefined) profileData.taxId = taxId || null;
    if (registrationNumber !== undefined) profileData.registrationNumber = registrationNumber || null;
    if (region !== undefined) profileData.region = region || null;
    if (invoiceFooterNote !== undefined) profileData.invoiceFooterNote = invoiceFooterNote?.trim() || null;
    if (expenseFooterNote !== undefined) profileData.expenseFooterNote = expenseFooterNote?.trim() || null;
    if (invoiceTemplate !== undefined) profileData.invoiceTemplate = invoiceTemplate;
    if (expenseTemplate !== undefined) profileData.expenseTemplate = expenseTemplate;
    if (termsAndConditions !== undefined) profileData.termsAndConditions = termsAndConditions || null;
    if (accountNumber !== undefined) profileData.accountNumber = accountNumber || null;
    if (bankName !== undefined) profileData.bankName = bankName || null;
    if (routingNumber !== undefined) profileData.routingNumber = routingNumber || null;
    if (branch !== undefined) profileData.branch = branch || null;

    if (masterCurrency !== undefined) {
      // Prevent changing currency if transactions exist
      const orgWithCounts = await prisma.organization.findUnique({
        where: { id: organizationId },
        include: {
          _count: {
            select: { invoices: true, expenses: true },
          },
        },
      });

      const hasTransactions =
        orgWithCounts && (orgWithCounts._count.invoices > 0 || orgWithCounts._count.expenses > 0);

      if (hasTransactions && orgWithCounts.masterCurrency !== masterCurrency) {
        const error = new Error("Cannot change master currency because transactions exist.");
        error.status = 400;
        throw error;
      }

      updateData.masterCurrency = masterCurrency;
    }

    const organization = await prisma.organization.update({
      where: { id: organizationId },
      data: {
        ...updateData,
        // Only upsert if there's profile data to update
        ...(Object.keys(profileData).length > 0 && {
          profile: {
            upsert: {
              create: profileData,
              update: profileData
            }
          }
        })
      },
      include: { profile: true }
    });

    return organization;
  }

  async setupOrganization(userId, organizationId, data) {
    if (!userId) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    if (organizationId) {
      const error = new Error("You already have an organization setup");
      error.status = 400;
      throw error;
    }

    const { name, userName, masterCurrency } = data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const organization = await prisma.organization.create({
      data: {
        name: name.trim(),
        masterCurrency: masterCurrency || "USD",
        users: {
          connect: { id: user.id },
        },
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { name: userName.trim() },
    });

    return { organization, user };
  }

  async createTemplateRequest(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const { type, description, attachmentUrl } = data;

    const request = await prisma.templateRequest.create({
      data: {
        organizationId,
        type,
        description,
        attachmentUrl: attachmentUrl || null,
      },
    });

    return request;
  }

  async getTemplateRequests(organizationId) {
    if (!organizationId) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const requests = await prisma.templateRequest.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
    });

    return requests;
  }
}

module.exports = new OrganizationService();
