const express = require('express');
const router = express.Router();
const publicController = require('./public.controller');
const validate = require('../../middleware/validate.middleware');
const { contactFormValidation } = require('./public.validation');
const rateLimit = require('express-rate-limit');

// Rate limiting for public forms to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

// @route   POST /api/public/contact
// @desc    Handle public contact form submissions
// @access  Public
router.post('/contact', contactLimiter, validate(contactFormValidation), publicController.contactForm);

module.exports = router;
