// src/modules/super-admin/super-admin.validation.js
const Joi = require("joi");

const createUserValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Valid email is required",
    "string.empty": "Valid email is required",
    "any.required": "Valid email is required",
  }),
});

module.exports = {
  createUserValidation,
};
