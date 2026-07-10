// src/modules/expenses/expenses.service.js
const prisma = require("../../database/prisma");

class ExpensesService {
  async getExpenses(organizationId) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const expenses = await prisma.expense.findMany({
      where: { organizationId },
      include: { client: true, project: true, invoice: true },
      orderBy: { date: "desc" },
    });

    return expenses;
  }

  async getExpenseById(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const expense = await prisma.expense.findUnique({
      where: { id, organizationId },
      include: { client: true, project: true, invoice: true },
    });

    if (!expense) {
      const error = new Error("Expense not found");
      error.status = 404;
      throw error;
    }

    return expense;
  }

  async createExpense(organizationId, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { description, amount, date, category, status, clientId, projectId, invoiceId, currency, exchangeRate } = data;

    const expenseAmount = parseFloat(amount);
    if (!expenseAmount || expenseAmount <= 0) {
      const error = new Error("Invalid expense amount");
      error.status = 400;
      throw error;
    }

    const expense = await prisma.expense.create({
      data: {
        description,
        amount: expenseAmount,
        date: date ? new Date(date) : new Date(),
        category: category || "Other",
        organizationId,
        clientId: clientId || null,
        projectId: projectId || null,
        invoiceId: invoiceId || null,
        currency: currency || null,
        exchangeRate: exchangeRate || null,
        status: status || "Paid",
      },
      include: { client: true, project: true, invoice: true },
    });

    return expense;
  }

  async updateExpense(organizationId, id, data) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const { description, amount, date, category, status, clientId, projectId, invoiceId, currency, exchangeRate } = data;

    const updateData = {};
    if (description !== undefined) updateData.description = description;
    if (amount !== undefined) {
      const expenseAmount = parseFloat(amount);
      if (!expenseAmount || expenseAmount <= 0) {
        const error = new Error("Invalid expense amount");
        error.status = 400;
        throw error;
      }
      updateData.amount = expenseAmount;
    }
    if (date !== undefined) updateData.date = date ? new Date(date) : new Date();
    if (category !== undefined) updateData.category = category || "Other";
    if (clientId !== undefined) updateData.clientId = clientId || null;
    if (projectId !== undefined) updateData.projectId = projectId || null;
    if (invoiceId !== undefined) updateData.invoiceId = invoiceId || null;
    if (currency !== undefined) updateData.currency = currency || null;
    if (exchangeRate !== undefined) updateData.exchangeRate = exchangeRate || null;
    if (status !== undefined) updateData.status = status;

    const expense = await prisma.expense.update({
      where: { id, organizationId },
      data: updateData,
    });

    return expense;
  }

  async deleteExpense(organizationId, id) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    await prisma.expense.delete({
      where: { id, organizationId },
    });

    return { success: true };
  }
}

module.exports = new ExpensesService();
