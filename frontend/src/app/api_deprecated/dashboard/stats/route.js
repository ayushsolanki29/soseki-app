import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.organizationId;
    
    // Dates for calculations
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    const sixtyDaysAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000));
    
    const org = await prisma.organization.findUnique({ where: { id: orgId }, select: { masterCurrency: true } });
    
    // Helper to calculate delta percentage
    const calcDelta = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    // 1. Total Revenue (All time payments)
    const allPayments = await prisma.payment.findMany({
      where: { invoice: { organizationId: orgId } },
      select: { amount: true, date: true }
    });
    
    let totalRevenue = 0;
    let revenueLast30 = 0;
    let revenuePrev30 = 0;
    
    allPayments.forEach(p => {
      totalRevenue += p.amount;
      if (p.date >= thirtyDaysAgo) {
        revenueLast30 += p.amount;
      } else if (p.date >= sixtyDaysAgo && p.date < thirtyDaysAgo) {
        revenuePrev30 += p.amount;
      }
    });
    
    // 2. Outstanding Payments (All Unpaid Invoices)
    const allInvoices = await prisma.invoice.findMany({
      where: { organizationId: orgId, status: { notIn: ['Draft', 'Cancelled', 'Paid'] } },
      select: { totalAmount: true, paidAmount: true, createdAt: true, status: true, dueDate: true }
    });
    
    let outstanding = 0;
    let overdueCount = 0;
    let overdueCreatedLast30 = 0;
    let overdueCreatedPrev30 = 0;
    
    allInvoices.forEach(inv => {
      if (inv.paidAmount < inv.totalAmount) {
        outstanding += (inv.totalAmount - inv.paidAmount);
      }
      
      const isOverdue = inv.status === 'Overdue' || (new Date(inv.dueDate) < now && inv.paidAmount < inv.totalAmount);
      if (isOverdue) {
        overdueCount++;
        if (inv.createdAt >= thirtyDaysAgo) overdueCreatedLast30++;
        else if (inv.createdAt >= sixtyDaysAgo && inv.createdAt < thirtyDaysAgo) overdueCreatedPrev30++;
      }
    });
    
    // 3. Active Projects
    const projects = await prisma.project.findMany({
      where: { organizationId: orgId },
      select: { status: true, createdAt: true }
    });
    
    let activeProjects = 0;
    let activeProjectsLast30 = 0;
    let activeProjectsPrev30 = 0;
    projects.forEach(p => {
      if (p.status === 'Active' || p.status === 'In Progress') {
        activeProjects++;
      }
      if (p.createdAt >= thirtyDaysAgo) activeProjectsLast30++;
      else if (p.createdAt >= sixtyDaysAgo && p.createdAt < thirtyDaysAgo) activeProjectsPrev30++;
    });

    // 4. Total Clients
    const clients = await prisma.client.findMany({
      where: { organizationId: orgId, status: { not: 'Inactive' } },
      select: { createdAt: true }
    });
    
    let totalClients = clients.length;
    let clientsLast30 = 0;
    let clientsPrev30 = 0;
    clients.forEach(c => {
      if (c.createdAt >= thirtyDaysAgo) clientsLast30++;
      else if (c.createdAt >= sixtyDaysAgo && c.createdAt < thirtyDaysAgo) clientsPrev30++;
    });
    
    // 5. Total Expenses
    const expenses = await prisma.expense.findMany({
      where: { organizationId: orgId },
      select: { amount: true, date: true }
    });
    
    let totalExpenses = 0;
    let expensesLast30 = 0;
    let expensesPrev30 = 0;
    expenses.forEach(e => {
      totalExpenses += e.amount;
      if (e.date >= thirtyDaysAgo) expensesLast30 += e.amount;
      else if (e.date >= sixtyDaysAgo && e.date < thirtyDaysAgo) expensesPrev30 += e.amount;
    });
    
    const profit = totalRevenue - totalExpenses;
    const profitLast30 = revenueLast30 - expensesLast30;
    const profitPrev30 = revenuePrev30 - expensesPrev30;

    // Latest Active Questionnaire
    const latestQuestionnaire = await prisma.questionnaire.findFirst({
      where: { organizationId: orgId, status: 'Active' },
      orderBy: { createdAt: 'desc' }
    });
    
    const stats = [
      {
        label: "Total Revenue",
        value: totalRevenue,
        delta: calcDelta(revenueLast30, revenuePrev30),
        footnote: "vs last 30 days",
        lowerIsBetter: false,
        isCurrency: true
      },
      {
        label: "Outstanding Payments",
        value: outstanding,
        delta: null, 
        footnote: "currently unpaid",
        lowerIsBetter: true,
        isCurrency: true
      },
      {
        label: "Active Projects",
        value: activeProjects,
        delta: calcDelta(activeProjectsLast30, activeProjectsPrev30),
        footnote: "new vs last 30 days",
        lowerIsBetter: false,
        isCurrency: false
      },
      {
        label: "Total Clients",
        value: totalClients,
        delta: calcDelta(clientsLast30, clientsPrev30),
        footnote: "new vs last 30 days",
        lowerIsBetter: false,
        isCurrency: false
      },
      {
        label: "Overdue Invoices",
        value: overdueCount,
        delta: calcDelta(overdueCreatedLast30, overdueCreatedPrev30),
        footnote: "new vs last 30 days",
        lowerIsBetter: true,
        isCurrency: false
      },
      {
        label: "Payments Last 30 Days",
        value: revenueLast30,
        delta: calcDelta(revenueLast30, revenuePrev30),
        footnote: "vs previous 30 days",
        lowerIsBetter: false,
        isCurrency: true
      },
      {
        label: "Profit",
        value: profit,
        delta: calcDelta(profitLast30, profitPrev30),
        footnote: "vs last 30 days",
        lowerIsBetter: false,
        isCurrency: true
      }
    ];

    let latestFormLabel = "Latest Form";
    if (latestQuestionnaire) {
        const title = latestQuestionnaire.title;
        const shortTitle = title.length > 15 ? title.substring(0, 15) + '...' : title;
        latestFormLabel = `Latest Form: ${shortTitle}`;
    }

    stats.push({
        label: latestFormLabel,
        value: latestQuestionnaire ? latestQuestionnaire.responseCount : 0,
        delta: null,
        footnote: "responses collected",
        lowerIsBetter: false,
        isCurrency: false
    });

    return NextResponse.json({ stats, masterCurrency: org?.masterCurrency || 'USD' });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
