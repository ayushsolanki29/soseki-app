const superAdminService = require("./super-admin.service");

class SuperAdminController {
  async getCharts(req, res, next) {
    try {
      const charts = await superAdminService.getCharts();
      return res.status(200).json({ success: true, ...charts });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const result = await superAdminService.createUser(req.body);
      return res.status(201).json({ success: true, ...result });
    } catch (error) {
      if (error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getOrganizations(req, res, next) {
    try {
      const organizations = await superAdminService.getOrganizations();
      return res.status(200).json({ success: true, organizations });
    } catch (error) {
      next(error);
    }
  }

  async getAllTickets(req, res, next) {
    try {
      const tickets = await superAdminService.getAllTickets();
      return res.status(200).json({ success: true, tickets });
    } catch (error) {
      next(error);
    }
  }

  async getAccessRequests(req, res, next) {
    try {
      const requests = await superAdminService.getAccessRequests();
      return res.status(200).json({ success: true, requests });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SuperAdminController();
