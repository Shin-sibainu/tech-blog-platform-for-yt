import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { Database } from "@/types/database";

export async function middleware(request: NextRequest) {
  try {
    // Check if environment variables are available
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.warn(
        "Supabase environment variables not found, skipping auth middleware"
      );
      return NextResponse.next();
    }

    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Clear old auth cookies if there are too many
    const cookies = request.cookies.getAll();
    const authCookies = cookies.filter(
      (c) =>
        c.name.startsWith("sb-") &&
        (c.name.includes("auth-token-code-verifier") ||
          c.name.includes("-auth-token."))
    );

    // If there are more than 5 auth-related cookies, clear the old ones
    if (authCookies.length > 5) {
      authCookies.forEach((cookie) => {
        response.cookies.delete(cookie.name);
      });
    }

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

    // Try to get user, but don't fail if it doesn't work
    try {
      await supabase.auth.getUser();
    } catch (authError) {
      console.warn("Auth error in middleware:", authError);
      // Continue with the request even if auth fails
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    // Return next response if middleware fails
    return NextResponse.next();
  }
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
