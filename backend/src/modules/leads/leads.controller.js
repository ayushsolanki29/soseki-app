const leadsService = require("./leads.service");

class LeadsController {
  async createLead(req, res, next) {
    try {
      const lead = await leadsService.createLead(req.body);
      return res.status(201).json({ success: true, lead });
    } catch (error) {
      if (error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new LeadsController();
