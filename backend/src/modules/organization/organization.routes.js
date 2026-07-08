const express = require("express");
const router = express.Router();
const organizationController = require("./organization.controller");
const organizationValidation = require("./organization.validation");
const validate = require("../../middleware/validate");
const { authMiddleware } = require("../../middlewares/auth.middleware");

router.get("/", authMiddleware, organizationController.getOrganization);
router.patch("/", authMiddleware, validate(organizationValidation.updateOrganizationValidation), organizationController.updateOrganization);
router.post("/setup", authMiddleware, validate(organizationValidation.setupOrganizationValidation), organizationController.setupOrganization);

module.exports = router;
