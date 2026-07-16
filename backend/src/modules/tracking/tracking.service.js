const prisma = require("../../database/prisma");

class TrackingService {
  async trackVisit(data) {
    // This is intentionally an async operation that we do NOT wait for in the controller
    // It runs completely in the background
    try {
      await prisma.pageVisit.create({
        data: {
          path: data.path || "/",
          referrer: data.referrer || null,
          utmSource: data.utmSource || null,
          utmMedium: data.utmMedium || null,
          utmCampaign: data.utmCampaign || null,
          utmTerm: data.utmTerm || null,
          utmContent: data.utmContent || null,
          userAgent: data.userAgent || null,
        }
      });
    } catch (error) {
      // We catch this so it doesn't crash the server if tracking fails
      console.error("[Tracker Error] Failed to save page visit:", error);
    }
  }
}

module.exports = new TrackingService();
