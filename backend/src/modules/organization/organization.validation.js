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
  invoiceTemplate: Joi.string().optional(),
  expenseTemplate: Joi.string().optional(),
  phone: Joi.string().allow("").optional(),
  email: Joi.string().email().allow("").optional(),
  taxId: Joi.string().allow("").optional(),
  registrationNumber: Joi.string().allow("").optional(),
  region: Joi.string().allow("").optional(),
  termsAndConditions: Joi.string().allow("").optional(),
  accountNumber: Joi.string().allow("").optional(),
  bankName: Joi.string().allow("").optional(),
  routingNumber: Joi.string().allow("").optional(),
  branch: Joi.string().allow("").optional(),
});

const createTemplateRequestValidation = Joi.object({
  type: Joi.string().valid("Invoice", "Expense").required(),
  description: Joi.string().required(),
  attachmentUrl: Joi.string().allow(null, "").optional(),
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
  createTemplateRequestValidation,
};
