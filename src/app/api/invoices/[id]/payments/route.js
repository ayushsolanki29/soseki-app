import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { amount, method, reference, date } = body;

    const paymentAmount = parseFloat(amount);
    if (!paymentAmount || paymentAmount <= 0) {
      return NextResponse.json({ error: 'Invalid payment amount' }, { status: 400 });
    }

    // Fetch the invoice first to calculate new status
    const invoice = await prisma.invoice.findUnique({
        where: { id, organizationId: session.organizationId }
    });

    if (!invoice) {
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const newPaidAmount = invoice.paidAmount + paymentAmount;
    let newStatus = invoice.status;
    
    // Round to avoid floating point precision issues
    const remaining = Math.round((invoice.totalAmount - newPaidAmount) * 100) / 100;
    
    if (remaining <= 0) {
        newStatus = 'Paid';
    } else if (newPaidAmount > 0) {
        newStatus = 'Partially Paid';
    }

    // Perform transaction
    const result = await prisma.$transaction([
        prisma.payment.create({
            data: {
                invoiceId: id,
                amount: paymentAmount,
                method: method || 'Bank Transfer',
                reference: reference || null,
                date: date ? new Date(date) : new Date()
            }
        }),
        prisma.invoice.update({
            where: { id },
            data: {
                paidAmount: newPaidAmount,
                status: newStatus,
                activities: {
                    create: [{
                        type: 'PAYMENT_RECORDED',
                        description: `Payment of $${paymentAmount} recorded (${method})`
                    }]
                }
            }
        })
    ]);

    return NextResponse.json({ payment: result[0], invoice: result[1] }, { status: 201 });
  } catch (error) {
    console.error('Record payment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
