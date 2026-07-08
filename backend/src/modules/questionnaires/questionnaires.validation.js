// src/modules/questionnaires/questionnaires.validation.js
const Joi = require("joi");

const fieldSchema = Joi.object({
  type: Joi.string().valid("ShortText", "LongText", "Email", "Select", "MultiSelect", "Date").required(),
  label: Joi.string().required(),
  description: Joi.string().allow(null, "").optional(),
  required: Joi.boolean().optional(),
  options: Joi.array().items(Joi.string()).allow(null).optional(),
});

const createQuestionnaireValidation = Joi.object({
  title: Joi.string().trim().min(1).required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().allow(null, "").optional(),
  maxResponses: Joi.number().integer().min(1).allow(null, "").optional(),
  clientId: Joi.string().allow(null, "").optional(),
  projectId: Joi.string().allow(null, "").optional(),
  fields: Joi.array().items(fieldSchema).optional(),
});

const updateQuestionnaireValidation = Joi.object({
  title: Joi.string().trim().min(1).optional(),
  description: Joi.string().allow(null, "").optional(),
  status: Joi.string().valid("Draft", "Active", "Inactive", "Archived").optional(),
  maxResponses: Joi.number().integer().min(1).allow(null, "").optional(),
  clientId: Joi.string().allow(null, "").optional(),
  projectId: Joi.string().allow(null, "").optional(),
  fields: Joi.array().items(fieldSchema).optional(),
});

const submitQuestionnaireResponseValidation = Joi.object({
  answers: Joi.object().required().messages({
    "object.base": "Invalid answers payload",
    "any.required": "Invalid answers payload",
  }),
});

module.exports = {
  createQuestionnaireValidation,
  updateQuestionnaireValidation,
  submitQuestionnaireResponseValidation,
};
