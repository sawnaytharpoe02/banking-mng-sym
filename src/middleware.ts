import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for the login route
  if (pathname.startsWith("/auth/login")) {
    return NextResponse.next();
  }

  // Retrieve the session from cookies
  const session = req.cookies.get("session");
  console.log("hey session check", session);

  // Redirect to the login page if the session is missing
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except the public ones
    "/((?!_next/static|_next/image|favicon.ico|auth/login).*)",
  ],
};
