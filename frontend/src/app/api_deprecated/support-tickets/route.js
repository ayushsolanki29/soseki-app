import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    
    // For local dev simulation, if no session we'll use first organization
    let organizationId = session?.organizationId;
    
    if (!organizationId) {
      const firstOrg = await prisma.organization.findFirst();
      if (!firstOrg) return NextResponse.json({ error: 'No organization found' }, { status: 404 });
      organizationId = firstOrg.id;
    }

    const { searchParams } = new URL(request.url);
    const globalMode = searchParams.get('global') === 'true';

    // If global mode is requested (Super Admin), fetch all tickets
    // In a real app, verify the user has Super Admin role
    const where = globalMode ? {} : { organizationId };

    const tickets = await prisma.supportTicket.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
        organization: { select: { name: true } },
        _count: { select: { messages: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error('Fetch support tickets error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getSession();
    
    // Simulated auth fallback
    let userId = session?.userId;
    let organizationId = session?.organizationId;
    
    if (!userId || !organizationId) {
      const firstUser = await prisma.user.findFirst();
      if (!firstUser) return NextResponse.json({ error: 'No user found' }, { status: 404 });
      userId = firstUser.id;
      organizationId = firstUser.organizationId || (await prisma.organization.findFirst()).id;
    }

    const body = await request.json();
    const { title, description, priority } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        title,
        description,
        priority: priority || 'Medium',
        userId,
        organizationId
      }
    });

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (error) {
    console.error('Create support ticket error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
