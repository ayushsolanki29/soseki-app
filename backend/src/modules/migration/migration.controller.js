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

  async getPrompt(req, res, next) {
    try {
      const { MIGRATION_TEMPLATE, AI_PROMPT } = require("./migration.constants");
      return res.status(200).json({ success: true, prompt: AI_PROMPT, template: MIGRATION_TEMPLATE });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MigrationController();
