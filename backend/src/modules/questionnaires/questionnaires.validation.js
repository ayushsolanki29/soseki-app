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
  fields: Joi.array().items(fieldSchema).max(100).optional().messages({
    "array.max": "A form cannot exceed 100 questions to ensure page performance."
  }),
});

const updateQuestionnaireValidation = Joi.object({
  title: Joi.string().trim().min(1).optional(),
  description: Joi.string().allow(null, "").optional(),
  status: Joi.string().valid("Active", "Paused", "Closed").optional(),
  maxResponses: Joi.number().integer().min(1).allow(null, "").optional(),
  clientId: Joi.string().allow(null, "").optional(),
  projectId: Joi.string().allow(null, "").optional(),
  fields: Joi.array().items(fieldSchema).max(100).optional().messages({
    "array.max": "A form cannot exceed 100 questions to ensure page performance."
  }),
});

const submitQuestionnaireResponseValidation = Joi.object({
  answers: Joi.object().required().messages({
    "object.base": "Invalid answers payload",
    "any.required": "Invalid answers payload",
  }),
});

const generateQuestionnaireFromAiValidation = Joi.object({
  prompt: Joi.string().trim().min(1).max(4000).required().messages({
    "string.empty": "Prompt is required",
    "string.max": "Prompt is too long (max 4000 characters)",
    "any.required": "Prompt is required",
  }),
});

const importAiQuestionnaireValidation = Joi.object({
  json: Joi.object({
    title: Joi.string().trim().min(1).max(150).required().messages({
      "string.max": "Form title cannot exceed 150 characters.",
      "any.required": "Form title is required.",
      "string.empty": "Form title cannot be empty."
    }),
    description: Joi.string().max(500).allow(null, "").optional().messages({
      "string.max": "Form description cannot exceed 500 characters."
    }),
    fields: Joi.array().items(
      Joi.object({
        type: Joi.string().valid("TEXT", "TEXTAREA", "SELECT", "RADIO", "CHECKBOX").required().messages({
          "any.only": "Invalid question type. Must be TEXT, TEXTAREA, SELECT, RADIO, or CHECKBOX."
        }),
        label: Joi.string().max(200).required().messages({
          "string.max": "Question text cannot exceed 200 characters.",
          "any.required": "Question text is required.",
          "string.empty": "Question text cannot be empty."
        }),
        description: Joi.string().max(300).allow(null, "").optional().messages({
          "string.max": "Question description cannot exceed 300 characters."
        }),
        required: Joi.boolean().optional(),
        options: Joi.array().items(Joi.string().max(100)).max(50).allow(null).optional().messages({
          "array.max": "A question cannot have more than 50 options."
        }),
      })
    ).min(1).max(100).required().messages({
      "array.min": "You must include at least one question.",
      "array.max": "A form cannot exceed 100 questions to ensure page performance."
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
