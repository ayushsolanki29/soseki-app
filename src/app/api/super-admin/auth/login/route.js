import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken, setSuperCookies } from '@/lib/auth';
import { addDays } from 'date-fns';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const user = await prisma.superUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign tokens
    const accessToken = await signToken({ userId: user.id }, '1h');
    const refreshToken = await signToken({ userId: user.id, type: 'refresh' }, '7d');

    // We don't use the Session table for SuperUser, or maybe we just don't store it for now.
    // If we wanted to, we could add a SuperSession table, but for now we just rely on JWT verification
    
    // Set cookies using the new setSuperCookies function
    await setSuperCookies(accessToken, refreshToken);

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return NextResponse.json({ user: userResponse, accessToken, refreshToken });
  } catch (error) {
    console.error('Super Admin Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
