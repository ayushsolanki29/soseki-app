// src/modules/questionnaires/questionnaires.service.js
const prisma = require("../../database/prisma");
const crypto = require("crypto");
const aiService = require("../../utils/ai");
const { SYSTEM_PROMPT, EXPORT_PROMPT_TEMPLATE } = require("./questionnaires.prompts");
const { importAiQuestionnaireValidation } = require("./questionnaires.validation");

class QuestionnairesService {
  async getQuestionnaires(organizationId, query = "", status = "All", page = "1", limit = "25") {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 25));
    const skip = (pageNum - 1) * limitNum;

    const where = {
      organizationId,
      ...(status !== "All" ? { status } : {}),
      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      }),
    };

    const totalCount = await prisma.questionnaire.count({ where });

    const questionnaires = await prisma.questionnaire.findMany({
      where,
      skip,
      take: limitNum,
      include: {
        _count: {
          select: { responses: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      questionnaires: questionnaires.map((q) => ({
        ...q,
        responseCount: q._count.responses,
      })),
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    };
  }

  async createQuestionnaire(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { title, description, maxResponses, clientId, projectId, fields } = data;

    const slug = crypto.randomUUID();

    const newQuestionnaire = await prisma.questionnaire.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        slug,
        maxResponses: maxResponses ? parseInt(maxResponses) : null,
        organizationId,
        clientId: clientId || null,
        projectId: projectId || null,
        fields:
          fields && fields.length > 0
            ? {
                create: fields.map((field, index) => ({
                  type: field.type,
                  label: field.label,
                  description: field.description || null,
                  required: field.required || false,
                  order: index,
                  options: field.options || null,
                })),
              }
            : undefined,
      },
      include: {
        fields: true,
      },
    });

    return newQuestionnaire;
  }

  async getQuestionnaireById(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const questionnaire = await prisma.questionnaire.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        fields: {
          orderBy: {
            order: "asc",
          },
        },
        client: {
          select: { id: true, name: true, email: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    });

    if (!questionnaire) {
      const error = new Error("Questionnaire not found");
      error.status = 404;
      throw error;
    }

    return questionnaire;
  }

  async updateQuestionnaire(organizationId, id, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { title, description, status, maxResponses, clientId, projectId, fields } = data;

    const existing = await prisma.questionnaire.findFirst({
      where: { id, organizationId },
    });

    if (!existing) {
      const error = new Error("Questionnaire not found");
      error.status = 404;
      throw error;
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (maxResponses !== undefined) updateData.maxResponses = maxResponses === null ? null : parseInt(maxResponses);
    if (clientId !== undefined) updateData.clientId = clientId;
    if (projectId !== undefined) updateData.projectId = projectId;

    if (fields) {
      await prisma.$transaction([
        prisma.questionnaireField.deleteMany({
          where: { questionnaireId: id },
        }),
        prisma.questionnaire.update({
          where: { id },
          data: {
            ...updateData,
            fields: {
              create: fields.map((field, index) => ({
                type: field.type,
                label: field.label,
                description: field.description || null,
                required: field.required || false,
                order: index,
                options: field.options || null,
              })),
            },
          },
        }),
      ]);
    } else {
      await prisma.questionnaire.update({
        where: { id },
        data: updateData,
      });
    }

    const updatedQuestionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: { fields: { orderBy: { order: "asc" } } },
    });

    return updatedQuestionnaire;
  }

  async deleteQuestionnaire(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const existing = await prisma.questionnaire.findFirst({
      where: { id, organizationId },
    });

    if (!existing) {
      const error = new Error("Questionnaire not found");
      error.status = 404;
      throw error;
    }

    await prisma.questionnaire.delete({
      where: { id },
    });

    return { success: true };
  }

  async getQuestionnaireResponses(organizationId, id, page = "1", limit = "25") {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 25));
    const skip = (pageNum - 1) * limitNum;

    const questionnaire = await prisma.questionnaire.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        fields: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!questionnaire) {
      const error = new Error("Questionnaire not found");
      error.status = 404;
      throw error;
    }

    const totalCount = await prisma.questionnaireResponse.count({
      where: { questionnaireId: id },
    });

    const responses = await prisma.questionnaireResponse.findMany({
      where: { questionnaireId: id },
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
    });

    return {
      questionnaire,
      responses,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum),
      },
    };
  }

  // --- AI METHODS ---

  async getAiUsage(organizationId) {
    const aiConfig = require("../../config/app.config").ai;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const used = await prisma.aiUsage.count({
      where: {
        organizationId,
        feature: "questionnaire_generation",
        success: true,
        createdAt: { gte: today },
      },
    });

    return {
      used,
      limit: aiConfig.maxGenerationsPerDay,
      remaining: Math.max(0, aiConfig.maxGenerationsPerDay - used),
    };
  }

  async generateWithAi(userId, organizationId, prompt) {
    // Check daily limits
    const usage = await this.getAiUsage(organizationId);
    if (usage.used >= usage.limit) {
      const error = new Error("Daily AI generation limit reached.");
      error.status = 429;
      throw error;
    }

    const validateFn = async (parsedJson) => {
      await importAiQuestionnaireValidation.validateAsync({ json: parsedJson });
      this._validateSpecificRules(parsedJson, true);
    };

    const result = await aiService.generateJson(SYSTEM_PROMPT, prompt, validateFn);
    
    // Save usage metrics to database
    await prisma.aiUsage.create({
      data: {
        userId,
        organizationId,
        feature: "questionnaire_generation",
        provider: "OpenRouter",
        model: result.model,
        promptTokens: result.usage.prompt_tokens,
        completionTokens: result.usage.completion_tokens,
        totalTokens: result.usage.total_tokens,
        success: true,
      },
    });

    return result.data;
  }

  getPromptForAi() {
    return { prompt: EXPORT_PROMPT_TEMPLATE };
  }

  async importAiQuestionnaire(json) {
    // Basic Joi validation
    await importAiQuestionnaireValidation.validateAsync({ json });
    
    // Additional domain validations
    this._validateSpecificRules(json);

    return json;
  }

  _validateSpecificRules(json, enforceFieldLimit = false) {
    const aiConfig = require("../../config/app.config").ai;
    const validTypes = ["TEXT", "TEXTAREA", "SELECT", "RADIO", "CHECKBOX"];
    
    if (enforceFieldLimit && json.fields.length > aiConfig.maxFields) {
      const error = new Error(`Questionnaire cannot exceed ${aiConfig.maxFields} fields.`);
      error.status = 400;
      throw error;
    }

    const seenLabels = new Set();
    
    for (const field of json.fields) {
      if (!validTypes.includes(field.type)) {
        const error = new Error(`Unsupported field type: ${field.type}`);
        error.status = 422;
        throw error;
      }
      
      if (seenLabels.has(field.label)) {
        const error = new Error(`Duplicate field label found: ${field.label}`);
        error.status = 400;
        throw error;
      }
      seenLabels.add(field.label);

      if (["SELECT", "RADIO", "CHECKBOX"].includes(field.type)) {
        if (!field.options || field.options.length === 0) {
          const error = new Error(`Field "${field.label}" requires options.`);
          error.status = 400;
          throw error;
        }
      }
    }
  }

  // --- PUBLIC METHODS ---

  async getPublicQuestionnaire(slug) {
    const questionnaire = await prisma.questionnaire.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug }
        ]
      },
      include: {
        fields: {
          orderBy: { order: "asc" },
        },
        organization: {
          select: { name: true },
        },
      },
    });

    if (!questionnaire) {
      const error = new Error("Questionnaire not found");
      error.status = 404;
      throw error;
    }

    if (questionnaire.status !== "Active") {
      const error = new Error("This questionnaire is currently inactive.");
      error.status = 403;
      throw error;
    }

    if (questionnaire.maxResponses && questionnaire.responseCount >= questionnaire.maxResponses) {
      const error = new Error("This questionnaire has reached its maximum number of responses.");
      error.status = 403;
      throw error;
    }

    return questionnaire;
  }

  async submitQuestionnaireResponse(slug, data) {
    const { answers } = data;

    const questionnaire = await prisma.questionnaire.findUnique({
      where: { slug },
      include: { fields: true },
    });

    if (!questionnaire) {
      const error = new Error("Questionnaire not found");
      error.status = 404;
      throw error;
    }

    if (questionnaire.status !== "Active") {
      const error = new Error("This questionnaire is currently inactive.");
      error.status = 403;
      throw error;
    }

    if (questionnaire.maxResponses && questionnaire.responseCount >= questionnaire.maxResponses) {
      const error = new Error("This questionnaire has reached its maximum number of responses.");
      error.status = 403;
      throw error;
    }

    for (const field of questionnaire.fields) {
      if (field.required && !answers[field.id]) {
        const error = new Error(`Field "${field.label}" is required.`);
        error.status = 400;
        throw error;
      }
    }

    await prisma.$transaction([
      prisma.questionnaireResponse.create({
        data: {
          questionnaireId: questionnaire.id,
          clientId: questionnaire.clientId,
          answers: answers,
        },
      }),
      prisma.questionnaire.update({
        where: { id: questionnaire.id },
        data: { responseCount: { increment: 1 } },
      }),
    ]);

    return { success: true };
  }
}

module.exports = new QuestionnairesService();
