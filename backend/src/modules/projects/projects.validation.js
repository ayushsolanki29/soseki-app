// src/modules/projects/projects.validation.js
const Joi = require("joi");

const createProjectValidation = Joi.object({
  title: Joi.string().trim().min(1).required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow("").optional(),
  startDate: Joi.date().iso().required().messages({
    "date.base": "Start date must be a valid date",
    "any.required": "Start date is required",
  }),
  estimatedEndDate: Joi.date().iso().allow(null).optional(),
  status: Joi.string().valid("Planning", "Active", "Completed", "OnHold", "Cancelled").optional(),
  clientId: Joi.string().required().messages({
    "string.empty": "Client ID is required",
    "any.required": "Client ID is required",
  }),
});

const updateProjectValidation = Joi.object({
  title: Joi.string().trim().min(1).optional(),
  description: Joi.string().allow("").optional(),
  startDate: Joi.date().iso().optional(),
  estimatedEndDate: Joi.date().iso().allow(null).optional(),
  status: Joi.string().valid("Planning", "Active", "Completed", "OnHold", "Cancelled").optional(),
  clientId: Joi.string().optional(),
});

module.exports = {
  createProjectValidation,
  updateProjectValidation,
};
