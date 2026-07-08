// src/modules/auth/auth.validation.js
const Joi = require("joi");

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Missing email or password",
    "any.required": "Missing email or password",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Missing email or password",
    "any.required": "Missing email or password",
  }),
});

const checkEmailValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
});

module.exports = {
  loginValidation,
  checkEmailValidation,
};
