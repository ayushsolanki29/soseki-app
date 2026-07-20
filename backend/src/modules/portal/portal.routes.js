const express = require("express");
const router = express.Router();
const portalController = require("./portal.controller");

// Public portal routes, no auth middleware needed
// Uses clientId as a secure token

router.get("/client/:clientId", portalController.getClientProfile);
router.get("/client/:clientId/projects", portalController.getClientProjects);
router.get("/client/:clientId/projects/:projectId", portalController.getClientProjectById);
router.get("/client/:clientId/invoices", portalController.getClientInvoices);
router.get("/client/:clientId/invoices/:invoiceId", portalController.getClientInvoiceById);
router.post("/client/:clientId/invoices/:invoiceId/record-payment", portalController.recordClientPayment);

module.exports = router;
