import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; 

  const protectedRoutes = ["/cms/list", "/cms/createProduct", "/auth/updatePassword", "/cms/details"];

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/list", "/cms/createProduct", "/auth/updatePassword", "/cms/details"],
};
