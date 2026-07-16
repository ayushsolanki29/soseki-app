const trackingService = require("./tracking.service");

class TrackingController {
  async trackVisit(req, res) {
    // We instantly return 204 No Content so the browser doesn't wait
    res.status(204).send();

    // Now asynchronously process the visit data in the background
    const data = {
      path: req.body.path,
      referrer: req.body.referrer,
      utmSource: req.body.utmSource,
      utmMedium: req.body.utmMedium,
      utmCampaign: req.body.utmCampaign,
      utmTerm: req.body.utmTerm,
      utmContent: req.body.utmContent,
      userAgent: req.headers["user-agent"]
    };

    // We do NOT await this so the thread is not blocked
    trackingService.trackVisit(data);
  }
}

module.exports = new TrackingController();
