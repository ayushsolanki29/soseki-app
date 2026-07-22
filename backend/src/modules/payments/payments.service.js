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
            currency: true,
            exchangeRate: true,
            client: {
              select: { id: true, name: true, email: true }
            },
            project: {
              select: { id: true, title: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" },
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
  async updatePayment(organizationId, id, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { amount, date, method, reference } = data;
    const newAmount = parseFloat(amount);

    if (isNaN(newAmount) || newAmount <= 0) {
      const error = new Error("Invalid payment amount");
      error.status = 400;
      throw error;
    }

    // Use a transaction to ensure atomic update of both payment and invoice
    const result = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { id },
        include: { invoice: true }
      });

      if (!payment || payment.invoice.organizationId !== organizationId) {
        const error = new Error("Payment not found");
        error.status = 404;
        throw error;
      }

      const amountDifference = newAmount - payment.amount;

      // Update the payment
      const updatedPayment = await tx.payment.update({
        where: { id },
        data: {
          amount: newAmount,
          date: date ? new Date(date) : undefined,
          method,
          reference,
        }
      });

      // Update the invoice
      const invoice = payment.invoice;
      const newPaidAmount = Math.max(0, Number(invoice.paidAmount) + amountDifference);
      
      let newStatus = invoice.status;
      
      // Fix Javascript floating point precision before comparing (e.g., 534.9999999999999 vs 535)
      const roundedPaid = Number(Number(newPaidAmount).toFixed(2));
      const roundedTotal = Number(Number(invoice.totalAmount).toFixed(2));

      if (roundedPaid >= roundedTotal) {
        newStatus = "Paid";
      } else if (roundedPaid > 0) {
        newStatus = "Partially Paid";
      } else {
        if (invoice.status === "Paid" || invoice.status === "Partially Paid") {
            newStatus = "Sent";
        }
      }

      await tx.invoice.update({
        where: { id: invoice.id },
        data: {
          paidAmount: newPaidAmount,
          status: newStatus,
          activities: {
            create: {
              type: "UPDATED",
              description: `Payment ${payment.id.slice(-6)} updated to ${invoice.currency || "USD"} ${newAmount.toFixed(2)}`
            }
          }
        }
      });

      return updatedPayment;
    });

    return result;
  }

  async deletePayment(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const result = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { id },
        include: { invoice: true }
      });

      if (!payment || payment.invoice.organizationId !== organizationId) {
        const error = new Error("Payment not found");
        error.status = 404;
        throw error;
      }

      const invoice = payment.invoice;
      const newPaidAmount = Math.max(0, Number(invoice.paidAmount) - Number(payment.amount));
      
      let newStatus = invoice.status;
      
      // Fix Javascript floating point precision before comparing
      const roundedPaid = Number(Number(newPaidAmount).toFixed(2));
      const roundedTotal = Number(Number(invoice.totalAmount).toFixed(2));

      if (roundedPaid >= roundedTotal) {
        newStatus = "Paid";
      } else if (roundedPaid > 0) {
        newStatus = "Partially Paid";
      } else {
        if (invoice.status === "Paid" || invoice.status === "Partially Paid") {
            newStatus = "Sent";
        }
      }

      await tx.invoice.update({
        where: { id: invoice.id },
        data: {
          paidAmount: newPaidAmount,
          status: newStatus,
          activities: {
            create: {
              type: "UPDATED",
              description: `Payment of ${invoice.currency || "USD"} ${payment.amount.toFixed(2)} deleted`
            }
          }
        }
      });

      await tx.payment.delete({
        where: { id }
      });

      return { success: true };
    });

    return result;
  }
}

module.exports = new PaymentsService();
