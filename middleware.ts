import { NextRequest, NextResponse } from "next/server"

type UserRole = "customer" | "owner" | "admin"

const getRoleHomePath = (role: UserRole): string => {
  if (role === "admin") return "/dashboard/admin"
  if (role === "owner") return "/dashboard/owner"
  return "/dashboard/customer"
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  try {
    // Verify Better Auth session before any layout, page, or backend API runs
    const sessionRes = await fetch(
      `${request.nextUrl.origin}/api/auth/get-session`,
      {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        cache: "no-store",
      }
    )

    if (!sessionRes.ok) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    const sessionData = await sessionRes.json()
    const user = sessionData?.user

    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    const rawRole = typeof user.role === "string" ? user.role : "customer"
    const role: UserRole =
      rawRole === "admin" || rawRole === "owner" ? rawRole : "customer"

    // Redirect /dashboard directly to the user's role dashboard
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(getRoleHomePath(role), request.url))
    }

    // Enforce strict RBAC before rendering target page
    const isUnauthorized =
      (pathname.startsWith("/dashboard/admin") && role !== "admin") ||
      (pathname.startsWith("/dashboard/owner") && role !== "owner") ||
      (pathname.startsWith("/dashboard/customer") && role !== "customer")

    if (isUnauthorized) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}