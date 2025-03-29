import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromHeader } from './lib/jwt';

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/login',
  '/register',
  '/scenarios',
  '/theory',
  '/api/auth/login', 
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/auth/logout',
  '/api/auth/validate'
];

const PROTECTED_ROUTES = [
  '/my-scenarios',
  '/profile',
  '/scenario-editor',
  '/api/scenarios',
  '/api/user'
];

const ADMIN_ROUTES: string[] = [
  '/admin',
  '/api/admin'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isApiRoute = pathname.startsWith('/api/');
  
  if (PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }
  
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  let token: string | null = null;
  
  if (isApiRoute) {
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      token = getTokenFromHeader(authHeader);
    }
  }
  
  if (!token) {
    token = request.cookies.get('auth-token')?.value || null;
  }
  
  if (!token && process.env.NODE_ENV !== 'production') {
    const urlToken = request.nextUrl.searchParams.get('token');
    if (urlToken) {
      token = urlToken;
    }
  }
  
  if (!token) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    } else {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  const payload = verifyToken(token);
  
  if (!payload) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    } else {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  
  if (
    ADMIN_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`)) && 
    payload.role !== 'admin'
  ) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: 'Access denied. Admin privileges required.' },
        { status: 403 }
      );
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. robots.txt)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/|fonts/).*)',
  ],
}; 