"use client"

import { useEffect } from "react"
import type { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client"

const resolveDashboardPath = (role?: string): string => {
  if (role === "admin") return "/dashboard/admin"
  if (role === "owner") return "/dashboard/owner"
  return "/dashboard/customer"
}

export default function AuthRouteGuard({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const userRole =
    session?.user &&
    "role" in session.user &&
    typeof session.user.role === "string"
      ? session.user.role
      : undefined

  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace(resolveDashboardPath(userRole))
    }
  }, [isPending, session, userRole, router])

  if (isPending || session?.user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-7 animate-spin text-primary" />
        <p className="text-sm font-medium">
          {session?.user ? "Redirecting to your dashboard..." : "Checking session..."}
        </p>
      </div>
    )
  }

  return <>{children}</>
}