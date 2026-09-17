// Bu middleware admin ve login route'larını korur.
// Giriş yapmamış kullanıcıları admin sayfasından login sayfasına yönlendirir.
// Zaten giriş yapmış kullanıcıları login sayfasından admin sayfasına yönlendirir.
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Middleware seviyesinde kontrol edecegimiz oturum cookie adi.
const SESSION_COOKIE_NAME = 'session';
const SECRET_KEY = process.env.AUTH_SECRET;

const secret = SECRET_KEY ? new TextEncoder().encode(SECRET_KEY) : null;

async function hasValidSession(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  // Token veya gizli anahtar yoksa oturum gecersiz sayilir.
  if (!token || !secret) {
    return false;
  }

  try {
    // JWT dogrulama basariliysa kullanici giris yapmis kabul edilir.
    await jwtVerify(token, secret, {
      algorithms: ['HS256'],
    });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Korunacak admin rotalarini ve login rotasini ayiririz.
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/login';
  const isAuthenticated = await hasValidSession(request);

  // Admin'e giris denemesinde oturum yoksa login'e yonlendiririz.
  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Zaten giris yapmis kullanici login sayfasina gitmesin diye ana sayfaya yonlendiririz.
  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Sadece admin ve login rotalarinda middleware calisir.
  matcher: ['/admin/:path*', '/login'],
};
