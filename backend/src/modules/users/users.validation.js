// src/modules/users/users.validation.js
const Joi = require("joi");

const updateProfileValidation = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
});

module.exports = {
  updateProfileValidation,
};
