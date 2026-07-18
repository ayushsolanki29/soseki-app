const express = require("express");
const router = express.Router();
const superAdminController = require("./super-admin.controller");
const superAdminValidation = require("./super-admin.validation");
const validate = require("../../middleware/validate.middleware");

// In a real application, you would have a specific authMiddleware for super-admins here
// For this migration, we are keeping it as is from the original implementation
// which just checked session and some basic things.

router.post("/auth/login", superAdminController.login);
router.post("/auth/logout", superAdminController.logout);
router.get("/dashboard/charts", superAdminController.getCharts);
router.get("/dashboard/stats", superAdminController.getDashboardStats);
router.post("/users", validate(superAdminValidation.createUserValidation), superAdminController.createUser);
router.get("/organizations", superAdminController.getOrganizations);
router.get("/organizations/:id", superAdminController.getOrganizationDetails);
router.put("/organizations/:id", superAdminController.updateOrganization);
router.patch("/organizations/:id/status", superAdminController.updateOrganizationStatus);
router.put("/organizations/:id/admin-password", superAdminController.changeOrgAdminPassword);
router.get("/tickets", superAdminController.getAllTickets);
router.get("/access-requests", superAdminController.getAccessRequests);
router.get("/mail/stats", superAdminController.getMailQueueStats);
router.get("/mail/logs", superAdminController.getMailLogs);
router.get("/traffic", superAdminController.getTrafficStats);

module.exports = router;
