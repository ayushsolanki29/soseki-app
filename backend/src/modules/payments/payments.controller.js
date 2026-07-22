const paymentsService = require("./payments.service");

class PaymentsController {
  async getPayments(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await paymentsService.getPayments(req.user.organizationId, page, limit);
      return res.status(200).json({ success: true, payments: result.payments, pagination: result.pagination });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
  async updatePayment(req, res, next) {
    try {
      const payment = await paymentsService.updatePayment(req.user.organizationId, req.params.id, req.body);
      return res.status(200).json({ success: true, payment });
    } catch (error) {
      if (error.status === 401 || error.status === 404 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async deletePayment(req, res, next) {
    try {
      await paymentsService.deletePayment(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new PaymentsController();
