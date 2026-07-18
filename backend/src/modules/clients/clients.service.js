// src/modules/clients/clients.service.js
const prisma = require("../../database/prisma");

class ClientsService {
  async getClients(organizationId, query = "", status = "ActiveOrLead", page = "1", limit = "25") {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 25));
    const skip = (pageNum - 1) * limitNum;

    const where = {
      organizationId,
      ...(status === "ActiveOrLead" ? { status: { not: "Inactive" } } : status !== "All" ? { status } : {}),
      ...(query && {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      }),
    };

    const totalCount = await prisma.client.count({ where });

    const clients = await prisma.client.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
    });

    return {
      clients,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    };
  }

  async createClient(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { name, email, phone, status } = data;

    const existingClient = await prisma.client.findFirst({
      where: {
        email: email.trim().toLowerCase(),
        organizationId,
      },
    });

    if (existingClient) {
      const error = new Error("A client with this email already exists");
      error.status = 400;
      error.clientId = existingClient.id;
      throw error;
    }

    const newClient = await prisma.client.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        status: status || "Active",
        organizationId,
      },
    });

    return newClient;
  }

  async getClientById(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const client = await prisma.client.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        projects: {
          orderBy: { createdAt: "desc" },
        },
        invoices: {
          orderBy: { issueDate: "desc" },
          include: {
            payments: true,
          },
        },
        expenses: {
          orderBy: { date: "desc" },
        },
      },
    });

    if (!client) {
      const error = new Error("Client not found");
      error.status = 404;
      throw error;
    }

    return client;
  }

  async updateClient(organizationId, id, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { name, email, phone, status } = data;

    const existingClient = await prisma.client.findFirst({
      where: {
        id,
        organizationId,
      },
    });

    if (!existingClient) {
      const error = new Error("Client not found");
      error.status = 404;
      throw error;
    }

    if (email && email.trim().toLowerCase() !== existingClient.email) {
      const emailExists = await prisma.client.findFirst({
        where: {
          email: email.trim().toLowerCase(),
          organizationId,
          id: { not: id },
        },
      });

      if (emailExists) {
        const error = new Error("A client with this email already exists");
        error.status = 400;
        throw error;
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name.trim();
    if (email !== undefined) updateData.email = email.trim().toLowerCase();
    if (phone !== undefined) updateData.phone = phone?.trim() || null;
    if (status !== undefined) updateData.status = status;

    const updatedClient = await prisma.client.update({
      where: { id },
      data: updateData,
    });

    return updatedClient;
  }
}

module.exports = new ClientsService();
