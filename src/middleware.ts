import { NextRequest, NextResponse } from 'next/server';

const AUTH_PAGES = ['/login', '/register'];

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
  
  const hasToken = !!request.cookies.get('auth-token')?.value;
  
  if (AUTH_PAGES.includes(pathname) && hasToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // For protected routes, check if token exists
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (isProtectedRoute && !hasToken) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/my-scenarios/:path*',
    '/profile/:path*',
    '/scenario-editor/:path*',
    '/admin/:path*',
    '/api/scenarios/:path*',
    '/api/user/:path*',
    '/api/admin/:path*',
  ],
}; 