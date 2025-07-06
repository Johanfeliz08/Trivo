import { NextResponse } from "next/server";

/**
 * @param {import('next/server').NextRequest} request
 */

export function middleware(request) {
  const token = request.cookies.get("tokenAcceso");

  // const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
  const isProtected = request.nextUrl.pathname.startsWith("/home");

  // if (isProtected && !token) {
  //   const loginUrl = new URL("/auth/login", request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // if (isAuthRoute && token) {
  //   const homeUrl = new URL("/home/feed", request.url);
  //   return NextResponse.redirect(homeUrl);
  // }

  return NextResponse.next();
}

// A qué rutas aplicar el middleware
export const config = {
  // matcher: ["/home/:path*", "/auth/:path*"],
  matcher: ["/home/:path*"],
};
