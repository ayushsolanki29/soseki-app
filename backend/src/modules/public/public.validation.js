const Joi = require('joi');

const contactFormValidation = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters long',
    'string.max': 'First name cannot exceed 50 characters'
  }),
  lastName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters long',
    'string.max': 'Last name cannot exceed 50 characters'
  }),
  email: Joi.string().trim().email().max(255).required().messages({
    'string.empty': 'Work email is required',
    'string.email': 'Please provide a valid email address',
    'string.max': 'Email cannot exceed 255 characters'
  }),
  message: Joi.string().trim().min(10).max(2000).required().messages({
    'string.empty': 'Message is required',
    'string.min': 'Message must be at least 10 characters long',
    'string.max': 'Message cannot exceed 2000 characters'
  })
});

module.exports = {
  contactFormValidation
};
