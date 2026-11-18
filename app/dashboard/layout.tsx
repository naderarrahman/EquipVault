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

  const inferredRole: UserRole = pathname.startsWith("/dashboard/admin")
    ? "admin"
    : pathname.startsWith("/dashboard/owner")
      ? "owner"
      : "customer"

  const user = session?.user || {
    name: "Preview User",
    email: "preview@equipvault.com",
    image: null,
  }

  return (
    <SidebarProvider>
      <AppSidebar role={inferredRole} user={user} />
      <SidebarInset className="flex flex-col min-h-screen bg-background">
        <DashboardHeader role={inferredRole} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}