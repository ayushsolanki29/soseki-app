// src/modules/quick-items/quick-items.service.js
const prisma = require("../../database/prisma");

class QuickItemsService {
  async getQuickItems(organizationId) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const quickItems = await prisma.quickItem.findMany({
      where: {
        organizationId,
      },
      orderBy: { createdAt: "desc" },
    });

    return quickItems;
  }

  async createQuickItem(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { name, defaultPrice } = data;

    const quickItem = await prisma.quickItem.create({
      data: {
        name: name.trim(),
        defaultPrice: parseFloat(defaultPrice) || 0,
        organizationId,
      },
    });

    return quickItem;
  }
}

module.exports = new QuickItemsService();
