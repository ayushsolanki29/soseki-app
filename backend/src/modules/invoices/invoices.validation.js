// src/modules/invoices/invoices.validation.js
const Joi = require("joi");

const invoiceItemSchema = Joi.object({
  description: Joi.string().required().messages({
    "string.empty": "Item description is required",
    "any.required": "Item description is required",
  }),
  quantity: Joi.number().integer().min(1).required(),
  unitPrice: Joi.number().min(0).required(),
  taxRate: Joi.number().min(0).optional(),
  total: Joi.number().min(0).required(),
});

const createInvoiceValidation = Joi.object({
  clientId: Joi.string().required().messages({
    "string.empty": "Client ID is required",
    "any.required": "Client ID is required",
  }),
  projectId: Joi.string().allow(null, "").optional(),
  invoiceNumber: Joi.string().required().messages({
    "string.empty": "Invoice number is required",
    "any.required": "Invoice number is required",
  }),
  status: Joi.string().valid("Draft", "Sent", "Paid", "Overdue", "Cancelled").optional(),
  issueDate: Joi.date().iso().optional(),
  dueDate: Joi.date().iso().required().messages({
    "date.base": "Due date must be a valid date",
    "any.required": "Due date is required",
  }),
  currency: Joi.string().optional(),
  subtotal: Joi.number().min(0).optional(),
  taxAmount: Joi.number().min(0).optional(),
  discountAmount: Joi.number().min(0).optional(),
  totalAmount: Joi.number().min(0).optional(),
  exchangeRate: Joi.number().min(0).optional(),
  notice: Joi.string().allow(null, "").optional(),
  notes: Joi.string().allow(null, "").optional(),
  terms: Joi.string().allow(null, "").optional(),
  items: Joi.array().items(invoiceItemSchema).optional(),
});

const updateInvoiceValidation = Joi.object({
  clientId: Joi.string().optional(),
  projectId: Joi.string().allow(null, "").optional(),
  invoiceNumber: Joi.string().optional(),
  status: Joi.string().valid("Draft", "Sent", "Paid", "Overdue", "Cancelled").optional(),
  issueDate: Joi.date().iso().optional(),
  dueDate: Joi.date().iso().optional(),
  currency: Joi.string().optional(),
  subtotal: Joi.number().min(0).optional(),
  taxAmount: Joi.number().min(0).optional(),
  discountAmount: Joi.number().min(0).optional(),
  totalAmount: Joi.number().min(0).optional(),
  exchangeRate: Joi.number().min(0).optional(),
  notice: Joi.string().allow(null, "").optional(),
  notes: Joi.string().allow(null, "").optional(),
  terms: Joi.string().allow(null, "").optional(),
  items: Joi.array().items(invoiceItemSchema).optional(),
});

module.exports = {
  createInvoiceValidation,
  updateInvoiceValidation,
};
