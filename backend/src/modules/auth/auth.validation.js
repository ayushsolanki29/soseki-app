// src/modules/auth/auth.validation.js
const Joi = require("joi");
const disposableDomains = require("../../utils/disposable-domains.json");

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Missing email or password",
    "any.required": "Missing email or password",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Missing email or password",
    "any.required": "Missing email or password",
  }),
  termsAccepted: Joi.boolean().optional(),
});

const registerValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().custom((value, helpers) => {
    const domain = value.split('@')[1];
    if (disposableDomains.includes(domain)) {
      return helpers.message("Disposable email addresses are not allowed. Please use your primary email.");
    }
    return value;
  }).messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  country: Joi.string().optional().allow(null, ""),
  timezone: Joi.string().optional().allow(null, ""),
  termsAccepted: Joi.boolean().optional(),
});

const checkEmailValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
});

module.exports = {
  loginValidation,
  registerValidation,
  checkEmailValidation,
};
