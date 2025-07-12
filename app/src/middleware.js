import { NextResponse } from "next/server";

/**
 * @param {import("next/server").NextRequest} request
 */
export function middleware(request) {
  const token = request.cookies.get("tokenAcceso")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = ["/feed", "/usuario", "/configuracion"].some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/feed/:path*", "/usuario/:path*", "/configuracion/:path*"],
};
