import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { signToken, setCookies } from '@/lib/auth';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
    }

    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true }
    });

    if (!session) {
      // Invalid refresh token
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    if (session.expiresAt < new Date()) {
      // Expired refresh token, delete it
      await prisma.session.delete({ where: { id: session.id } });
      return NextResponse.json({ error: 'Refresh token expired' }, { status: 401 });
    }

    // Generate new short-lived access token
    const newAccessToken = await signToken({ 
      userId: session.user.id,
      hasOrg: !!session.user.organizationId
    }, '15m');
    
    // We optionally can rotate the refresh token here, but for now we just reuse the valid one
    // until it expires (7 days).
    await setCookies(newAccessToken, refreshToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
