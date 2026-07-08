// src/modules/support-tickets/support-tickets.validation.js
const Joi = require("joi");

const createTicketValidation = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  priority: Joi.string().valid("Low", "Medium", "High", "Urgent").optional(),
});

const updateTicketValidation = Joi.object({
  status: Joi.string().valid("Open", "In Progress", "Resolved", "Closed").optional(),
  priority: Joi.string().valid("Low", "Medium", "High", "Urgent").optional(),
});

const addMessageValidation = Joi.object({
  content: Joi.string().trim().required().messages({
    "string.empty": "Message content is required",
    "any.required": "Message content is required",
  }),
});

module.exports = {
  createTicketValidation,
  updateTicketValidation,
  addMessageValidation,
};
