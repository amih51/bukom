import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { currentUser } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
