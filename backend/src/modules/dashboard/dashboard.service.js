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

    const calcDelta = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    // Parallelize all stat queries and push aggregation to the database
    const [
      org,
      
      totalRevAgg,
      revLast30Agg,
      revPrev30Agg,
      
      // We fetch minimal fields for unpaid invoices to handle JS logic for overdue status
      // (Since column comparison totalAmount > paidAmount is not natively supported in basic Prisma where)
      unpaidInvoices,
      
      activeProjectsCount,
      activeProjectsLast30Count,
      activeProjectsPrev30Count,
      
      totalClientsCount,
      clientsLast30Count,
      clientsPrev30Count,
      
      totalExpAgg,
      expLast30Agg,
      expPrev30Agg,
      
      latestQuestionnaire
    ] = await Promise.all([
      prisma.organization.findUnique({ where: { id: organizationId }, select: { masterCurrency: true } }),
      
      prisma.payment.findMany({ where: { invoice: { organizationId } }, select: { amount: true, invoice: { select: { exchangeRate: true } } } }),
      prisma.payment.findMany({ where: { invoice: { organizationId }, date: { gte: thirtyDaysAgo } }, select: { amount: true, invoice: { select: { exchangeRate: true } } } }),
      prisma.payment.findMany({ where: { invoice: { organizationId }, date: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } }, select: { amount: true, invoice: { select: { exchangeRate: true } } } }),
      
      prisma.invoice.findMany({
        where: { organizationId, status: { notIn: ["Draft", "Cancelled", "Paid"] } },
        select: { totalAmount: true, paidAmount: true, createdAt: true, status: true, dueDate: true, exchangeRate: true }
      }),
      
      prisma.project.count({ where: { organizationId, status: { in: ["Active", "In Progress"] } } }),
      prisma.project.count({ where: { organizationId, status: { in: ["Active", "In Progress"] }, createdAt: { gte: thirtyDaysAgo } } }),
      prisma.project.count({ where: { organizationId, status: { in: ["Active", "In Progress"] }, createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
      
      prisma.client.count({ where: { organizationId, status: { not: "Inactive" } } }),
      prisma.client.count({ where: { organizationId, status: { not: "Inactive" }, createdAt: { gte: thirtyDaysAgo } } }),
      prisma.client.count({ where: { organizationId, status: { not: "Inactive" }, createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
      
      prisma.expense.aggregate({ _sum: { amount: true }, where: { organizationId } }),
      prisma.expense.aggregate({ _sum: { amount: true }, where: { organizationId, date: { gte: thirtyDaysAgo } } }),
      prisma.expense.aggregate({ _sum: { amount: true }, where: { organizationId, date: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
      
      prisma.questionnaire.findFirst({
        where: { organizationId, status: "Active" },
        orderBy: { createdAt: "desc" },
      })
    ]);

    const totalRevenue = totalRevAgg.reduce((acc, p) => acc + (Number(p.amount) * Number(p.invoice?.exchangeRate || 1.0)), 0);
    const revenueLast30 = revLast30Agg.reduce((acc, p) => acc + (Number(p.amount) * Number(p.invoice?.exchangeRate || 1.0)), 0);
    const revenuePrev30 = revPrev30Agg.reduce((acc, p) => acc + (Number(p.amount) * Number(p.invoice?.exchangeRate || 1.0)), 0);

    let outstanding = 0;
    let overdueCount = 0;
    let overdueCreatedLast30 = 0;
    let overdueCreatedPrev30 = 0;

    unpaidInvoices.forEach((inv) => {
      const rate = Number(inv.exchangeRate || 1.0);
      const total = Number(inv.totalAmount);
      const paid = Number(inv.paidAmount || 0);
      if (paid < total) {
        outstanding += (total - paid) * rate;
      }

      const isOverdue = inv.status === "Overdue" || (new Date(inv.dueDate) < now && inv.paidAmount < inv.totalAmount);
      if (isOverdue) {
        overdueCount++;
        if (inv.createdAt >= thirtyDaysAgo) overdueCreatedLast30++;
        else if (inv.createdAt >= sixtyDaysAgo && inv.createdAt < thirtyDaysAgo) overdueCreatedPrev30++;
      }
    });

    const activeProjects = activeProjectsCount;
    const activeProjectsLast30 = activeProjectsLast30Count;
    const activeProjectsPrev30 = activeProjectsPrev30Count;

    const totalClients = totalClientsCount;
    const clientsLast30 = clientsLast30Count;
    const clientsPrev30 = clientsPrev30Count;

    const totalExpenses = totalExpAgg._sum.amount || 0;
    const expensesLast30 = expLast30Agg._sum.amount || 0;
    const expensesPrev30 = expPrev30Agg._sum.amount || 0;

    const profit = totalRevenue - totalExpenses;
    const profitLast30 = revenueLast30 - expensesLast30;
    const profitPrev30 = revenuePrev30 - expensesPrev30;

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

  async getDashboardData(organizationId, userId) {
    if (!organizationId) {
      const error = new Error("Unauthorized: No organization found");
      error.status = 401;
      throw error;
    }

    // Optimization: Use select instead of include to prevent over-fetching full client objects
    const clientSelect = { id: true, name: true, email: true };

    const [recentProjects, recentInvoices, recentClients, recentPayments, recentQuestionnaires, organization, user, upcomingProjects, upcomingInvoices] = await Promise.all([
      prisma.project.findMany({
        where: { organizationId, status: { in: ['Active', 'In Progress', 'Planning'] } },
        include: { client: { select: clientSelect } },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.invoice.findMany({
        where: { organizationId },
        include: { client: { select: clientSelect } },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.client.findMany({
        where: { organizationId },
        select: { id: true, name: true, email: true, status: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.payment.findMany({
        where: { invoice: { organizationId } },
        include: { invoice: { select: { id: true, invoiceNumber: true, status: true, client: { select: clientSelect } } } },
        orderBy: { date: 'desc' },
        take: 5
      }),
      prisma.questionnaire.findMany({
        where: { organizationId },
        include: { client: { select: clientSelect } },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.organization.findUnique({
        where: { id: organizationId },
        select: { id: true, name: true, masterCurrency: true, dateFormat: true, status: true }
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true }
      }),
      prisma.project.findMany({
        where: { 
            organizationId, 
            status: { in: ['Active', 'In Progress'] },
            estimatedEndDate: { not: null }
        },
        include: { client: { select: clientSelect } },
        orderBy: { estimatedEndDate: 'asc' },
        take: 3
      }),
      prisma.invoice.findMany({
        where: { 
            organizationId, 
            status: { in: ['Pending', 'Overdue'] } 
        },
        include: { client: { select: clientSelect } },
        orderBy: { dueDate: 'asc' },
        take: 3
      })
    ]);

    // Also run counts concurrently with each other
    const [activeProjectCount, pendingInvoiceCount, activeQuestionnaireCount] = await Promise.all([
      prisma.project.count({ where: { organizationId, status: { in: ['Active', 'In Progress'] } } }),
      prisma.invoice.count({ where: { organizationId, status: 'Pending' } }),
      prisma.questionnaire.count({ where: { organizationId, status: 'Active' } })
    ]);

    return {
      recentProjects,
      recentInvoices,
      recentClients,
      recentPayments,
      recentQuestionnaires,
      organization,
      user,
      upcomingProjects,
      upcomingInvoices,
      counts: {
        activeProjects: activeProjectCount,
        pendingInvoices: pendingInvoiceCount,
        activeQuestionnaires: activeQuestionnaireCount
      }
    };
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

    // Parallelize all chart data fetching
    const [paymentsThisYear, expensesThisYear, allInvoices] = await Promise.all([
      prisma.payment.findMany({
        where: {
          invoice: { organizationId },
          date: { gte: startOfYear, lte: endOfYear },
        },
        select: { amount: true, date: true, invoice: { select: { exchangeRate: true } } },
      }),
      prisma.expense.findMany({
        where: {
          organizationId,
          date: { gte: startOfYear, lte: endOfYear },
        },
        select: { amount: true, date: true },
      }),
      prisma.invoice.findMany({
        where: { organizationId },
        select: { status: true, dueDate: true, totalAmount: true, paidAmount: true },
      })
    ]);

    const monthlyData = MONTHS.map((month) => ({ month, revenue: 0, expenses: 0 }));

    paymentsThisYear.forEach((p) => {
      const m = new Date(p.date).getMonth();
      const rate = Number(p.invoice?.exchangeRate || 1.0);
      monthlyData[m].revenue += Number(p.amount) * rate;
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
