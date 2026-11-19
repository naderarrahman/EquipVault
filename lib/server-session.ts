import { cookies } from "next/headers"
import type { UserRole } from "@/types"

export interface ServerSessionUser {
  id: string
  name: string
  email: string
  role?: UserRole
  image?: string | null
}

export interface ServerSessionData {
  user: ServerSessionUser
  session: {
    id: string
    userId: string
    expiresAt: string
  }
}

export async function getServerSession(): Promise<ServerSessionData | null> {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    if (!cookieHeader) {
      return null
    }

    const baseUrl = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    ).replace(/\/$/, "")

    const res = await fetch(`${baseUrl}/api/auth/get-session`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    const data: ServerSessionData | null = await res.json()
    if (!data?.user?.id) {
      return null
    }

    return data
  } catch (error) {
    console.error("Server Session Fetch Error:", error)
    return null
  }
}

export function getRoleDashboardPath(role?: string): string {
  switch (role) {
    case "admin":
      return "/dashboard/admin"
    case "owner":
      return "/dashboard/owner"
    case "customer":
    default:
      return "/dashboard/customer"
  }
}