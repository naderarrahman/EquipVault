import React from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { auth } from "@/lib/auth"
import type { UserRole } from "@/types"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? null,
  }

  return (
    <SidebarProvider className="min-h-screen w-full">
      <AppSidebar role={activeRole} user={user} />
      <SidebarInset className="flex flex-col min-h-screen w-full bg-muted/20 dark:bg-background overflow-x-clip">
        <DashboardHeader role={activeRole} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}