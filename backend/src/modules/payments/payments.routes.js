const express = require("express");
const router = express.Router();
const paymentsController = require("./payments.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", paymentsController.getPayments);
router.patch("/:id", paymentsController.updatePayment);
router.delete("/:id", paymentsController.deletePayment);

module.exports = router;
