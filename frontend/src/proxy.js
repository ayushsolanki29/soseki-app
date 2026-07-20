import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-development';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Paths that do not require authentication for normal users
  const publicPaths = ['/login', '/signup', '/request-access', '/status', '/api/leads', '/api/auth/login', '/api/auth/refresh', '/api/auth/check-email', '/c', '/api/portal', '/q', '/api/questionnaires/public', '/forbidden'];
  
  // Super admin paths
  const isSuperAdminPath = pathname.startsWith('/super-admin') || pathname.startsWith('/api/super-admin');
  const superAdminPublicPaths = ['/super-admin/login', '/api/super-admin/auth/login'];
  
  if (isSuperAdminPath) {
    const superToken = request.cookies.get('superAccessToken')?.value;
    const isSuperPublicPath = superAdminPublicPaths.includes(pathname);

    if (isSuperPublicPath) {
      if (superToken) {
        try {
          await jwtVerify(superToken, secretKey);
          return NextResponse.redirect(new URL('/super-admin/dashboard', request.url));
        } catch (err) {
          return NextResponse.next();
        }
      }
      return NextResponse.next();
    }

    if (!superToken) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/super-admin/login', request.url));
    }

    try {
      await jwtVerify(superToken, secretKey);
      if (pathname === '/super-admin') {
        return NextResponse.redirect(new URL('/super-admin/dashboard', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/super-admin/login', request.url));
    }
  }

  // --- Normal User Flow ---

  const token = request.cookies.get('accessToken')?.value;
  const isPublicPath = pathname === '/' || publicPaths.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    // If user has a token and tries to visit login/signup/request-access, redirect them to dashboard
    if (token && (pathname === '/login' || pathname === '/signup' || pathname === '/request-access' || pathname === '/status' || pathname === '/')) {
      try {
        const { payload } = await jwtVerify(token, secretKey);
        const hasOrg = payload.hasOrg === true;
        return NextResponse.redirect(new URL(hasOrg ? '/dashboard' : '/setup-organization', request.url));
      } catch (error) {
        // Token invalid, continue checking superToken
      }
    }
    
    // If super admin has a token and tries to visit public paths, redirect to super-admin dashboard
    const superToken = request.cookies.get('superAccessToken')?.value;
    if (superToken && (pathname === '/login' || pathname === '/signup' || pathname === '/request-access' || pathname === '/status' || pathname === '/')) {
      try {
        await jwtVerify(superToken, secretKey);
        return NextResponse.redirect(new URL('/super-admin/dashboard', request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  }

  // Paths that require authentication
  const superToken = request.cookies.get('superAccessToken')?.value;
  if (!token && !superToken) {
    // If it's an API route, return 401
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Otherwise redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    if (token) {
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
    } else if (superToken) {
      // Super admin accessing a normal route (like /api/support-tickets)
      await jwtVerify(superToken, secretKey);
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
