// src/modules/clients/clients.validation.js
const Joi = require("joi");

const createClientValidation = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.email": "Valid email is required",
    "string.empty": "Valid email is required",
    "any.required": "Valid email is required",
  }),
  phone: Joi.string().trim().allow("").optional(),
  status: Joi.string().valid("Active", "Inactive", "Lead").optional(),
});

const updateClientValidation = Joi.object({
  name: Joi.string().trim().min(1).optional(),
  email: Joi.string().trim().email().optional(),
  phone: Joi.string().trim().allow("").optional(),
  status: Joi.string().valid("Active", "Inactive", "Lead").optional(),
});

module.exports = {
  createClientValidation,
  updateClientValidation,
};
