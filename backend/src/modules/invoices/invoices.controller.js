const invoicesService = require("./invoices.service");

class InvoicesController {
  async getInvoices(req, res, next) {
    try {
      const { clientId, projectId, status, page, limit } = req.query;
      const result = await invoicesService.getInvoices(req.user.organizationId, clientId, projectId, status, page, limit);
      return res.status(200).json({ success: true, invoices: result.invoices, pagination: result.pagination });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async createInvoice(req, res, next) {
    try {
      const invoice = await invoicesService.createInvoice(req.user.organizationId, req.body);
      return res.status(201).json({ success: true, invoice });
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getInvoiceById(req, res, next) {
    try {
      const invoice = await invoicesService.getInvoiceById(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true, invoice });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async updateInvoice(req, res, next) {
    try {
      const invoice = await invoicesService.updateInvoice(req.user.organizationId, req.params.id, req.body);
      return res.status(200).json({ success: true, invoice });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async deleteInvoice(req, res, next) {
    try {
      await invoicesService.deleteInvoice(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async recordPayment(req, res, next) {
    try {
      const invoice = await invoicesService.recordPayment(req.user.organizationId, req.params.id, req.body);
      return res.status(200).json({ success: true, invoice });
    } catch (error) {
      if (error.status === 401 || error.status === 404 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async verifyPayment(req, res, next) {
    try {
      const invoice = await invoicesService.verifyPayment(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true, invoice });
    } catch (error) {
      if (error.status === 401 || error.status === 404 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new InvoicesController();
