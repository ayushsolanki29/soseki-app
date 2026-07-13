// src/modules/payments/payments.service.js
const prisma = require("../../database/prisma");

class PaymentsService {
  async getPayments(organizationId, page = "1", limit = "25") {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 25));
    const skip = (pageNum - 1) * limitNum;

    const where = {
      invoice: {
        organizationId,
      },
    };

    const totalCount = await prisma.payment.count({ where });

    const payments = await prisma.payment.findMany({
      where,
      skip,
      take: limitNum,
      select: {
        id: true,
        amount: true,
        date: true,
        method: true,
        reference: true,
        invoiceId: true,
        createdAt: true,
        invoice: {
          select: {
            id: true,
            invoiceNumber: true,
            client: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      },
      orderBy: { date: "desc" },
    });

    return {
      payments,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    };
  }
}

module.exports = new PaymentsService();
