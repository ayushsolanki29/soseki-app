// src/modules/support-tickets/support-tickets.service.js
const prisma = require("../../database/prisma");

class SupportTicketsService {
  async getTickets(organizationId, globalMode = false, page = "1", limit = "25") {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 25));
    const skip = (pageNum - 1) * limitNum;

    const where = globalMode ? {} : { organizationId };

    const totalCount = await prisma.supportTicket.count({ where });

    const tickets = await prisma.supportTicket.findMany({
      where,
      skip,
      take: limitNum,
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { name: true, email: true } },
        organization: { select: { name: true } },
        _count: { select: { messages: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      tickets,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    };
  }

  async createTicket(userId, organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { title, description, priority } = data;

    const ticket = await prisma.supportTicket.create({
      data: {
        title,
        description,
        priority: priority || "Medium",
        userId,
        organizationId,
      },
    });

    return ticket;
  }

  async getTicketById(id) {
    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true } },
        messages: {
          include: {
            sender: { select: { name: true, email: true } },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!ticket) {
      const error = new Error("Ticket not found");
      error.status = 404;
      throw error;
    }

    // Properly identify Super Admins dynamically instead of hardcoding on the frontend
    const superAdmins = await prisma.superUser.findMany({ select: { email: true } });
    const superAdminEmails = new Set(superAdmins.map(admin => admin.email));

    ticket.messages = ticket.messages.map(msg => ({
      ...msg,
      sender: {
        ...msg.sender,
        isSuperAdmin: superAdminEmails.has(msg.sender.email),
      }
    }));

    return ticket;
  }

  async updateTicket(id, data) {
    const { status, priority } = data;

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;

    const ticket = await prisma.supportTicket.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true } },
      },
    });

    return ticket;
  }

  async addMessage(id, userId, data) {
    const { content } = data;

    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
    });

    if (!ticket) {
      const error = new Error("Ticket not found");
      error.status = 404;
      throw error;
    }

    const message = await prisma.supportTicketMessage.create({
      data: {
        ticketId: id,
        senderId: userId,
        content,
      },
      include: {
        sender: { select: { name: true, email: true } },
      },
    });

    await prisma.supportTicket.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    // Properly identify Super Admins dynamically
    const superAdmins = await prisma.superUser.findMany({ select: { email: true } });
    const superAdminEmails = new Set(superAdmins.map(admin => admin.email));
    
    message.sender.isSuperAdmin = superAdminEmails.has(message.sender.email);

    return message;
  }
}

module.exports = new SupportTicketsService();
