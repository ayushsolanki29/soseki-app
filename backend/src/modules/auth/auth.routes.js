const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authValidation = require("./auth.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.post("/check-email", validate(authValidation.checkEmailValidation), authController.checkEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-reset-otp", authController.verifyResetOtp);
router.post("/reset-password", authController.resetPassword);
router.post("/register", validate(authValidation.registerValidation), authController.register);
router.post("/login", validate(authValidation.loginValidation), authController.login);
router.post("/social/:provider", authController.socialLogin);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.me);
router.post("/verify-email", authMiddleware, authController.verifyEmail);
router.post("/resend-verification", authMiddleware, authController.resendVerification);

module.exports = router;
