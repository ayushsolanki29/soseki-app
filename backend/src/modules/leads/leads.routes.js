const express = require("express");
const router = express.Router();
const leadsController = require("./leads.controller");
const leadsValidation = require("./leads.validation");
const validate = require("../../middleware/validate.middleware");

// Leads route is public
router.post("/", validate(leadsValidation.createLeadValidation), leadsController.createLead);

module.exports = router;
