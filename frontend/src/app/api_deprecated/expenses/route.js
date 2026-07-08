import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const expenses = await prisma.expense.findMany({
      where: { organizationId: session.organizationId },
      include: { client: true, project: true, invoice: true },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error('Fetch expenses error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { description, amount, date, category, clientId, projectId, invoiceId, currency, exchangeRate } = body;

    const expenseAmount = parseFloat(amount);
    if (!expenseAmount || expenseAmount <= 0) {
      return NextResponse.json({ error: 'Invalid expense amount' }, { status: 400 });
    }

    const expense = await prisma.expense.create({
      data: {
        description,
        amount: expenseAmount,
        date: date ? new Date(date) : new Date(),
        category: category || 'Other',
        organizationId: session.organizationId,
        clientId: clientId || null,
        projectId: projectId || null,
        invoiceId: invoiceId || null,
        currency: currency || null,
        exchangeRate: exchangeRate || null
      },
      include: { client: true, project: true, invoice: true }
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error('Record expense error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
