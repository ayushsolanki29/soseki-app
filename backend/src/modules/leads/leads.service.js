// src/modules/leads/leads.service.js
const prisma = require("../../database/prisma");
const disposableEmailDetector = require("disposable-email-detector").default || require("disposable-email-detector");
const emailService = require("../emails/email.service");
const { admin: adminConfig } = require("../../config/app.config");

class LeadsService {
  async createLead(data) {
    const { fullName, email, country, profession, customProfession, earningsRange, previousTool, customPreviousTool } = data;

    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    
    // Resolve custom "Other" fields
    const finalProfession = profession === "Other" && customProfession ? customProfession.trim() : (profession || null);
    const finalPreviousTool = previousTool === "Other" && customPreviousTool ? customPreviousTool.trim() : (previousTool || null);

    // Disposable Email Check
    try {
      const isDisposable = await disposableEmailDetector(cleanEmail);
      if (isDisposable) {
        const error = new Error("Disposable email addresses are not allowed. Please use your primary email.");
        error.status = 400;
        throw error;
      }
    } catch (detectorError) {
      console.warn("Disposable email detector failed (ignoring check):", detectorError);
      if (detectorError.status === 400) {
        throw detectorError; // Re-throw if it was our explicit disposable email error
      }
    }

    // Check if email already exists in waitlist
    const existingLead = await prisma.waitlistLead.findUnique({
      where: { email: cleanEmail },
    });

    if (existingLead) {
      const error = new Error("You are already on the waitlist!");
      error.status = 400;
      throw error;
    }

    const lead = await prisma.waitlistLead.create({
      data: {
        fullName: cleanFullName,
        email: cleanEmail,
        country: country || null,
        profession: finalProfession,
        earningsRange: earningsRange || null,
        previousTool: finalPreviousTool,
      },
    });

    // 1. Send email to the user
    emailService.queueEmail({
      to: cleanEmail,
      subject: "Thank you for requesting access to Soseki!",
      template: "access_request_user",
      context: { fullName: cleanFullName },
      category: "Transactional"
    }).catch(err => console.error("Failed to queue user email", err));

    // 2. Send email to the admin
    if (adminConfig.email) {
      emailService.queueEmail({
        to: adminConfig.email,
        subject: `New Access Request: ${cleanFullName}`,
        template: "access_request_admin",
        context: { 
          fullName: cleanFullName, 
          email: cleanEmail,
          country,
          profession: finalProfession,
          earningsRange,
          previousTool: finalPreviousTool
        },
        category: "SystemAlerts"
      }).catch(err => console.error("Failed to queue admin email", err));
    }

    return lead;
  }
}

module.exports = new LeadsService();
