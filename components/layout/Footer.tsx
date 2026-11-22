"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Wrench,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/types"

const FOOTER_CATEGORIES = [
  { label: "Construction Equipment", value: "Construction Equipment" },
  { label: "Photography & Cinema", value: "Photography Equipment" },
  { label: "Vehicles & Transport", value: "Vehicles & Transportation" },
  { label: "Agriculture Equipment", value: "Agriculture Equipment" },
  { label: "Industrial Electronics", value: "Electronics" },
  { label: "Event & Stage Gear", value: "Event Equipment" },
]

interface FooterLinkItem {
  label: string
  href: string
  externalArrow?: boolean
}

export default function Footer() {
  const pathname = usePathname()
  const { data: session, isPending } = authClient.useSession()

  if (pathname.startsWith("/dashboard")) {
    return null
  }

  const user = session?.user
  const userRole: UserRole = (user?.role as UserRole | undefined) || "customer"

  const getRoleWorkspaceConfig = (): {
    heading: string
    links: FooterLinkItem[]
  } => {
    if (!user) {
      return {
        heading: "Account & Access",
        links: [
          { label: "Create Free Account", href: "/sign-up", externalArrow: true },
          { label: "Sign In", href: "/sign-in", externalArrow: true },
          { label: "Rental Guide", href: "/how-it-works" },
        ],
      }
    }

    if (userRole === "owner") {
      return {
        heading: "Owner Portal",
        links: [
          { label: "Owner Dashboard", href: "/dashboard", externalArrow: true },
          {
            label: "List New Equipment",
            href: "/dashboard/owner/add-equipment",
            externalArrow: true,
          },
          { label: "Public Catalog", href: "/equipment" },
        ],
      }
    }

    if (userRole === "admin") {
      return {
        heading: "Admin Control",
        links: [
          {
            label: "Admin Dashboard",
            href: "/dashboard",
            externalArrow: true,
          },
          { label: "Public Catalog", href: "/equipment" },
          { label: "How It Works", href: "/how-it-works" },
        ],
      }
    }

    return {
      heading: "Customer Workspace",
      links: [
        {
          label: "Dashboard Overview",
          href: "/dashboard",
          externalArrow: true,
        },
        {
          label: "My Rental Bookings",
          href: "/dashboard/customer/bookings",
          externalArrow: true,
        },
        {
          label: "Saved Favorites",
          href: "/dashboard/customer/favorites",
          externalArrow: true,
        },
      ],
    }
  }

  const workspace = getRoleWorkspaceConfig()

  return (
    <footer className="border-t border-border bg-card/70 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-2xs">
                <Wrench className="size-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Equip<span className="text-primary">Vault</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              A trusted peer-to-peer and commercial equipment rental marketplace
              connecting verified gear owners with creators, contractors, and
              event professionals.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                Admin-Verified Gear
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border">
                <CreditCard className="size-3.5 text-primary" />
                Stripe Protected
              </span>
            </div>
          </div>

          {/* Categories Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Equipment Categories
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/equipment?category=${encodeURIComponent(cat.value)}`}
                    className="hover:text-primary transition"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Public Platform Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment"
                  className="hover:text-primary transition"
                >
                  All Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-primary transition"
                >
                  How It Works
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline"
                  >
                    <LayoutDashboard className="size-3.5" />
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Role-Aware Workspace Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
              {isPending ? "Workspace" : workspace.heading}
            </h3>

            {isPending ? (
              <div className="space-y-2.5">
                <div className="h-4 w-28 rounded bg-muted animate-pulse" />
                <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                <div className="h-4 w-20 rounded bg-muted animate-pulse" />
              </div>
            ) : (
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {workspace.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 hover:text-primary transition"
                    >
                      <span>{item.label}</span>
                      {item.externalArrow && (
                        <ArrowUpRight className="size-3.5 opacity-70" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} EquipVault Marketplace. All rights
            reserved.
          </p>
          <p className="font-mono">
            Built with Next.js, TypeScript, MongoDB &amp; Stripe
          </p>
        </div>
      </div>
    </footer>
  )
}