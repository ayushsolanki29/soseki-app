import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true } },
        messages: {
          include: {
            sender: { select: { name: true, email: true } }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    console.error('Fetch ticket details error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, priority } = body;

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;

    const ticket = await prisma.supportTicket.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true } }
      }
    });

    return NextResponse.json({ ticket });
  } catch (error) {
    console.error('Update ticket error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
