// src/modules/organization/organization.validation.js
const Joi = require("joi");

const updateOrganizationValidation = Joi.object({
  name: Joi.string().min(1).optional().messages({
    "string.empty": "Name cannot be empty",
  }),
  address: Joi.string().allow("").optional(),
  invoiceFooterNote: Joi.string().allow("").optional(),
  expenseFooterNote: Joi.string().allow("").optional(),
  masterCurrency: Joi.string().optional(),
  dateFormat: Joi.string().optional(),
});

const setupOrganizationValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Workspace name is required",
    "any.required": "Workspace name is required",
  }),
  userName: Joi.string().required().messages({
    "string.empty": "Your name is required",
    "any.required": "Your name is required",
  }),
  masterCurrency: Joi.string().optional(),
});

module.exports = {
  updateOrganizationValidation,
  setupOrganizationValidation,
};
