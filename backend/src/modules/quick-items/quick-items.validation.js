// src/modules/quick-items/quick-items.validation.js
const Joi = require("joi");

const createQuickItemValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  defaultPrice: Joi.number().min(0).optional(),
});

module.exports = {
  createQuickItemValidation,
};
