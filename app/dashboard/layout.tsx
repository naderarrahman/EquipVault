"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/types"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  const fallbackRole: UserRole = pathname.startsWith("/dashboard/admin")
    ? "admin"
    : pathname.startsWith("/dashboard/owner")
      ? "owner"
      : "customer"

  const activeRole: UserRole =
    (session?.user?.role as UserRole | undefined) || fallbackRole

  const user = session?.user || {
    name: "Preview User",
    email: "preview@equipvault.com",
    image: null,
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