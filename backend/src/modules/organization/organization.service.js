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

    const { name, address, invoiceFooterNote, expenseFooterNote, masterCurrency, dateFormat } = data;
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
    if (invoiceFooterNote !== undefined) updateData.invoiceFooterNote = invoiceFooterNote?.trim() || null;
    if (expenseFooterNote !== undefined) updateData.expenseFooterNote = expenseFooterNote?.trim() || null;
    if (dateFormat !== undefined) updateData.dateFormat = dateFormat;

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
      data: updateData,
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
}

module.exports = new OrganizationService();
