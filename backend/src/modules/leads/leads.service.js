// src/modules/leads/leads.service.js
const prisma = require("../../database/prisma");
const emailService = require("../emails/email.service");
const { admin: adminConfig } = require("../../config/app.config");

class LeadsService {
  async validateEmail(email) {
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already exists in waitlist
    const existingLead = await prisma.waitlistLead.findUnique({
      where: { email: cleanEmail },
    });

    if (existingLead) {
      const error = new Error("You are already on the waitlist!");
      error.status = 400;
      throw error;
    }
    
    return true;
  }

  async createLead(data) {
    const { fullName, email, country, profession, customProfession, earningsRange, previousTool, customPreviousTool } = data;

    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    
    // Resolve custom "Other" fields
    const finalProfession = profession === "Other" && customProfession ? customProfession.trim() : (profession || null);
    const finalPreviousTool = previousTool === "Other" && customPreviousTool ? customPreviousTool.trim() : (previousTool || null);

    // Call the newly extracted validation
    await this.validateEmail(cleanEmail);

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
