// src/modules/leads/leads.validation.js
const Joi = require("joi");
const disposableDomains = require("../../utils/disposable-domains.json");

const createLeadValidation = Joi.object({
  fullName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Full name is required and must be valid.",
    "string.min": "Full name must be between 2 and 50 characters.",
    "string.max": "Full name must be between 2 and 50 characters.",
    "any.required": "Full name is required and must be valid.",
  }),
  email: Joi.string().trim().email().max(100).required().custom((value, helpers) => {
    const domain = value.split('@')[1];
    if (disposableDomains.includes(domain)) {
      return helpers.message("Disposable email addresses are not allowed. Please use your primary email.");
    }
    return value;
  }).messages({
    "string.email": "Please enter a valid email address format.",
    "string.empty": "Email is required and must be valid.",
    "string.max": "Email is too long.",
    "any.required": "Email is required and must be valid.",
  }),
  country: Joi.string().trim().max(50).allow("").optional(),
  profession: Joi.string().trim().max(50).allow("").optional(),
  customProfession: Joi.string().trim().max(50).allow("").optional(),
  earningsRange: Joi.string().trim().max(50).allow("").optional(),
  previousTool: Joi.string().trim().max(50).allow("").optional(),
  customPreviousTool: Joi.string().trim().max(50).allow("").optional(),
});

module.exports = {
  createLeadValidation,
};
