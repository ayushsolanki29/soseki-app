const Joi = require("joi");

const searchSchema = {
  query: Joi.object({
    q: Joi.string().allow("").optional()
  })
};

module.exports = {
  searchSchema
};
