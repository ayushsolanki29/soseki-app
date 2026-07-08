import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { id, organizationId: session.organizationId },
      include: {
        client: true,
        project: true,
        items: true,
        payments: { orderBy: { date: 'desc' } },
        activities: { orderBy: { date: 'desc' } },
        expenses: { orderBy: { date: 'desc' } }
      }
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error('Fetch invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    // Check if it's just a status update
    if (Object.keys(body).length === 1 && body.status) {
        const invoice = await prisma.invoice.update({
            where: { id, organizationId: session.organizationId },
            data: { 
                status: body.status,
                activities: {
                    create: [{ type: 'UPDATED', description: `Status changed to ${body.status}` }]
                }
            }
        });
        return NextResponse.json({ invoice });
    }

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

    const invoice = await prisma.invoice.update({
      where: { id, organizationId: session.organizationId },
      data: {
        clientId,
        projectId: projectId || null,
        invoiceNumber,
        status: status || 'Draft',
        issueDate: issueDate ? new Date(issueDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
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
          deleteMany: {},
          create: items?.map(item => ({
            description: item.description,
            quantity: parseInt(item.quantity) || 1,
            unitPrice: parseFloat(item.unitPrice) || 0,
            taxRate: parseFloat(item.taxRate) || 0,
            total: parseFloat(item.total) || 0
          })) || []
        },
        activities: {
          create: [{ type: 'UPDATED', description: 'Invoice updated' }]
        }
      },
      include: {
        items: true,
        client: true,
        project: true
      }
    });

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error('Update invoice error:', error);
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
    await prisma.invoice.delete({
      where: { id, organizationId: session.organizationId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete invoice error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
