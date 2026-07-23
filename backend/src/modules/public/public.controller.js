const { queueEmail } = require('../emails/email.service');
const prisma = require('../../database/prisma');
const { admin } = require('../../config/app.config');
const disposableDomains = require('../../utils/disposable-domains.json');
// Use disposable-email-detector default export
const detector = require('disposable-email-detector').default;

exports.contactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    // Check for disposable email
    const isDisposable = await detector(email);
    if (isDisposable) {
      return res.status(400).json({ error: 'Please use a valid, non-disposable email address.' });
    }

    const fullName = `${firstName} ${lastName}`;

    // 1. Save to Database
    await prisma.contactSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        message,
      }
    });

    // 1. Send email to Admin
    await queueEmail({
      to: admin.email,
      subject: `New Lead: ${fullName}`,
      template: 'contact_admin',
      context: {
        name: fullName,
        email: email,
        message: message,
      },
      category: 'Transactional'
    });

    // 2. Send Auto-reply to User
    await queueEmail({
      to: email,
      subject: 'We received your message!',
      template: 'contact_user',
      context: {
        firstName: firstName
      },
      category: 'Transactional'
    });

    res.status(200).json({ message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('[CONTACT_ERROR]', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};
