const express = require("express");
const router = express.Router();
const migrationController = require("./migration.controller");
const migrationValidation = require("./migration.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.use(authMiddleware);

router.post("/import", validate(migrationValidation.importDataValidation), migrationController.importData);
router.get("/prompt", migrationController.getPrompt);

module.exports = router;
