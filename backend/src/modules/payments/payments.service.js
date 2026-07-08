// src/modules/payments/payments.service.js
const prisma = require("../../database/prisma");

class PaymentsService {
  async getPayments(organizationId) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const payments = await prisma.payment.findMany({
      where: {
        invoice: {
          organizationId,
        },
      },
      include: {
        invoice: {
          include: {
            client: true,
          },
        },
      },
      orderBy: { date: "desc" },
    });

    return payments;
  }
}

module.exports = new PaymentsService();
