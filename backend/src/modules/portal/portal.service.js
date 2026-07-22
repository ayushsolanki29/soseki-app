const prisma = require("../../database/prisma");

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Get safe client profile
 */
exports.getClientProfile = async (clientId) => {
  const client = await prisma.client.findUnique({
    where: { id: clientId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      organization: {
        select: {
          name: true,
          profile: {
            select: {
              phone: true,
              email: true,
              taxId: true,
              registrationNumber: true,
              region: true,
              bankName: true,
              accountNumber: true,
              routingNumber: true,
              branch: true,
              upiId: true,
            }
          }
        }
      }
    }
  });

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  return client;
};

/**
 * Get client projects safely
 */
exports.getClientProjects = async (clientId) => {
  // First ensure client exists
  const clientExists = await prisma.client.findUnique({ where: { id: clientId } });
  if (!clientExists) {
    throw new ApiError(404, "Client not found");
  }

  const projects = await prisma.project.findMany({
    where: { clientId: clientId },
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
      estimatedEndDate: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return projects;
};

/**
 * Get client project by id safely
 */
exports.getClientProjectById = async (clientId, projectId) => {
  const project = await prisma.project.findFirst({
    where: { 
      id: projectId,
      clientId: clientId 
    },
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
      estimatedEndDate: true,
      status: true,
      createdAt: true,
      organization: {
        select: { name: true }
      }
    }
  });

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return project;
};

/**
 * Get client invoices safely
 */
exports.getClientInvoices = async (clientId) => {
  const clientExists = await prisma.client.findUnique({ where: { id: clientId } });
  if (!clientExists) {
    throw new ApiError(404, "Client not found");
  }

  const invoices = await prisma.invoice.findMany({
    where: { clientId: clientId },
    select: {
      id: true,
      invoiceNumber: true,
      status: true,
      issueDate: true,
      dueDate: true,
      currency: true,
      totalAmount: true,
      paidAmount: true,
    },
    orderBy: {
      issueDate: "desc"
    }
  });

  return invoices;
};

/**
 * Get client invoice by id safely
 */
exports.getClientInvoiceById = async (clientId, invoiceId) => {
  const invoice = await prisma.invoice.findFirst({
    where: { 
      id: invoiceId,
      clientId: clientId 
    },
    select: {
      id: true,
      invoiceNumber: true,
      status: true,
      issueDate: true,
      dueDate: true,
      currency: true,
      subtotal: true,
      taxAmount: true,
      discountAmount: true,
      totalAmount: true,
      paidAmount: true,
      exchangeRate: true,
      notice: true,
      notes: true,
      terms: true,
      items: {
        select: {
          id: true,
          description: true,
          quantity: true,
          unitPrice: true,
          taxRate: true,
          total: true
        }
      },
      project: {
        select: { title: true }
      },
      organization: {
        select: {
          name: true,
          address: true,
          profile: {
            select: {
              email: true,
              phone: true,
              taxId: true,
              registrationNumber: true,
              accountNumber: true,
              bankName: true,
              routingNumber: true,
              branch: true,
              invoiceFooterNote: true,
              invoiceTemplate: true,
              upiId: true
            }
          },
          masterCurrency: true
        }
      }
    }
  });

  if (!invoice) {
    throw new ApiError(404, "Invoice not found");
  }

  return invoice;
};

/**
 * Record payment for an invoice
 */
exports.recordClientPayment = async (clientId, invoiceId, method, reference) => {
  const invoice = await prisma.invoice.findFirst({
    where: { 
      id: invoiceId,
      clientId: clientId 
    },
    include: {
      organization: true
    }
  });

  if (!invoice) {
    throw new ApiError(404, "Invoice not found");
  }

  if (invoice.status === "Paid" || invoice.status === "Processing") {
    throw new ApiError(400, `Invoice is already ${invoice.status.toLowerCase()}`);
  }

  // Create payment record and activity log, and update invoice status
  const result = await prisma.$transaction(async (tx) => {
    // 1. Create Payment record
    const payment = await tx.payment.create({
      data: {
        amount: invoice.totalAmount - invoice.paidAmount,
        method: method || "Bank Transfer",
        reference: reference || null,
        invoiceId: invoice.id
      }
    });

    // 2. Update Invoice status to Processing
    const updatedInvoice = await tx.invoice.update({
      where: { id: invoice.id },
      data: { status: "Processing" }
    });

    // 3. Log Activity
    await tx.activity.create({
      data: {
        type: "PAYMENT_RECORDED",
        description: `Client recorded payment via ${method || "Bank Transfer"}${reference ? ` (Ref: ${reference})` : ''}. Pending verification.`,
        invoiceId: invoice.id
      }
    });

    return updatedInvoice;
  });

  return result;
};

/**
 * Track invoice PDF download by client
 */
exports.trackInvoiceDownload = async (clientId, invoiceId) => {
  const invoicesService = require("../invoices/invoices.service");
  
  // Verify relationship
  const invoice = await prisma.invoice.findFirst({
    where: { 
      id: invoiceId,
      clientId: clientId 
    }
  });

  if (!invoice) {
    throw new ApiError(404, "Invoice not found");
  }

  // Delegate to invoices service
  return invoicesService.trackDownload(invoice.organizationId, invoiceId, true);
};
