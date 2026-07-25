// src/modules/users/users.validation.js
const Joi = require("joi");

const disposableDomains = require("../../utils/disposable-domains.json");

const updateProfileValidation = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
});

const updatePasswordValidation = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
});

module.exports = {
  updateProfileValidation,
  updatePasswordValidation,
};
