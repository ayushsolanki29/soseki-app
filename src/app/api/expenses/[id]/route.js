import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { description, amount, date, category, clientId, projectId, invoiceId, currency, exchangeRate } = body;

    const expenseAmount = parseFloat(amount);
    if (!expenseAmount || expenseAmount <= 0) {
      return NextResponse.json({ error: 'Invalid expense amount' }, { status: 400 });
    }

    const expense = await prisma.expense.update({
      where: { id, organizationId: session.organizationId },
      data: {
        description,
        amount: expenseAmount,
        date: date ? new Date(date) : new Date(),
        category: category || 'Other',
        clientId: clientId || null,
        projectId: projectId || null,
        invoiceId: invoiceId || null,
        currency: currency || null,
        exchangeRate: exchangeRate || null
      }
    });

    return NextResponse.json({ expense });
  } catch (error) {
    console.error('Update expense error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.expense.delete({
      where: { id, organizationId: session.organizationId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete expense error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
