import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import type { UserRole } from "@/types"

async function getSessionSafely() {
  const reqHeaders = await headers()

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await auth.api.getSession({
        headers: reqHeaders,
      })
    } catch (error) {
      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 350))
        continue
      }
      console.error("Session verification failed after retry:", error)
      return null
    }
  }

  return null
}

export async function requireRole(allowedRole: UserRole) {
  const session = await getSessionSafely()

  if (!session?.user) {
    redirect("/sign-in")
  }

  const rawRole =
    "role" in session.user && typeof session.user.role === "string"
      ? session.user.role
      : "customer"

  const activeRole: UserRole =
    rawRole === "admin" || rawRole === "owner" ? rawRole : "customer"

  if (activeRole !== allowedRole) {
    redirect("/unauthorized")
  }

  return {
    user: session.user,
    role: activeRole,
  }
}