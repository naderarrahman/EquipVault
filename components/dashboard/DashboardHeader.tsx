"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, ChevronRight } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import ThemeToggle from "@/components/shared/ThemeToggle"
import type { UserRole } from "@/types"

interface DashboardHeaderProps {
  role: UserRole
}

function getBreadcrumbLabel(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  if (!lastSegment || ["user", "owner", "admin"].includes(lastSegment)) {
    return "Overview"
  }

  return lastSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function DashboardHeader({ role }: DashboardHeaderProps) {
  const pathname = usePathname()
  const currentSection = getBreadcrumbLabel(pathname)
  const roleLabel = role === "customer" ? "Customer" : role === "owner" ? "Owner" : "Admin"

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/80 bg-card/85 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      {/* Left: Sidebar Trigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="size-9 rounded-lg border border-border/80 bg-background hover:bg-muted" />
        <Separator orientation="vertical" className="h-5" />

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground transition hidden sm:inline"
          >
            Dashboard
          </Link>
          <ChevronRight className="size-3.5 text-muted-foreground/60 hidden sm:inline" />
          <span className="text-muted-foreground capitalize hidden sm:inline">
            {roleLabel}
          </span>
          <ChevronRight className="size-3.5 text-muted-foreground/60 hidden sm:inline" />
          <span className="font-semibold text-foreground">{currentSection}</span>
        </nav>
      </div>

      {/* Right: Role Pill + Theme Switcher */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase font-semibold bg-primary/10 text-primary border border-primary/25">
          <ShieldCheck className="size-3.5" />
          {roleLabel}
        </span>
        <ThemeToggle />
      </div>
    </header>
  )
}