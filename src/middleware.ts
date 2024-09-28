import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
