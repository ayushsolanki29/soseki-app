const express = require("express");
const router = express.Router();
const migrationController = require("./migration.controller");
const migrationValidation = require("./migration.validation");
const validate = require("../../middleware/validate");
const { authMiddleware } = require("../../middlewares/auth.middleware");

router.use(authMiddleware);

router.post("/import", validate(migrationValidation.importDataValidation), migrationController.importData);

module.exports = router;
