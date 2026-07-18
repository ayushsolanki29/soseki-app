const trackingService = require("./tracking.service");
const { URL } = require("url");

class TrackingController {
  async trackVisit(req, res) {
    // We instantly return 204 No Content so the browser doesn't wait
    res.status(204).send();

    // Now asynchronously process the visit data in the background
    let cleanReferrer = req.body.referrer;
    if (cleanReferrer) {
      try {
        const refUrl = new URL(cleanReferrer);
        const internalDomains = ["soseki.app", "www.soseki.app", "api.soseki.app", "localhost:3000"];
        if (internalDomains.includes(refUrl.host)) {
          cleanReferrer = null;
        }
      } catch (e) {
        // invalid URL
      }
    }

    const data = {
      path: req.body.path,
      referrer: cleanReferrer,
      utmSource: req.body.utmSource,
      utmMedium: req.body.utmMedium,
      utmCampaign: req.body.utmCampaign,
      utmTerm: req.body.utmTerm,
      utmContent: req.body.utmContent,
      userAgent: req.headers["user-agent"]
    };

    // We do NOT await this so the thread is not blocked
    if (!data.path || !data.path.startsWith("/super-admin")) {
      trackingService.trackVisit(data);
    }
  }
}

module.exports = new TrackingController();
