const express = require("express");
const router = express.Router();
const organizationController = require("./organization.controller");
const organizationValidation = require("./organization.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.get("/", authMiddleware, organizationController.getOrganization);
router.patch("/", authMiddleware, validate(organizationValidation.updateOrganizationValidation), organizationController.updateOrganization);
router.post("/setup", authMiddleware, validate(organizationValidation.setupOrganizationValidation), organizationController.setupOrganization);
router.post("/template-requests", authMiddleware, validate(organizationValidation.createTemplateRequestValidation), organizationController.createTemplateRequest);
router.get("/template-requests", authMiddleware, organizationController.getTemplateRequests);
router.get("/export", authMiddleware, organizationController.exportOrganizationData);
router.delete("/", authMiddleware, organizationController.deleteOrganization);

module.exports = router;
