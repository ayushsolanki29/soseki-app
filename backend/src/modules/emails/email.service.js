const prisma = require("../../database/prisma");
const { renderTemplate } = require("./email.template");
const { server: serverConfig } = require("../../config/app.config");

/**
 * Checks if a user has opted out of a specific email category.
 */
const hasOptedOut = async (userId, category) => {
  if (category === "Transactional" || category === "Security") {
    return false; // Users cannot opt out of critical emails
  }
  
  if (!userId) return false;

  const pref = await prisma.emailPreference.findUnique({
    where: {
      userId_category: {
        userId,
        category,
      },
    },
  });

  return pref ? pref.optOut : false;
};

/**
 * Queues an email to be sent by the worker.
 * 
 * @param {object} options 
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.template - Template name (e.g. 'default')
 * @param {object} options.context - Variables for the template
 * @param {string} options.category - Email category (e.g. 'Marketing', 'Transactional')
 * @param {string} options.userId - User ID (optional, used to check preferences)
 */
const queueEmail = async ({ to, subject, template = "default", context = {}, category = "Transactional", userId = null }) => {
  // Check preferences if userId is provided
  if (userId) {
    const isOptedOut = await hasOptedOut(userId, category);
    if (isOptedOut) {
      console.log(`Skipping email to ${to} (Category: ${category}) - User opted out.`);
      return null;
    }
  }

  // Render HTML body
  // Add common variables
  context.subject = subject;
  if (!context.unsubscribeUrl && userId) {
    // Generate an unsubscribe link if needed (mocked for now, can be updated later)
    context.unsubscribeUrl = `${serverConfig.clientUrl}/dashboard/profile?tab=preferences`;
    context.showUnsubscribe = category !== "Transactional" && category !== "Security";
  }

  const htmlBody = renderTemplate(template, context);

  // Add to database queue
  const queuedEmail = await prisma.emailQueue.create({
    data: {
      to,
      subject,
      htmlBody,
      category,
      status: "Pending",
    }
  });

  console.log(`Email queued for ${to} (ID: ${queuedEmail.id})`);
  return queuedEmail;
};

module.exports = {
  queueEmail,
  hasOptedOut
};
