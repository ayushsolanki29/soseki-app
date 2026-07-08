const dashboardService = require("./dashboard.service");

class DashboardController {
  async getStats(req, res, next) {
    try {
      const result = await dashboardService.getStats(req.user.organizationId);
      return res.status(200).json({ success: true, ...result });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getCharts(req, res, next) {
    try {
      const result = await dashboardService.getCharts(req.user.organizationId);
      return res.status(200).json({ success: true, ...result });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new DashboardController();
