const express = require("express");
const router = express.Router();
const quickItemsController = require("./quick-items.controller");
const quickItemsValidation = require("./quick-items.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", quickItemsController.getQuickItems);
router.post("/", validate(quickItemsValidation.createQuickItemValidation), quickItemsController.createQuickItem);

module.exports = router;
