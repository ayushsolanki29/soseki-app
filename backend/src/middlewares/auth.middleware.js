const jwt = require("jsonwebtoken");
const prisma = require("../database/prisma");

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-development";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const payload = jwt.verify(token, JWT_SECRET);

    if (!payload || !payload.userId) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
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

    const payload = jwt.verify(token, JWT_SECRET);

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
