"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/types"

const roleHomeRoute: Record<UserRole, string> = {
  customer: "/dashboard/user",
  owner: "/dashboard/owner",
  admin: "/dashboard/admin",
}

export default function DashboardRootPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (isPending) return

    if (!session?.user) {
      router.replace("/sign-in?callbackUrl=/dashboard")
      return
    }

    const role =
      ((session.user as Record<string, unknown>)?.role as UserRole | undefined) || "customer"
    router.replace(roleHomeRoute[role] || "/dashboard/user")
  }, [session, isPending, router])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <p className="text-sm">Redirecting to your dashboard...</p>
    </div>
  )
}