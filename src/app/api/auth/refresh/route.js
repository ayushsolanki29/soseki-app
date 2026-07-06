import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { signToken, setCookies } from '@/lib/auth';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      const response = NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true }
    });

    if (!session) {
      const response = NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { id: session.id } });
      const response = NextResponse.json({ error: 'Refresh token expired' }, { status: 401 });
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    // Generate new short-lived access token
    const newAccessToken = await signToken({ 
      userId: session.user.id,
      hasOrg: !!session.user.organizationId,
      organizationId: session.user.organizationId || null
    }, '7d');
    
    // We optionally can rotate the refresh token here, but for now we just reuse the valid one
    // until it expires (7 days).
    await setCookies(newAccessToken, refreshToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
