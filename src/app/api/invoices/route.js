import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');

    const where = { organizationId: session.organizationId };
    if (clientId && clientId !== 'All') where.clientId = clientId;
    if (projectId && projectId !== 'All') where.projectId = projectId;
    if (status && status !== 'All') where.status = status;

    const invoices = await prisma.invoice.findMany({
      where,
      include: { client: true, project: true },
      orderBy: { issueDate: 'desc' }
    });

    return NextResponse.json({ invoices });
  } catch (error) {
    console.error('Fetch invoices error:', error);
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
    const {
      clientId,
      projectId,
      invoiceNumber,
      status,
      issueDate,
      dueDate,
      currency,
      subtotal,
      taxAmount,
      discountAmount,
      totalAmount,
      exchangeRate,
      notice,
      notes,
      terms,
      items
    } = body;

    if (!clientId || !invoiceNumber || !dueDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const invoice = await prisma.invoice.create({
      data: {
        organizationId: session.organizationId,
        clientId,
        projectId: projectId || null,
        invoiceNumber,
        status: status || 'Draft',
        issueDate: issueDate ? new Date(issueDate) : new Date(),
        dueDate: new Date(dueDate),
        currency: currency || 'USD',
        subtotal: parseFloat(subtotal) || 0,
        taxAmount: parseFloat(taxAmount) || 0,
        discountAmount: parseFloat(discountAmount) || 0,
        totalAmount: parseFloat(totalAmount) || 0,
        exchangeRate: parseFloat(exchangeRate) || 1.0,
        notice,
        notes,
        terms,
        items: {
          create: items?.map(item => ({
            description: item.description,
            quantity: parseInt(item.quantity) || 1,
            unitPrice: parseFloat(item.unitPrice) || 0,
            taxRate: parseFloat(item.taxRate) || 0,
            total: parseFloat(item.total) || 0
          })) || []
        },
        activities: {
          create: [
            { type: 'CREATED', description: 'Invoice created' }
          ]
        }
      },
      include: {
        items: true,
        activities: true
      }
    });

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error('Create invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
