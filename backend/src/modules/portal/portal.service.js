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
              invoiceFooterNote: true
            }
          }
        }
      }
    }
  });

  if (!invoice) {
    throw new ApiError(404, "Invoice not found");
  }

  return invoice;
};
