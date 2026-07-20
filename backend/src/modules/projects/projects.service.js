// src/modules/projects/projects.service.js
const prisma = require("../../database/prisma");

class ProjectsService {
  async getProjects(organizationId, clientId, status, page = "1", limit = "25") {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 25));
    const skip = (pageNum - 1) * limitNum;

    const where = { organizationId };
    if (clientId) where.clientId = clientId;
    if (status && status !== "All") where.status = status;

    const totalCount = await prisma.project.count({ where });

    const projects = await prisma.project.findMany({
      where,
      skip,
      take: limitNum,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        startDate: true,
        estimatedEndDate: true,
        createdAt: true,
        client: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { updatedAt: "desc" },
    });

    return {
      projects,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    };
  }

  async createProject(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { title, description, startDate, estimatedEndDate, status, clientId } = data;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        estimatedEndDate: estimatedEndDate ? new Date(estimatedEndDate) : null,
        status: status || "Planning",
        clientId,
        organizationId,
      },
    });

    return project;
  }

  async getProjectById(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: { 
        client: true,
        invoices: {
          orderBy: { issueDate: "desc" },
          include: {
            payments: true,
          },
        },
        expenses: {
          orderBy: { date: "desc" },
        },
      },
    });

    if (!project || project.organizationId !== organizationId) {
      const error = new Error("Project not found");
      error.status = 404;
      throw error;
    }

    return project;
  }

  async updateProject(organizationId, id, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const existingProject = await prisma.project.findUnique({ where: { id } });
    if (!existingProject || existingProject.organizationId !== organizationId) {
      const error = new Error("Project not found");
      error.status = 404;
      throw error;
    }

    const updateData = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.startDate !== undefined) updateData.startDate = new Date(data.startDate);
    if (data.estimatedEndDate !== undefined)
      updateData.estimatedEndDate = data.estimatedEndDate ? new Date(data.estimatedEndDate) : null;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.clientId !== undefined) updateData.clientId = data.clientId;

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return project;
  }

  async deleteProject(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const existingProject = await prisma.project.findUnique({ where: { id } });
    if (!existingProject || existingProject.organizationId !== organizationId) {
      const error = new Error("Project not found");
      error.status = 404;
      throw error;
    }

    await prisma.project.delete({ where: { id } });

    return { success: true };
  }
}

module.exports = new ProjectsService();
