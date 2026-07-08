// src/modules/migration/migration.validation.js
const Joi = require("joi");

const importDataValidation = Joi.object({
  clients: Joi.array().items(Joi.object().unknown(true)).optional(),
  projects: Joi.array().items(Joi.object().unknown(true)).optional(),
  invoices: Joi.array().items(Joi.object().unknown(true)).optional(),
  payments: Joi.array().items(Joi.object().unknown(true)).optional(),
});

module.exports = {
  importDataValidation,
};
