const express = require("express");
const router = express.Router();
const superAdminController = require("./super-admin.controller");
const superAdminValidation = require("./super-admin.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

// In a real application, you would have a specific authMiddleware for super-admins here
// For this migration, we are keeping it as is from the original implementation
// which just checked session and some basic things.

router.post("/auth/login", superAdminController.login);
router.post("/auth/login/verify", superAdminController.verify2FALogin);
router.post("/auth/logout", superAdminController.logout);
router.get("/dashboard/charts", superAdminController.getCharts);
router.get("/dashboard/stats", superAdminController.getDashboardStats);
router.get("/settings", authMiddleware, superAdminController.getSettings);
router.put("/settings", authMiddleware, superAdminController.updateSettings);
router.post("/settings/2fa/generate", authMiddleware, superAdminController.generate2FA);
router.post("/settings/2fa/verify", authMiddleware, superAdminController.verify2FASetup);
router.post("/settings/2fa/disable", authMiddleware, superAdminController.disable2FA);
router.post("/users", validate(superAdminValidation.createUserValidation), superAdminController.createUser);
router.put("/users/:id", superAdminController.updateUser);
router.delete("/users/:id", superAdminController.deleteUser);
router.get("/organizations", superAdminController.getOrganizations);
router.get("/organizations/:id", superAdminController.getOrganizationDetails);
router.put("/organizations/:id", superAdminController.updateOrganization);
router.patch("/organizations/:id/status", superAdminController.updateOrganizationStatus);
router.delete("/organizations/:id", superAdminController.deleteOrganization);
router.put("/organizations/:id/admin-password", superAdminController.changeOrgAdminPassword);
router.get("/tickets", superAdminController.getAllTickets);
router.get("/access-requests", superAdminController.getAccessRequests);
router.get("/mail/stats", superAdminController.getMailQueueStats);
router.get("/mail/logs", superAdminController.getMailLogs);
router.get("/traffic", superAdminController.getTrafficStats);
router.get("/template-requests", superAdminController.getTemplateRequests);
router.patch("/template-requests/:id", superAdminController.updateTemplateRequestStatus);

module.exports = router;
