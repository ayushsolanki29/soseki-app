import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const session = await getSession();
    
    // Simulated auth fallback - if no user session, assume super admin and use a dedicated support user
    let userId = session?.userId;
    
    if (!userId) {
      let supportUser = await prisma.user.findUnique({
        where: { email: 'admin@soseki.com' }
      });
      
      if (!supportUser) {
        supportUser = await prisma.user.create({
          data: {
            email: 'admin@soseki.com',
            name: 'Soseki Support',
            passwordHash: 'placeholder', // Not used for login
          }
        });
      }
      userId = supportUser.id;
    }

    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    // Verify ticket exists
    const ticket = await prisma.supportTicket.findUnique({
      where: { id }
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    const message = await prisma.supportTicketMessage.create({
      data: {
        ticketId: id,
        senderId: userId,
        content
      },
      include: {
        sender: { select: { name: true, email: true } }
      }
    });

    // Optionally update ticket's updatedAt timestamp
    await prisma.supportTicket.update({
      where: { id },
      data: { updatedAt: new Date() }
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error('Add message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
