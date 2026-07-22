const { Resend } = require("resend");
const nodemailer = require("nodemailer");
const { mail: mailConfig, admin: adminConfig } = require("../config/app.config");

let resend;
if (mailConfig.resendApiKey) {
  resend = new Resend(mailConfig.resendApiKey);
} else {
  console.warn("WARNING: RESEND_API_KEY is missing. Falling back to Nodemailer entirely if configured.");
}

// Nodemailer SMTP Transporter (Production Optimized)
const smtpTransporter = nodemailer.createTransport({
  pool: true,
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure, 
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
  maxConnections: 5, 
  maxMessages: 100, 
  rateDelta: 1000, 
  rateLimit: 5, // max 5 emails per second
});

const transporter = {
  sendMail: async (mailOptions) => {
    // Robust check for Admin Email (handles arrays and comma-separated strings)
    const toAddresses = Array.isArray(mailOptions.to) 
      ? mailOptions.to 
      : mailOptions.to.split(',').map(e => e.trim());
      
    const isAdminEmail = toAddresses.includes(adminConfig.email);
    
    if (isAdminEmail) {
      console.log(`[MAILER] Routing admin email to ${mailOptions.to} via Nodemailer`);
      mailOptions.from = `"${mailConfig.fromName}" <${mailConfig.user}>`;
      return await smtpTransporter.sendMail(mailOptions);
    }

    // 2. If Resend is not configured, fall back to Nodemailer (or mock in Dev)
    if (!resend) {
      if (mailConfig.user) {
        console.log(`[MAILER] Resend unconfigured. Falling back to Nodemailer for ${mailOptions.to}`);
        mailOptions.from = `"${mailConfig.fromName}" <${mailConfig.user}>`;
        return await smtpTransporter.sendMail(mailOptions);
      } else {
        console.log("---------------------------------------------------------");
        console.log("[DEV MODE] Mock Email Sent:");
        console.log("To:", mailOptions.to);
        console.log("Subject:", mailOptions.subject);
        console.log("---------------------------------------------------------");
        return { id: "mock-email-id" };
      }
    }

    // 3. Try to use Resend
    try {
      const { data, error } = await resend.emails.send({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        html: mailOptions.html,
      });
      
      if (error) {
        throw new Error(error.message || "Resend error");
      }
      return data;
    } catch (error) {
      // 4. Fallback to Nodemailer if Resend fails (Limit exhausted, etc)
      console.error(`[MAILER] Resend failed (${error.message}). Falling back to Nodemailer for ${mailOptions.to}`);
      if (mailConfig.user) {
        mailOptions.from = `"${mailConfig.fromName}" <${mailConfig.user}>`;
        return await smtpTransporter.sendMail(mailOptions);
      }
      throw error;
    }
  }
};

module.exports = transporter;
