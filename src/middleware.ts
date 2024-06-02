import type { NextRequest } from 'next/server';

const privateRouters = ['/dashboard', '/account'];
const authRouters = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  if (token && authRouters.some((path) => pathname.startsWith(path))) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  if (!token && privateRouters.some((path) => pathname.startsWith(path))) {
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [...privateRouters, ...authRouters],
};
