// src/modules/leads/leads.service.js
const prisma = require("../../database/prisma");
const disposableEmailDetector = require("disposable-email-detector");

class LeadsService {
  async createLead(data) {
    const { fullName, email, country, profession, earningsRange, previousTool } = data;

    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

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
        profession: profession || null,
        earningsRange: earningsRange || null,
        previousTool: previousTool || null,
      },
    });

    return lead;
  }
}

module.exports = new LeadsService();
