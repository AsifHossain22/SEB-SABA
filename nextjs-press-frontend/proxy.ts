import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';
import { jwtUtils } from './utils/jwt';
import { cookies } from 'next/headers';

const AUTH_ROUTES = ['/login', '/register'];

const PUBLIC_ROUTES = ['/', '/news', '/login', '/register'];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  // console.log('Proxy!');
  // console.log('Proxy request: ', request.nextUrl);
  // console.log('Pathname: ', pathName);

  const cookieStore = await cookies();
  // const accessToken = cookieStore.get('accessToken')?.value;

  const accessToken = request.cookies.get('accessToken')?.value;

  const decodedToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  let userRole = null;

  if (!decodedToken?.success) {
    // TokenExpired - ClearCookie
    cookieStore.delete('accessToken');

    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (decodedToken?.success && decodedToken.data) {
    userRole = (decodedToken.data as JwtPayload).role;
  }

  // UserIsLoggedInAndTryingToAccessLoginOrRegisterPage
  if (accessToken && AUTH_ROUTES.includes(pathName)) {
    if (userRole === 'USER') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (userRole === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    } else if (userRole === 'AUTHOR') {
      return NextResponse.redirect(new URL('/author-dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    route => pathName === route || pathName.startsWith(route + '/'),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    route => pathName === route || pathName.startsWith(route + '/'),
  );

  // Authentication
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Authorization - RoleBasedAccessControl
  if (pathName.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/not-found', request.url));
  } else if (
    pathName.startsWith('/author-dashboard') &&
    userRole !== 'AUTHOR'
  ) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  } else if (pathName.startsWith('/dashboard') && userRole !== 'USER') {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
  // return NextResponse.redirect(new URL('/', request.url));
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/admin-dashboard/:path*',

    '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
  ],
};
