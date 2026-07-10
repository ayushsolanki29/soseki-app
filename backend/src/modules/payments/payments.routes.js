const express = require("express");
const router = express.Router();
const paymentsController = require("./payments.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", paymentsController.getPayments);

module.exports = router;
