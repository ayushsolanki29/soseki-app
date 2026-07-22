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
router.post("/:id/verify-payment", invoicesController.verifyPayment);
router.patch("/:id", validate(invoicesValidation.updateInvoiceValidation), invoicesController.updateInvoice);
router.delete("/:id", invoicesController.deleteInvoice);
router.post("/:id/track-download", invoicesController.trackDownload);

module.exports = router;
