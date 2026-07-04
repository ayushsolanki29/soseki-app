import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession, signToken, setCookies } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Workspace name is required' }, { status: 400 });
    }

    // Check if user exists and already has an organization
    const user = await prisma.user.findUnique({
      where: { id: session.userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.organizationId) {
      return NextResponse.json({ error: 'You already have an organization setup' }, { status: 400 });
    }

    // Create organization and link it
    const organization = await prisma.organization.create({
      data: {
        name: name.trim(),
        users: {
          connect: { id: user.id }
        }
      }
    });

    // Reissue tokens so that hasOrg is now true
    // Get existing refresh token
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const newAccessToken = await signToken({ 
      userId: user.id, 
      hasOrg: true 
    }, '15m');

    // We keep the existing refresh token valid, just overwrite the access token cookie
    if (refreshToken) {
      await setCookies(newAccessToken, refreshToken);
    }

    return NextResponse.json({ success: true, organization });
  } catch (error) {
    console.error('Setup organization error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
