// src/modules/support-tickets/support-tickets.service.js
const prisma = require("../../database/prisma");

class SupportTicketsService {
  async getTickets(organizationId, globalMode = false) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const where = globalMode ? {} : { organizationId };

    const tickets = await prisma.supportTicket.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true } },
        _count: { select: { messages: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return tickets;
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

    return message;
  }
}

module.exports = new SupportTicketsService();
