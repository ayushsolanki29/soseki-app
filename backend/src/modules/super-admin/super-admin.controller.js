const superAdminService = require("./super-admin.service");

class SuperAdminController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await superAdminService.login(email, password);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("superAccessToken", result.accessToken, cookieOptions);

      return res.status(200).json({
        success: true,
        user: result.user,
      });
    } catch (error) {
      if (error.status === 401) {
        return res.status(401).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
      };
      res.clearCookie("superAccessToken", cookieOptions);
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

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

  async getOrganizationDetails(req, res, next) {
    try {
      const { id } = req.params;
      const organization = await superAdminService.getOrganizationDetails(id);
      return res.status(200).json({ success: true, organization });
    } catch (error) {
      next(error);
    }
  }

  async updateOrganization(req, res, next) {
    try {
      const { id } = req.params;
      const organization = await superAdminService.updateOrganization(id, req.body);
      return res.status(200).json({ success: true, organization });
    } catch (error) {
      next(error);
    }
  }

  async updateOrganizationStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const organization = await superAdminService.updateOrganizationStatus(id, status);
      return res.status(200).json({ success: true, organization });
    } catch (error) {
      next(error);
    }
  }

  async changeOrgAdminPassword(req, res, next) {
    try {
      const { id } = req.params;
      const { newPassword } = req.body;
      await superAdminService.changeOrgAdminPassword(id, newPassword);
      return res.status(200).json({ success: true, message: "Password updated successfully" });
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

  async getMailQueueStats(req, res, next) {
    try {
      const stats = await superAdminService.getMailQueueStats();
      return res.status(200).json({ success: true, stats });
    } catch (error) {
      next(error);
    }
  }

  async getMailLogs(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 50;
      const data = await superAdminService.getMailLogs(page, limit);
      return res.status(200).json({ success: true, ...data });
    } catch (error) {
      next(error);
    }
  }
  async getTrafficStats(req, res, next) {
    try {
      const stats = await superAdminService.getTrafficStats();
      return res.status(200).json({ success: true, stats });
    } catch (error) {
      next(error);
    }
  }

  async getDashboardStats(req, res, next) {
    try {
      const stats = await superAdminService.getDashboardStats();
      return res.status(200).json({ success: true, ...stats });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new SuperAdminController();
