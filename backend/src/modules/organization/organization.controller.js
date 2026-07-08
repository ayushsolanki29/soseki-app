const jwt = require("jsonwebtoken");
const organizationService = require("./organization.service");

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
      const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-development";
      const payload = {
        userId: user.id,
        hasOrg: true,
        organizationId: organization.id,
      };
      
      const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
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
}

module.exports = new OrganizationController();
