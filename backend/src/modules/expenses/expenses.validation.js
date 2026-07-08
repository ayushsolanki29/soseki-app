// src/modules/expenses/expenses.validation.js
const Joi = require("joi");

const createExpenseValidation = Joi.object({
  description: Joi.string().trim().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  amount: Joi.number().min(0.01).required().messages({
    "number.min": "Invalid expense amount",
    "number.base": "Invalid expense amount",
    "any.required": "Invalid expense amount",
  }),
  date: Joi.date().iso().optional(),
  category: Joi.string().optional(),
  clientId: Joi.string().allow(null, "").optional(),
  projectId: Joi.string().allow(null, "").optional(),
  invoiceId: Joi.string().allow(null, "").optional(),
  currency: Joi.string().allow(null, "").optional(),
  exchangeRate: Joi.number().allow(null).optional(),
});

const updateExpenseValidation = Joi.object({
  description: Joi.string().trim().optional(),
  amount: Joi.number().min(0.01).optional().messages({
    "number.min": "Invalid expense amount",
    "number.base": "Invalid expense amount",
  }),
  date: Joi.date().iso().optional(),
  category: Joi.string().optional(),
  clientId: Joi.string().allow(null, "").optional(),
  projectId: Joi.string().allow(null, "").optional(),
  invoiceId: Joi.string().allow(null, "").optional(),
  currency: Joi.string().allow(null, "").optional(),
  exchangeRate: Joi.number().allow(null).optional(),
});

module.exports = {
  createExpenseValidation,
  updateExpenseValidation,
};
