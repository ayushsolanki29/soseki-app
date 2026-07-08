const express = require("express");
const router = express.Router();
const projectsController = require("./projects.controller");
const projectsValidation = require("./projects.validation");
const validate = require("../../middleware/validate");
const { authMiddleware } = require("../../middlewares/auth.middleware");

// All project routes require auth
router.use(authMiddleware);

router.get("/", projectsController.getProjects);
router.post("/", validate(projectsValidation.createProjectValidation), projectsController.createProject);
router.get("/:id", projectsController.getProjectById);
router.patch("/:id", validate(projectsValidation.updateProjectValidation), projectsController.updateProject);
router.delete("/:id", projectsController.deleteProject);

module.exports = router;
