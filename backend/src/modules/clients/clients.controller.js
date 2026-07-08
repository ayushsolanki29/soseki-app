const clientsService = require("./clients.service");

class ClientsController {
  async getClients(req, res, next) {
    try {
      const { query, status, page, limit } = req.query;
      const result = await clientsService.getClients(req.user.organizationId, query, status, page, limit);

      return res.status(200).json({
        success: true,
        clients: result.clients,
        pagination: result.pagination,
      });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async createClient(req, res, next) {
    try {
      const client = await clientsService.createClient(req.user.organizationId, req.body);
      return res.status(201).json({ success: true, client });
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getClientById(req, res, next) {
    try {
      const client = await clientsService.getClientById(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true, client });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async updateClient(req, res, next) {
    try {
      const client = await clientsService.updateClient(req.user.organizationId, req.params.id, req.body);
      return res.status(200).json({ success: true, client });
    } catch (error) {
      if (error.status === 401 || error.status === 404 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new ClientsController();
