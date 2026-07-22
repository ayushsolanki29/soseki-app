const cron = require("node-cron");
const prisma = require("../../database/prisma");
const transporter = require("../../utils/mailer");
const { mail: mailConfig } = require("../../config/app.config");

let isRunning = false;

const processQueue = async () => {
  if (isRunning) return;
  isRunning = true;

  try {
    // 1. Fetch pending emails that are ready to be sent (nextRunAt <= now)
    // We limit to 50 at a time to avoid overwhelming connection pools (especially Supabase connections).
    const emails = await prisma.emailQueue.findMany({
      where: {
        status: { in: ["Pending", "Failed"] },
        nextRunAt: { lte: new Date() },
        attempts: { lt: 3 } // Usually maxAttempts is 3
      },
      orderBy: { createdAt: "asc" },
      take: 50,
    });

    if (emails.length === 0) {
      isRunning = false;
      return;
    }

    // Mark as processing
    const ids = emails.map(e => e.id);
    await prisma.emailQueue.updateMany({
      where: { id: { in: ids } },
      data: { status: "Processing" }
    });

    // Send emails
    for (const email of emails) {
      try {
        const mailOptions = {
          from: `"${mailConfig.fromName}" <${mailConfig.resendFromEmail}>`,
          to: email.to,
          subject: email.subject,
          html: email.htmlBody,
        };

        // Attempt to send
        await transporter.sendMail(mailOptions);

        // Success
        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status: "Sent",
            attempts: email.attempts + 1
          }
        });

      } catch (error) {
        console.error(`Failed to send email ${email.id} to ${email.to}:`, error.message);
        
        const nextAttempts = email.attempts + 1;
        const status = nextAttempts >= email.maxAttempts ? "Failed" : "Pending";
        
        // Exponential backoff for retries: 5min, 15min, etc.
        const nextRunAt = new Date(Date.now() + nextAttempts * 5 * 60000);

        await prisma.emailQueue.update({
          where: { id: email.id },
          data: {
            status,
            attempts: nextAttempts,
            lastError: error.message,
            nextRunAt,
          }
        });
      }
    }
  } catch (error) {
    console.error("Error in email queue worker:", error);
  } finally {
    isRunning = false;
  }
};

/**
 * Initializes the cron job to poll the queue.
 * Runs every minute to balance responsiveness and Supabase free-tier connection constraints.
 */
const startEmailWorker = () => {
  console.log("Email Queue Worker initialized. Polling every minute.");
  cron.schedule("* * * * *", () => {
    processQueue();
  });
};

module.exports = {
  startEmailWorker,
  processQueue // Exported for manual trigger testing
};
