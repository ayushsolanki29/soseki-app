const projectsService = require("./projects.service");

class ProjectsController {
  async getProjects(req, res, next) {
    try {
      const { clientId, status } = req.query;
      const projects = await projectsService.getProjects(req.user.organizationId, clientId, status);
      return res.status(200).json({ success: true, projects });
    } catch (error) {
      if (error.status === 401) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async createProject(req, res, next) {
    try {
      const project = await projectsService.createProject(req.user.organizationId, req.body);
      return res.status(201).json({ success: true, project });
    } catch (error) {
      if (error.status === 401 || error.status === 400) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
      const project = await projectsService.getProjectById(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true, project });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const project = await projectsService.updateProject(req.user.organizationId, req.params.id, req.body);
      return res.status(200).json({ success: true, project });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  async deleteProject(req, res, next) {
    try {
      await projectsService.deleteProject(req.user.organizationId, req.params.id);
      return res.status(200).json({ success: true });
    } catch (error) {
      if (error.status === 401 || error.status === 404) {
        return res.status(error.status).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}

module.exports = new ProjectsController();
