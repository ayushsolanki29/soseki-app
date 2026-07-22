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
      },
    });

    if (!project || project.organizationId !== organizationId) {
      const error = new Error("Project not found");
      error.status = 404;
      throw error;
    }

    const expenses = await prisma.expense.findMany({
      where: {
        organizationId,
        OR: [
          { projectId: id },
          { invoice: { projectId: id } }
        ]
      },
      include: {
        invoice: { select: { id: true, invoiceNumber: true } }
      },
      orderBy: { date: "desc" }
    });

    project.expenses = expenses;

    let totalEarnings = 0;
    if (project.invoices) {
      project.invoices.forEach(inv => {
        totalEarnings += Number(inv.paidAmount || 0) * Number(inv.exchangeRate || 1.0);
      });
    }

    let totalExpenses = 0;
    expenses.forEach(exp => {
      totalExpenses += Number(exp.amount || 0) * Number(exp.exchangeRate || 1.0);
    });

    project.summary = {
      totalEarnings,
      totalExpenses,
      netProfit: totalEarnings - totalExpenses
    };

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
