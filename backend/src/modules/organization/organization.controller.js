const jwt = require("jsonwebtoken");
const organizationService = require("./organization.service");
const { auth: authConfig, server: serverConfig } = require("../../config/app.config");

class OrganizationController {
  async getOrganization(req, res, next) {
    try {
      const organization = await organizationService.getOrganization(req.user.organizationId);
      return res.status(200).json({ success: true, organization });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async updateOrganization(req, res, next) {
    try {
      const organization = await organizationService.updateOrganization(req.user.organizationId, req.body);
      return res.status(200).json({ success: true, organization });
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async setupOrganization(req, res, next) {
    try {
      const { organization, user } = await organizationService.setupOrganization(req.user.id, req.user.organizationId, req.body);

      // Reissue token with organizationId

      const payload = {
        userId: user.id,
        hasOrg: true,
        organizationId: organization.id,
      };
      
      const newAccessToken = jwt.sign(payload, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });

      const cookieOptions = {
        httpOnly: true,
        secure: serverConfig.env === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("accessToken", newAccessToken, cookieOptions);

      return res.status(200).json({ success: true, organization });
    } catch (error) {
      if (error.status === 401 || error.status === 400 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async createTemplateRequest(req, res, next) {
    try {
      const request = await organizationService.createTemplateRequest(req.user.organizationId, req.body);
      return res.status(201).json({ success: true, request });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getTemplateRequests(req, res, next) {
    try {
      const requests = await organizationService.getTemplateRequests(req.user.organizationId);
      return res.status(200).json({ success: true, requests });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async exportOrganizationData(req, res, next) {
    try {
      const data = await organizationService.exportOrganizationData(req.user.organizationId);
      res.setHeader('Content-disposition', 'attachment; filename=soseki_export.json');
      res.setHeader('Content-type', 'application/json');
      return res.status(200).send(JSON.stringify(data, null, 2));
    } catch (error) {
      next(error);
    }
  }

  async deleteOrganization(req, res, next) {
    try {
      await organizationService.deleteOrganization(req.user.organizationId);

      // Clear cookies
      const cookieOptions = {
        httpOnly: true,
        secure: serverConfig.env === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        domain: process.env.NODE_ENV === "production" ? ".soseki.app" : undefined,
      };

      res.clearCookie("accessToken", cookieOptions);
      res.clearCookie("refreshToken", cookieOptions);

      return res.status(200).json({ success: true, message: "Organization deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrganizationController();
