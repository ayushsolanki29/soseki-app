const questionnairesService = require("./questionnaires.service");

class QuestionnairesController {
  async getQuestionnaires(req, res, next) {
    try {
      const { query, status, page, limit } = req.query;
      const result = await questionnairesService.getQuestionnaires(req.user.organizationId, query, status, page, limit);
      return res.status(200).json({ success: true, ...result });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async createQuestionnaire(req, res, next) {
    try {
      const questionnaire = await questionnairesService.createQuestionnaire(req.user.organizationId, req.body);
      return res.status(201).json({ success: true, questionnaire });
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getQuestionnaireById(req, res, next) {
    try {
      const questionnaire = await questionnairesService.getQuestionnaireById(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true, questionnaire });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async updateQuestionnaire(req, res, next) {
    try {
      const questionnaire = await questionnairesService.updateQuestionnaire(req.user.organizationId, req.params.id, req.body);
      return res.status(200).json({ success: true, questionnaire });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async deleteQuestionnaire(req, res, next) {
    try {
      await questionnairesService.deleteQuestionnaire(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getQuestionnaireResponses(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await questionnairesService.getQuestionnaireResponses(req.user.organizationId, req.params.id, page, limit);
      return res.status(200).json({ success: true, ...result });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  // --- PUBLIC ROUTES ---

  async getPublicQuestionnaire(req, res, next) {
    try {
      const questionnaire = await questionnairesService.getPublicQuestionnaire(req.params.slug);
      return res.status(200).json({ success: true, questionnaire });
    } catch (error) {
      if (error.status === 404 || error.status === 403) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async submitQuestionnaireResponse(req, res, next) {
    try {
      await questionnairesService.submitQuestionnaireResponse(req.params.slug, req.body);
      return res.status(201).json({ success: true, message: "Response submitted successfully." });
    } catch (error) {
      if (error.status === 404 || error.status === 403 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new QuestionnairesController();
