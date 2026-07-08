const migrationService = require("./migration.service");

class MigrationController {
  async importData(req, res, next) {
    try {
      const imported = await migrationService.importData(req.user.organizationId, req.body);
      return res.status(200).json({ success: true, imported });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new MigrationController();
