const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");
const usersValidation = require("./users.validation");
const validate = require("../../middleware/validate");
const { authMiddleware } = require("../../middlewares/auth.middleware");

router.get("/profile", authMiddleware, usersController.getProfile);
router.patch("/profile", authMiddleware, validate(usersValidation.updateProfileValidation), usersController.updateProfile);
router.patch("/profile/password", authMiddleware, validate(usersValidation.updatePasswordValidation), usersController.updatePassword);

module.exports = router;
