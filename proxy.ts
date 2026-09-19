import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = ["/", "/booking", "/privacy-policy", "/privacypolicy", "/terms-of-service", "/termsofservice"];

  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};

