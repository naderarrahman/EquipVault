import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import type { UserRole } from "@/types"

export async function requireRole(allowedRole: UserRole) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

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