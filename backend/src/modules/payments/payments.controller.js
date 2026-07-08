const paymentsService = require("./payments.service");

class PaymentsController {
  async getPayments(req, res, next) {
    try {
      const payments = await paymentsService.getPayments(req.user.organizationId);
      return res.status(200).json({ success: true, payments });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new PaymentsController();
