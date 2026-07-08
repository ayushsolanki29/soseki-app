import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// GET /api/quick-items - Fetch all quick items for the organization
export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quickItems = await prisma.quickItem.findMany({
      where: {
        organizationId: session.organizationId,
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ quickItems });
  } catch (error) {
    console.error('Fetch quick items error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/quick-items - Create a new quick item
export async function POST(request) {
  try {
    const session = await getSession();
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, defaultPrice } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const quickItem = await prisma.quickItem.create({
      data: {
        name: name.trim(),
        defaultPrice: parseFloat(defaultPrice) || 0,
        organizationId: session.organizationId,
      }
    });

    return NextResponse.json({ quickItem }, { status: 201 });
  } catch (error) {
    console.error('Create quick item error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
