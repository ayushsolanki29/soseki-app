// src/modules/dashboard/dashboard.service.js
const prisma = require("../../database/prisma");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class DashboardService {
  async getStats(organizationId) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      select: { masterCurrency: true },
    });

    const calcDelta = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    // 1. Total Revenue
    const allPayments = await prisma.payment.findMany({
      where: { invoice: { organizationId } },
      select: { amount: true, date: true },
    });

    let totalRevenue = 0;
    let revenueLast30 = 0;
    let revenuePrev30 = 0;

    allPayments.forEach((p) => {
      totalRevenue += p.amount;
      if (p.date >= thirtyDaysAgo) {
        revenueLast30 += p.amount;
      } else if (p.date >= sixtyDaysAgo && p.date < thirtyDaysAgo) {
        revenuePrev30 += p.amount;
      }
    });

    // 2. Outstanding Payments
    const allInvoices = await prisma.invoice.findMany({
      where: { organizationId, status: { notIn: ["Draft", "Cancelled", "Paid"] } },
      select: { totalAmount: true, paidAmount: true, createdAt: true, status: true, dueDate: true },
    });

    let outstanding = 0;
    let overdueCount = 0;
    let overdueCreatedLast30 = 0;
    let overdueCreatedPrev30 = 0;

    allInvoices.forEach((inv) => {
      if (inv.paidAmount < inv.totalAmount) {
        outstanding += inv.totalAmount - inv.paidAmount;
      }

      const isOverdue = inv.status === "Overdue" || (new Date(inv.dueDate) < now && inv.paidAmount < inv.totalAmount);
      if (isOverdue) {
        overdueCount++;
        if (inv.createdAt >= thirtyDaysAgo) overdueCreatedLast30++;
        else if (inv.createdAt >= sixtyDaysAgo && inv.createdAt < thirtyDaysAgo) overdueCreatedPrev30++;
      }
    });

    // 3. Active Projects
    const projects = await prisma.project.findMany({
      where: { organizationId },
      select: { status: true, createdAt: true },
    });

    let activeProjects = 0;
    let activeProjectsLast30 = 0;
    let activeProjectsPrev30 = 0;
    projects.forEach((p) => {
      if (p.status === "Active" || p.status === "In Progress") {
        activeProjects++;
      }
      if (p.createdAt >= thirtyDaysAgo) activeProjectsLast30++;
      else if (p.createdAt >= sixtyDaysAgo && p.createdAt < thirtyDaysAgo) activeProjectsPrev30++;
    });

    // 4. Total Clients
    const clients = await prisma.client.findMany({
      where: { organizationId, status: { not: "Inactive" } },
      select: { createdAt: true },
    });

    let totalClients = clients.length;
    let clientsLast30 = 0;
    let clientsPrev30 = 0;
    clients.forEach((c) => {
      if (c.createdAt >= thirtyDaysAgo) clientsLast30++;
      else if (c.createdAt >= sixtyDaysAgo && c.createdAt < thirtyDaysAgo) clientsPrev30++;
    });

    // 5. Total Expenses
    const expenses = await prisma.expense.findMany({
      where: { organizationId },
      select: { amount: true, date: true },
    });

    let totalExpenses = 0;
    let expensesLast30 = 0;
    let expensesPrev30 = 0;
    expenses.forEach((e) => {
      totalExpenses += e.amount;
      if (e.date >= thirtyDaysAgo) expensesLast30 += e.amount;
      else if (e.date >= sixtyDaysAgo && e.date < thirtyDaysAgo) expensesPrev30 += e.amount;
    });

    const profit = totalRevenue - totalExpenses;
    const profitLast30 = revenueLast30 - expensesLast30;
    const profitPrev30 = revenuePrev30 - expensesPrev30;

    // Latest Active Questionnaire
    const latestQuestionnaire = await prisma.questionnaire.findFirst({
      where: { organizationId, status: "Active" },
      orderBy: { createdAt: "desc" },
    });

    const stats = [
      {
        label: "Total Revenue",
        value: totalRevenue,
        delta: calcDelta(revenueLast30, revenuePrev30),
        footnote: "vs last 30 days",
        lowerIsBetter: false,
        isCurrency: true,
      },
      {
        label: "Outstanding Payments",
        value: outstanding,
        delta: null,
        footnote: "currently unpaid",
        lowerIsBetter: true,
        isCurrency: true,
      },
      {
        label: "Active Projects",
        value: activeProjects,
        delta: calcDelta(activeProjectsLast30, activeProjectsPrev30),
        footnote: "new vs last 30 days",
        lowerIsBetter: false,
        isCurrency: false,
      },
      {
        label: "Total Clients",
        value: totalClients,
        delta: calcDelta(clientsLast30, clientsPrev30),
        footnote: "new vs last 30 days",
        lowerIsBetter: false,
        isCurrency: false,
      },
      {
        label: "Overdue Invoices",
        value: overdueCount,
        delta: calcDelta(overdueCreatedLast30, overdueCreatedPrev30),
        footnote: "new vs last 30 days",
        lowerIsBetter: true,
        isCurrency: false,
      },
      {
        label: "Payments Last 30 Days",
        value: revenueLast30,
        delta: calcDelta(revenueLast30, revenuePrev30),
        footnote: "vs previous 30 days",
        lowerIsBetter: false,
        isCurrency: true,
      },
      {
        label: "Profit",
        value: profit,
        delta: calcDelta(profitLast30, profitPrev30),
        footnote: "vs last 30 days",
        lowerIsBetter: false,
        isCurrency: true,
      },
    ];

    let latestFormLabel = "Latest Form";
    if (latestQuestionnaire) {
      const title = latestQuestionnaire.title;
      const shortTitle = title.length > 15 ? title.substring(0, 15) + "..." : title;
      latestFormLabel = `Latest Form: ${shortTitle}`;
    }

    stats.push({
      label: latestFormLabel,
      value: latestQuestionnaire ? latestQuestionnaire.responseCount : 0,
      delta: null,
      footnote: "responses collected",
      lowerIsBetter: false,
      isCurrency: false,
    });

    return { stats, masterCurrency: org?.masterCurrency || "USD" };
  }

  async getCharts(organizationId) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

    // 1. Revenue Overview Data
    const paymentsThisYear = await prisma.payment.findMany({
      where: {
        invoice: { organizationId },
        date: { gte: startOfYear, lte: endOfYear },
      },
      select: { amount: true, date: true },
    });

    const expensesThisYear = await prisma.expense.findMany({
      where: {
        organizationId,
        date: { gte: startOfYear, lte: endOfYear },
      },
      select: { amount: true, date: true },
    });

    const monthlyData = MONTHS.map((month) => ({ month, revenue: 0, expenses: 0 }));

    paymentsThisYear.forEach((p) => {
      const m = new Date(p.date).getMonth();
      monthlyData[m].revenue += p.amount;
    });

    expensesThisYear.forEach((e) => {
      const m = new Date(e.date).getMonth();
      monthlyData[m].expenses += e.amount;
    });

    const currentMonthIndex = now.getMonth();
    const prevMonthIndex = currentMonthIndex === 0 ? 0 : currentMonthIndex - 1;

    let growthPctNum = 0;
    if (currentMonthIndex > 0) {
      const currRev = monthlyData[currentMonthIndex].revenue;
      const prevRev = monthlyData[prevMonthIndex].revenue;
      if (prevRev > 0) {
        growthPctNum = Number((((currRev - prevRev) / prevRev) * 100).toFixed(1));
      } else if (currRev > 0) {
        growthPctNum = 100;
      }
    }

    // 2. Invoice Status Distribution
    const allInvoices = await prisma.invoice.findMany({
      where: { organizationId },
      select: { status: true, dueDate: true, totalAmount: true, paidAmount: true },
    });

    let counts = { paid: 0, pending: 0, overdue: 0, draft: 0 };
    let totalValid = 0;

    allInvoices.forEach((inv) => {
      let status = inv.status;
      if (status !== "Paid" && status !== "Draft" && status !== "Cancelled" && status !== "Overdue") {
        if (new Date(inv.dueDate) < now && inv.paidAmount < inv.totalAmount) {
          status = "Overdue";
        }
      }

      if (status === "Paid") counts.paid++;
      else if (status === "Overdue") counts.overdue++;
      else if (status === "Draft") counts.draft++;
      else if (status !== "Cancelled") counts.pending++;
    });

    totalValid = counts.paid + counts.pending + counts.overdue + counts.draft;

    let invoiceStatus = [];
    if (totalValid > 0) {
      invoiceStatus = [
        { status: "paid", share: Number(((counts.paid / totalValid) * 100).toFixed(1)), fill: "var(--color-paid)" },
        {
          status: "pending",
          share: Number(((counts.pending / totalValid) * 100).toFixed(1)),
          fill: "var(--color-pending)",
        },
        {
          status: "overdue",
          share: Number(((counts.overdue / totalValid) * 100).toFixed(1)),
          fill: "var(--color-overdue)",
        },
        { status: "draft", share: Number(((counts.draft / totalValid) * 100).toFixed(1)), fill: "var(--color-draft)" },
      ].filter((item) => item.share > 0);
    }

    return {
      revenueOverview: monthlyData,
      growthPctNum,
      invoiceStatus,
    };
  }
}

module.exports = new DashboardService();
