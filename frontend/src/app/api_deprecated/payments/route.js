import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payments = await prisma.payment.findMany({
      where: {
        invoice: {
            organizationId: session.organizationId
        }
      },
      include: { 
          invoice: {
              include: {
                  client: true
              }
          } 
      },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Fetch payments error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
