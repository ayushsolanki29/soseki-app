import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-development';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function signToken(payload, expiresIn = '1h') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(type = 'user') {
  const cookieStore = await cookies();
  const cookieName = type === 'superadmin' ? 'superAccessToken' : 'accessToken';
  const token = cookieStore.get(cookieName)?.value;

  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload || !payload.userId) return null;

  if (type === 'superadmin') {
    const userExists = await prisma.superUser.findUnique({
      where: { id: payload.userId },
      select: { id: true }
    });
    if (!userExists) return null;
  } else {
    const userExists = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true }
    });
    if (!userExists) return null;
  }

  return payload;
}

export async function setCookies(accessToken, refreshToken) {
  const cookieStore = await cookies();

  // Set Access Token cookie (1 hour)
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  // Set Refresh Token cookie (7 days)
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function setSuperCookies(accessToken, refreshToken) {
  const cookieStore = await cookies();

  // Set Super Access Token cookie
  cookieStore.set('superAccessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  if (refreshToken) {
    // Set Super Refresh Token cookie
    cookieStore.set('superRefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  }
}

export async function clearCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}

export async function clearSuperCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('superAccessToken');
  cookieStore.delete('superRefreshToken');
}
