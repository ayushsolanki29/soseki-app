import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const organizations = await prisma.organization.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' }
    });
    return NextResponse.json({ organizations });
  } catch (error) {
    console.error('Fetch orgs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
