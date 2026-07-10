const jwt = require("jsonwebtoken");
const prisma = require("../database/prisma");

const { auth: authConfig } = require("../config/app.config");
const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken;
    let isSuperAdmin = false;

    if (!token && req.cookies.superAccessToken) {
      token = req.cookies.superAccessToken;
      isSuperAdmin = true;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const payload = jwt.verify(token, authConfig.jwtSecret);

    if (!payload || !payload.userId) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    if (isSuperAdmin) {
      const admin = await prisma.superUser.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, name: true },
      });

      if (!admin) {
        return res.status(401).json({ success: false, message: "Admin not found" });
      }

      // Ensure a shadow user exists so the admin can post messages (foreign key constraint)
      let user = await prisma.user.findUnique({ where: { email: admin.email } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: admin.email,
            name: admin.name || "Super Admin",
            passwordHash: "SUPER_ADMIN_MOCKED",
          }
        });
      }

      req.user = user;
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, organizationId: true },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

const superAdminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.superAccessToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "SuperAdmin authentication required" });
    }

    const payload = jwt.verify(token, authConfig.jwtSecret);

    if (!payload || !payload.userId) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    const admin = await prisma.superUser.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid superadmin token" });
  }
};

module.exports = {
  authMiddleware,
  superAdminAuthMiddleware,
};
