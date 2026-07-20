const superAdminService = require("./super-admin.service");

class SuperAdminController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await superAdminService.login(email, password);

      if (result.requires2FA) {
        return res.status(200).json({
          success: true,
          requires2FA: true,
          tempToken: result.tempToken
        });
      }

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

  async verify2FALogin(req, res, next) {
    try {
      const { tempToken, token } = req.body;
      const result = await superAdminService.verify2FALogin(tempToken, token);

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
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getSettings(req, res, next) {
    try {
      const adminId = req.superAdminId;
      if (!adminId) return res.status(401).json({ success: false, message: "Unauthorized" });
      const admin = await superAdminService.getSuperAdminDetails(adminId);
      return res.status(200).json({ success: true, admin });
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req, res, next) {
    try {
      const adminId = req.superAdminId;
      if (!adminId) return res.status(401).json({ success: false, message: "Unauthorized" });
      const admin = await superAdminService.updateSettings(adminId, req.body);
      return res.status(200).json({ success: true, admin });
    } catch (error) {
      next(error);
    }
  }

  async generate2FA(req, res, next) {
    try {
      const adminId = req.superAdminId;
      if (!adminId) return res.status(401).json({ success: false, message: "Unauthorized" });
      const result = await superAdminService.generate2FA(adminId);
      return res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async verify2FASetup(req, res, next) {
    try {
      const adminId = req.superAdminId;
      if (!adminId) return res.status(401).json({ success: false, message: "Unauthorized" });
      const { token } = req.body;
      await superAdminService.verify2FASetup(adminId, token);
      return res.status(200).json({ success: true, message: "2FA enabled successfully" });
    } catch (error) {
      if (error.status === 400) return res.status(400).json({ success: false, message: error.message });
      next(error);
    }
  }

  async disable2FA(req, res, next) {
    try {
      const adminId = req.superAdminId;
      if (!adminId) return res.status(401).json({ success: false, message: "Unauthorized" });
      const { token } = req.body;
      await superAdminService.disable2FA(adminId, token);
      return res.status(200).json({ success: true, message: "2FA disabled successfully" });
    } catch (error) {
      if (error.status === 400) return res.status(400).json({ success: false, message: error.message });
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

  async deleteOrganization(req, res, next) {
    try {
      const { id } = req.params;
      await superAdminService.deleteOrganization(id);
      return res.status(200).json({ success: true, message: "Organization deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await superAdminService.updateUser(id, req.body);
      const { passwordHash, ...safeUser } = user;
      return res.status(200).json({ success: true, user: safeUser });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await superAdminService.deleteUser(id);
      return res.status(200).json({ success: true, message: "User deleted successfully" });
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
  async getTemplateRequests(req, res, next) {
    try {
      const requests = await superAdminService.getTemplateRequests();
      return res.status(200).json({ success: true, requests });
    } catch (error) {
      next(error);
    }
  }

  async updateTemplateRequestStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const request = await superAdminService.updateTemplateRequestStatus(id, status);
      return res.status(200).json({ success: true, request });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new SuperAdminController();
