"use client"

import React, { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/types"

const resolveDashboardPath = (role: UserRole): string => {
  if (role === "admin") return "/dashboard/admin"
  if (role === "owner") return "/dashboard/owner"
  return "/dashboard/customer"
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const rawRole =
    session?.user &&
    "role" in session.user &&
    typeof session.user.role === "string"
      ? session.user.role
      : "customer"

  const activeRole: UserRole =
    rawRole === "admin" || rawRole === "owner" ? rawRole : "customer"

  const isRootDashboard = pathname === "/dashboard"
  const isWrongRoleRoute =
    (pathname.startsWith("/dashboard/admin") && activeRole !== "admin") ||
    (pathname.startsWith("/dashboard/owner") && activeRole !== "owner") ||
    (pathname.startsWith("/dashboard/customer") && activeRole !== "customer")

  useEffect(() => {
    if (isPending) return

    if (!session?.user) {
      router.replace("/sign-in")
      return
    }

    if (isRootDashboard) {
      router.replace(resolveDashboardPath(activeRole))
      return
    }

    if (isWrongRoleRoute) {
      router.replace("/unauthorized")
    }
  }, [
    isPending,
    session,
    isRootDashboard,
    isWrongRoleRoute,
    activeRole,
    router,
  ])

  if (isPending || !session?.user || isRootDashboard || isWrongRoleRoute) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-background text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Verifying workspace access...</p>
      </div>
    )
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? null,
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-muted/40 dark:bg-background">
      <div className="w-full max-w-[1536px] min-h-screen border-x border-border/70 bg-background shadow-md">
        <SidebarProvider className="min-h-screen w-full">
          <AppSidebar role={activeRole} user={user} />
          <SidebarInset className="flex flex-col min-h-screen bg-muted/20 dark:bg-background overflow-hidden">
            <DashboardHeader role={activeRole} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}