const express = require("express");
const router = express.Router();
const questionnairesController = require("./questionnaires.controller");
const questionnairesValidation = require("./questionnaires.validation");
const validate = require("../../middleware/validate.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");

// Public routes (no auth required)
router.get("/public/:slug", questionnairesController.getPublicQuestionnaire);
router.post("/public/:slug", validate(questionnairesValidation.submitQuestionnaireResponseValidation), questionnairesController.submitQuestionnaireResponse);

// Protected routes
router.use(authMiddleware);

router.get("/prompt", questionnairesController.getPrompt);
router.get("/templates", questionnairesController.getTemplates);
router.get("/", questionnairesController.getQuestionnaires);
router.post("/", validate(questionnairesValidation.createQuestionnaireValidation), questionnairesController.createQuestionnaire);
router.get("/:id", questionnairesController.getQuestionnaireById);
router.patch("/:id", validate(questionnairesValidation.updateQuestionnaireValidation), questionnairesController.updateQuestionnaire);
router.delete("/:id", questionnairesController.deleteQuestionnaire);
router.get("/:id/responses", questionnairesController.getQuestionnaireResponses);

module.exports = router;
