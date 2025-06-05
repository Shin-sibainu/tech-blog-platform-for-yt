/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(_request: NextRequest) {
  // 一時的にミドルウェアをスキップ - デバッグ用
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * - og-image (OGP image)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|og-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
