import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function DashboardRootPage() {
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

  const activeRole =
    rawRole === "admin" || rawRole === "owner" ? rawRole : "customer"

  if (activeRole === "admin") {
    redirect("/dashboard/admin")
  } else if (activeRole === "owner") {
    redirect("/dashboard/owner")
  } else {
    redirect("/dashboard/customer")
  }
}