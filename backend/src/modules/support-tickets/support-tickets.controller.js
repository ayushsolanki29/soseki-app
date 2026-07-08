const supportTicketsService = require("./support-tickets.service");

class SupportTicketsController {
  async getTickets(req, res, next) {
    try {
      const globalMode = req.query.global === "true";
      const tickets = await supportTicketsService.getTickets(req.user.organizationId, globalMode);
      return res.status(200).json({ success: true, tickets });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async createTicket(req, res, next) {
    try {
      const ticket = await supportTicketsService.createTicket(req.user.id, req.user.organizationId, req.body);
      return res.status(201).json({ success: true, ticket });
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getTicketById(req, res, next) {
    try {
      const ticket = await supportTicketsService.getTicketById(req.params.id);
      return res.status(200).json({ success: true, ticket });
    } catch (error) {
      if (error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async updateTicket(req, res, next) {
    try {
      const ticket = await supportTicketsService.updateTicket(req.params.id, req.body);
      return res.status(200).json({ success: true, ticket });
    } catch (error) {
      next(error);
    }
  }

  async addMessage(req, res, next) {
    try {
      const message = await supportTicketsService.addMessage(req.params.id, req.user.id, req.body);
      return res.status(201).json({ success: true, message });
    } catch (error) {
      if (error.status === 404 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new SupportTicketsController();
