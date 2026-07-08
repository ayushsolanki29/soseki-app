// src/modules/migration/migration.service.js
const prisma = require("../../database/prisma");

class MigrationService {
  async importData(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { clients = [], projects = [], invoices = [], payments = [] } = data;

    const idMap = {
      clients: {},
      projects: {},
      invoices: {},
    };

    let importStats = { clients: 0, projects: 0, invoices: 0, payments: 0 };

    // 1. Import Clients
    for (const c of clients) {
      const created = await prisma.client.create({
        data: {
          organizationId,
          name: c.name || "Unknown Client",
          email: c.email !== "this-is-blank" ? c.email : `import-${Date.now()}@temp.com`,
          phone: c.phone !== "this-is-blank" ? c.phone : null,
          status: c.status || "Active",
        },
      });
      idMap.clients[c.id] = created.id;
      importStats.clients++;
    }

    // 2. Import Projects
    for (const p of projects) {
      const realClientId = idMap.clients[p.clientId];
      if (!realClientId) continue; // Skip if client mapping failed

      const created = await prisma.project.create({
        data: {
          organizationId,
          clientId: realClientId,
          title: p.title || "Untitled Project",
          description: p.description !== "this-is-blank" ? p.description : null,
          startDate: p.startDate && p.startDate !== "this-is-blank" ? new Date(p.startDate) : new Date(),
          estimatedEndDate:
            p.estimatedEndDate && p.estimatedEndDate !== "this-is-blank" ? new Date(p.estimatedEndDate) : null,
          status: p.status || "Planning",
        },
      });
      idMap.projects[p.id] = created.id;
      importStats.projects++;
    }

    // 3. Import Invoices
    for (const i of invoices) {
      const realClientId = idMap.clients[i.clientId];
      if (!realClientId) continue;

      const realProjectId =
        i.projectId && i.projectId !== "this-is-blank" ? idMap.projects[i.projectId] : null;

      const items = i.items || [];
      const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
      const taxAmount = items.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice * (item.taxRate / 100),
        0
      );
      const totalAmount = subtotal + taxAmount;

      const created = await prisma.invoice.create({
        data: {
          organizationId,
          clientId: realClientId,
          projectId: realProjectId,
          invoiceNumber: i.invoiceNumber || `INV-${Date.now()}`,
          status: i.status || "Draft",
          issueDate: i.issueDate && i.issueDate !== "this-is-blank" ? new Date(i.issueDate) : new Date(),
          dueDate:
            i.dueDate && i.dueDate !== "this-is-blank"
              ? new Date(i.dueDate)
              : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          currency: i.currency || "USD",
          subtotal,
          taxAmount,
          totalAmount,
          items: {
            create: items.map((item) => ({
              description: item.description || "Item",
              quantity: item.quantity || 1,
              unitPrice: item.unitPrice || 0,
              taxRate: item.taxRate || 0,
              total: (item.quantity || 1) * (item.unitPrice || 0) * (1 + (item.taxRate || 0) / 100),
            })),
          },
        },
      });
      idMap.invoices[i.id] = created.id;
      importStats.invoices++;
    }

    // 4. Import Payments
    for (const p of payments) {
      const realInvoiceId = idMap.invoices[p.invoiceId];
      if (!realInvoiceId) continue;

      await prisma.payment.create({
        data: {
          invoiceId: realInvoiceId,
          amount: parseFloat(p.amount) || 0,
          date: p.date && p.date !== "this-is-blank" ? new Date(p.date) : new Date(),
          method: p.method !== "this-is-blank" ? p.method : "Bank Transfer",
          reference: p.reference !== "this-is-blank" ? p.reference : null,
        },
      });

      // Update invoice paidAmount
      await prisma.invoice.update({
        where: { id: realInvoiceId },
        data: {
          paidAmount: { increment: parseFloat(p.amount) || 0 },
        },
      });

      importStats.payments++;
    }

    return importStats;
  }
}

module.exports = new MigrationService();
