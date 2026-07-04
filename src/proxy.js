import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-development';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Paths that do not require authentication
  const publicPaths = ['/login', '/signup', '/api/auth/login', '/api/auth/refresh', '/api/auth/check-email'];

  const token = request.cookies.get('accessToken')?.value;

  // Check if current path is public
  const isPublicPath = pathname === '/' || publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    // If user has a token and tries to visit login/signup, redirect them to dashboard
    if (token && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
      try {
        const { payload } = await jwtVerify(token, secretKey);
        const hasOrg = payload.hasOrg === true;
        return NextResponse.redirect(new URL(hasOrg ? '/dashboard' : '/setup-organization', request.url));
      } catch (error) {
        // Token invalid, let them see the public page
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // Paths that require authentication

  if (!token) {
    // If it's an API route, return 401
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Otherwise redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify token using jose (edge compatible)
    const { payload } = await jwtVerify(token, secretKey);
    
    // Check organization routing rules
    const hasOrg = payload.hasOrg === true;
    
    if (pathname.startsWith('/dashboard') && !hasOrg) {
      return NextResponse.redirect(new URL('/setup-organization', request.url));
    }

    if (pathname === '/setup-organization' && hasOrg) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
