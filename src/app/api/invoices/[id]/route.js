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
        activities: { orderBy: { date: 'desc' } }
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
        notes,
        terms,
        items
      } = body;

    // Otherwise, full update (omitted for brevity, typically we'd delete items and recreate them)
    return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
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
