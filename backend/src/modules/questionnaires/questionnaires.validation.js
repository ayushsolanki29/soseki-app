// src/modules/questionnaires/questionnaires.validation.js
const Joi = require("joi");

const fieldSchema = Joi.object({
  type: Joi.string().required(),
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
  status: Joi.string().valid("Active", "Paused", "Closed").optional(),
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

const generateQuestionnaireFromAiValidation = Joi.object({
  prompt: Joi.string().trim().min(1).max(2000).required().messages({
    "string.empty": "Prompt is required",
    "string.max": "Prompt is too long (max 2000 characters)",
    "any.required": "Prompt is required",
  }),
});

const importAiQuestionnaireValidation = Joi.object({
  json: Joi.object({
    title: Joi.string().trim().min(1).max(150).required(),
    description: Joi.string().max(500).allow(null, "").optional(),
    fields: Joi.array().items(
      Joi.object({
        type: Joi.string().valid("TEXT", "TEXTAREA", "SELECT", "RADIO", "CHECKBOX").required(),
        label: Joi.string().max(200).required(),
        description: Joi.string().max(300).allow(null, "").optional(),
        required: Joi.boolean().optional(),
        options: Joi.array().items(Joi.string().max(100)).max(10).allow(null).optional(),
      })
    ).min(1).max(6).required().messages({
      "array.max": "Questionnaire cannot exceed 6 fields",
    }),
  }).required().messages({
    "object.base": "Invalid JSON payload",
    "any.required": "JSON payload is required",
  }),
});

module.exports = {
  createQuestionnaireValidation,
  updateQuestionnaireValidation,
  submitQuestionnaireResponseValidation,
  generateQuestionnaireFromAiValidation,
  importAiQuestionnaireValidation,
};
