const express = require("express");
const router = express.Router();
const invoicesController = require("./invoices.controller");
const invoicesValidation = require("./invoices.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", invoicesController.getInvoices);
router.post("/", validate(invoicesValidation.createInvoiceValidation), invoicesController.createInvoice);
router.get("/:id", invoicesController.getInvoiceById);
router.post("/:id/payments", invoicesController.recordPayment);
router.patch("/:id", validate(invoicesValidation.updateInvoiceValidation), invoicesController.updateInvoice);
router.delete("/:id", invoicesController.deleteInvoice);

module.exports = router;
