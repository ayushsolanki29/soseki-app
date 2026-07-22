// src/modules/invoices/invoices.service.js
const prisma = require("../../database/prisma");

class InvoicesService {
  async getInvoices(organizationId, clientId, projectId, status, page = "1", limit = "25") {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 25));
    const skip = (pageNum - 1) * limitNum;

    const baseWhere = { organizationId };
    if (clientId && clientId !== "All") baseWhere.clientId = clientId;
    if (projectId && projectId !== "All") baseWhere.projectId = projectId;
    
    const where = { ...baseWhere };
    if (status && status !== "All") where.status = status;

    const totalCount = await prisma.invoice.count({ where });

    const invoices = await prisma.invoice.findMany({
      where,
      skip,
      take: limitNum,
      select: {
        id: true,
        invoiceNumber: true,
        issueDate: true,
        dueDate: true,
        status: true,
        totalAmount: true,
        paidAmount: true,
        currency: true,
        exchangeRate: true,
        createdAt: true,
        client: {
          select: { id: true, name: true, email: true }
        },
        project: {
          select: { id: true, title: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    const allInvoices = await prisma.invoice.findMany({
      where: baseWhere,
      select: { totalAmount: true, paidAmount: true, exchangeRate: true, status: true, dueDate: true }
    });

    const summary = {
      totalInvoiced: allInvoices.reduce((acc, inv) => acc + (Number(inv.totalAmount) * Number(inv.exchangeRate || 1.0)), 0),
      totalPaid: allInvoices.reduce((acc, inv) => acc + (Math.min(Number(inv.paidAmount || 0), Number(inv.totalAmount)) * Number(inv.exchangeRate || 1.0)), 0),
      overdueCount: allInvoices.filter(inv => {
        const isOverdue = inv.status === "Overdue" || (new Date(inv.dueDate) < new Date() && Number(inv.paidAmount || 0) < Number(inv.totalAmount));
        return isOverdue && inv.status !== 'Draft' && inv.status !== 'Cancelled' && inv.status !== 'Paid';
      }).length
    };
    summary.totalOutstanding = Math.max(0, summary.totalInvoiced - summary.totalPaid);

    return {
      invoices,
      summary,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    };
  }

  async createInvoice(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const {
      clientId,
      projectId,
      invoiceNumber,
      status,
      issueDate,
      dueDate,
      currency,
      subtotal,
      taxAmount,
      discountAmount,
      totalAmount,
      exchangeRate,
      notice,
      notes,
      terms,
      items,
    } = data;

    const invoice = await prisma.invoice.create({
      data: {
        organizationId,
        clientId,
        projectId: projectId || null,
        invoiceNumber,
        status: status || "Draft",
        issueDate: issueDate ? new Date(issueDate) : new Date(),
        dueDate: new Date(dueDate),
        currency: currency || "USD",
        subtotal: parseFloat(subtotal) || 0,
        taxAmount: parseFloat(taxAmount) || 0,
        discountAmount: parseFloat(discountAmount) || 0,
        totalAmount: parseFloat(totalAmount) || 0,
        exchangeRate: parseFloat(exchangeRate) || 1.0,
        notice,
        notes,
        terms,
        items: {
          create: items?.map((item) => ({
            description: item.description,
            quantity: parseInt(item.quantity) || 1,
            unitPrice: parseFloat(item.unitPrice) || 0,
            taxRate: parseFloat(item.taxRate) || 0,
            total: parseFloat(item.total) || 0,
          })) || [],
        },
        activities: {
          create: [{ type: "CREATED", description: "Invoice created" }],
        },
      },
      include: {
        items: true,
        activities: true,
      },
    });

    return invoice;
  }

  async getInvoiceById(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id, organizationId },
      include: {
        client: true,
        project: true,
        items: true,
        payments: { orderBy: { date: "desc" } },
        activities: { orderBy: { date: "desc" } },
        expenses: { orderBy: { date: "desc" } },
      },
    });

    if (!invoice) {
      const error = new Error("Invoice not found");
      error.status = 404;
      throw error;
    }

    return invoice;
  }

  async updateInvoice(organizationId, id, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    // Check if it's just a status update
    if (Object.keys(data).length === 1 && data.status) {
      const invoice = await prisma.invoice.update({
        where: { id, organizationId },
        data: {
          status: data.status,
          activities: {
            create: [{ type: "UPDATED", description: `Status changed to ${data.status}` }],
          },
        },
      });
      return invoice;
    }

    const {
      clientId,
      projectId,
      invoiceNumber,
      status,
      issueDate,
      dueDate,
      currency,
      subtotal,
      taxAmount,
      discountAmount,
      totalAmount,
      exchangeRate,
      notice,
      notes,
      terms,
      items,
    } = data;

    const invoice = await prisma.invoice.update({
      where: { id, organizationId },
      data: {
        clientId,
        projectId: projectId || null,
        invoiceNumber,
        status: status || "Draft",
        issueDate: issueDate ? new Date(issueDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        currency: currency || "USD",
        subtotal: parseFloat(subtotal) || 0,
        taxAmount: parseFloat(taxAmount) || 0,
        discountAmount: parseFloat(discountAmount) || 0,
        totalAmount: parseFloat(totalAmount) || 0,
        exchangeRate: parseFloat(exchangeRate) || 1.0,
        notice,
        notes,
        terms,
        items: {
          deleteMany: {},
          create: items?.map((item) => ({
            description: item.description,
            quantity: parseInt(item.quantity) || 1,
            unitPrice: parseFloat(item.unitPrice) || 0,
            taxRate: parseFloat(item.taxRate) || 0,
            total: parseFloat(item.total) || 0,
          })) || [],
        },
        activities: {
          create: [{ type: "UPDATED", description: "Invoice updated" }],
        },
      },
      include: {
        items: true,
        client: true,
        project: true,
      },
    });

    return invoice;
  }

  async deleteInvoice(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    await prisma.invoice.delete({
      where: { id, organizationId },
    });

    return { success: true };
  }

  async recordPayment(organizationId, invoiceId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { amount, date, method, reference } = data;
    const paymentAmount = parseFloat(amount);

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      const error = new Error("Invalid payment amount");
      error.status = 400;
      throw error;
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId, organizationId },
    });

    if (!invoice) {
      const error = new Error("Invoice not found");
      error.status = 404;
      throw error;
    }

    const newPaidAmount = invoice.paidAmount + paymentAmount;
    let newStatus = invoice.status;
    
    if (newPaidAmount >= invoice.totalAmount) {
      newStatus = "Paid";
    } else if (newPaidAmount > 0 && invoice.status !== "Paid") {
      newStatus = "Partially Paid";
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: newPaidAmount,
        status: newStatus,
        payments: {
          create: {
            amount: paymentAmount,
            date: date ? new Date(date) : new Date(),
            method: method || "Bank Transfer",
            reference: reference || null,
          }
        },
        activities: {
          create: {
            type: "UPDATED",
            description: `Payment of ${invoice.currency} ${paymentAmount.toFixed(2)} recorded via ${method || "Bank Transfer"}`
          }
        }
      },
      include: {
        payments: true
      }
    });

    return updatedInvoice;
  }

  async verifyPayment(organizationId, invoiceId) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId, organizationId },
      include: { payments: true }
    });

    if (!invoice) {
      const error = new Error("Invoice not found");
      error.status = 404;
      throw error;
    }

    if (invoice.status !== "Processing") {
      const error = new Error("Invoice is not pending verification");
      error.status = 400;
      throw error;
    }

    // Assuming the most recent payment is the unverified one that brought the total to full
    // But since `recordClientPayment` creates a Payment record with the remaining amount,
    // and updates status to Processing, we just change status to Paid, and update paidAmount
    const pendingPaymentAmount = invoice.totalAmount - invoice.paidAmount;

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: "Paid",
        paidAmount: invoice.totalAmount, // Assuming full payment was verified
        activities: {
          create: {
            type: "UPDATED",
            description: `Payment verification successful. Invoice marked as Paid.`
          }
        }
      },
      include: {
        payments: true
      }
    });

    return updatedInvoice;
  }
  async trackDownload(organizationId, invoiceId, isClient = false) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId, organizationId }
    });

    if (!invoice) {
      const error = new Error("Invoice not found");
      error.status = 404;
      throw error;
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        activities: {
          create: {
            type: "DOWNLOADED",
            description: `Invoice PDF downloaded by ${isClient ? 'client' : 'organization member'}`
          }
        }
      }
    });

    return updatedInvoice;
  }
}

module.exports = new InvoicesService();
