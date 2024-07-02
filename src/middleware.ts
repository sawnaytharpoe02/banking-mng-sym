import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Retrieve the session from cookies
  const session = req.cookies.get("session");

  // If the user is trying to access the login page and already has a session, redirect them to the home page
  if (pathname.startsWith("/auth/login") && session) {
    const homeUrl = req.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  // If the user is trying to access a protected route without a session, redirect them to the login page
  if (!session && !pathname.startsWith("/auth/login")) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except the public ones
    "/((?!_next/static|_next/image|favicon.ico|auth/login).*)",
    "/auth/login",
  ],
};
