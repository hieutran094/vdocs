import { NextResponse, type NextRequest } from 'next/server';
import { checkAuth } from '@/libs/auth';

const privateRouters = ['/dashboard', '/account'];
const authRouters = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  const isPrivatePath = privateRouters.some((path) =>
    pathname.startsWith(path)
  );
  if (token && isPrivatePath) {
    try {
      await checkAuth();
    } catch (_) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }
  if (token && authRouters.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [...privateRouters, ...authRouters],
};
