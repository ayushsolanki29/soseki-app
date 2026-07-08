const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authValidation = require("./auth.validation");
const validate = require("../../middleware/validate");
const { authMiddleware } = require("../../middlewares/auth.middleware");

router.post("/check-email", validate(authValidation.checkEmailValidation), authController.checkEmail);
router.post("/login", validate(authValidation.loginValidation), authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.me);

module.exports = router;
