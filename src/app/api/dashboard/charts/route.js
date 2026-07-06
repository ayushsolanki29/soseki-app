import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export async function GET(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const orgId = session.organizationId;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

    // 1. Revenue Overview Data (Monthly for current year)
    const paymentsThisYear = await prisma.payment.findMany({
      where: {
        invoice: { organizationId: orgId },
        date: { gte: startOfYear, lte: endOfYear }
      },
      select: { amount: true, date: true }
    });

    const expensesThisYear = await prisma.expense.findMany({
      where: {
        organizationId: orgId,
        date: { gte: startOfYear, lte: endOfYear }
      },
      select: { amount: true, date: true }
    });

    // Initialize 12 months array
    const monthlyData = MONTHS.map(month => ({ month, revenue: 0, expenses: 0 }));

    paymentsThisYear.forEach(p => {
      const m = new Date(p.date).getMonth();
      monthlyData[m].revenue += p.amount;
    });

    expensesThisYear.forEach(e => {
      const m = new Date(e.date).getMonth();
      monthlyData[m].expenses += e.amount;
    });

    // Compute simple growth percentage: This Month Revenue vs Last Month Revenue
    const currentMonthIndex = now.getMonth();
    const prevMonthIndex = currentMonthIndex === 0 ? 0 : currentMonthIndex - 1; // If Jan, compare to Jan (0%) or to Dec of last year (complex to fetch, we'll just keep it simple)
    
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
      where: { organizationId: orgId },
      select: { status: true, dueDate: true, totalAmount: true, paidAmount: true }
    });

    let counts = { paid: 0, pending: 0, overdue: 0, draft: 0 };
    let totalValid = 0;

    allInvoices.forEach(inv => {
      // Calculate dynamic overdue
      let status = inv.status;
      if (status !== 'Paid' && status !== 'Draft' && status !== 'Cancelled' && status !== 'Overdue') {
          if (new Date(inv.dueDate) < now && inv.paidAmount < inv.totalAmount) {
              status = 'Overdue';
          }
      }

      if (status === 'Paid') counts.paid++;
      else if (status === 'Overdue') counts.overdue++;
      else if (status === 'Draft') counts.draft++;
      else if (status !== 'Cancelled') counts.pending++;
    });

    totalValid = counts.paid + counts.pending + counts.overdue + counts.draft;
    
    let invoiceStatus = [];
    if (totalValid > 0) {
        invoiceStatus = [
            { status: "paid", share: Number(((counts.paid / totalValid) * 100).toFixed(1)), fill: "var(--color-paid)" },
            { status: "pending", share: Number(((counts.pending / totalValid) * 100).toFixed(1)), fill: "var(--color-pending)" },
            { status: "overdue", share: Number(((counts.overdue / totalValid) * 100).toFixed(1)), fill: "var(--color-overdue)" },
            { status: "draft", share: Number(((counts.draft / totalValid) * 100).toFixed(1)), fill: "var(--color-draft)" }
        ].filter(item => item.share > 0);
    }

    return NextResponse.json({ 
        revenueOverview: monthlyData, 
        growthPctNum,
        invoiceStatus 
    });
  } catch (error) {
    console.error('Charts API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
