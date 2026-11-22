"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  PlusCircle,
  ShieldCheck,
  LayoutDashboard,
  Search,
  TrendingUp,
  Wallet,
  CheckCircle2,
  Sparkles,
  Lock,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/types"

export default function OwnerCtaSection() {
  const { data: session } = authClient.useSession()

  const user = session?.user
  const rawRole =
    user && "role" in user && typeof user.role === "string"
      ? user.role
      : undefined

  const role: UserRole | null =
    rawRole === "admin" || rawRole === "owner" || rawRole === "customer"
      ? rawRole
      : user
      ? "customer"
      : null

  const ctaConfig = (() => {
    if (role === "owner") {
      return {
        badge: "OWNER WORKSPACE ACTIVE",
        title: "Ready to List More Equipment &",
        highlight: "Grow Your Fleet Earnings?",
        description:
          "Publish new machinery, set daily, weekly, or monthly rates, and approve incoming rental requests with upfront Stripe payouts.",
        primaryLabel: "Add New Equipment",
        primaryHref: "/dashboard/owner/add-equipment",
        primaryIcon: PlusCircle,
        secondaryLabel: "Open Owner Dashboard",
        secondaryHref: "/dashboard/owner",
        helperText: null,
        consoleRole: "Verified Equipment Owner",
        consoleMetricLabel: "Settlement Policy",
        consoleMetricValue: "100% Upfront Stripe Checkout",
      }
    }

    if (role === "admin") {
      return {
        badge: "ADMIN MODERATION CONSOLE",
        title: "Review New Owner Listings &",
        highlight: "Keep the Catalog Trusted",
        description:
          "Inspect newly submitted equipment specs, verify owner credentials, and monitor active bookings across all 6 sectors.",
        primaryLabel: "Review All Equipment",
        primaryHref: "/dashboard/admin/equipment",
        primaryIcon: ShieldCheck,
        secondaryLabel: "Admin Overview",
        secondaryHref: "/dashboard/admin",
        helperText: null,
        consoleRole: "Platform Administrator",
        consoleMetricLabel: "Catalog Governance",
        consoleMetricValue: "Full Approval & RBAC Active",
      }
    }

    if (role === "customer") {
      return {
        badge: "VERIFIED RENTER ACCOUNT",
        title: "Need Heavy Machinery or Pro Gear",
        highlight: "for Your Next Project?",
        description:
          "Explore admin-vetted listings across 6 categories with transparent daily, weekly, and monthly rates—backed by zero-fee Stripe Checkout.",
        primaryLabel: "Browse All Equipment",
        primaryHref: "/equipment",
        primaryIcon: Search,
        secondaryLabel: "View My Rentals",
        secondaryHref: "/dashboard/customer/my-rentals",
        helperText:
          "Logged in as Customer. Register an Owner account anytime to publish your own fleet.",
        consoleRole: "Active Customer Account",
        consoleMetricLabel: "Renter Protection",
        consoleMetricValue: "$0.00 Platform Service Fee",
      }
    }

    // Guest (Not logged in)
    return {
      badge: "FOR EQUIPMENT OWNERS & FLEETS",
      title: "Turn Idle Machinery & Pro Gear into",
      highlight: "Predictable Rental Income",
      description:
        "Join verified fleet owners and studios earning daily, weekly, and monthly revenue with admin-vetted renters and automated Stripe payments.",
      primaryLabel: "Register as Equipment Owner",
      primaryHref: "/sign-up",
      primaryIcon: ArrowRight,
      secondaryLabel: "Sign In to Dashboard",
      secondaryHref: "/sign-in",
      helperText:
        "Select 'Equipment Owner' during registration to unlock fleet listing tools.",
      consoleRole: "Open Marketplace Onboarding",
      consoleMetricLabel: "Owner Payout Standard",
      consoleMetricValue: "Upfront Stripe Verified",
    }
  })()

  const PrimaryIcon = ctaConfig.primaryIcon

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Outer Rotating 4-Sided Border Beam Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[30px] p-[2px] overflow-hidden bg-border/60 shadow-2xl"
        >
          {/* Continuous Rotating Light Beam */}
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_255deg,var(--primary)_315deg,#f59e0b_345deg,transparent_360deg)]"
          />

          {/* Inner Banner Container */}
          <div className="relative overflow-hidden rounded-[28px] bg-card p-8 sm:p-12 lg:p-14">
            {/* Subtle Architectural Grid & Dual Ambient Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_85%_80%_at_75%_40%,#000_55%,transparent_100%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -bottom-24 size-80 rounded-full bg-amber-500/10 blur-3xl"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
              {/* Left Editorial Copy & Role-Aware CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-mono font-semibold">
                  <TrendingUp className="size-3.5" />
                  <span>{ctaConfig.badge}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-foreground leading-[1.15]">
                  {ctaConfig.title}{" "}
                  <span className="text-primary">{ctaConfig.highlight}</span>
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {ctaConfig.description}
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <Link
                    href={ctaConfig.primaryHref}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition shadow-sm"
                  >
                    <PrimaryIcon className="size-4" />
                    <span>{ctaConfig.primaryLabel}</span>
                  </Link>

                  <Link
                    href={ctaConfig.secondaryHref}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border bg-background/90 hover:bg-secondary text-sm font-semibold text-foreground transition"
                  >
                    <LayoutDashboard className="size-4 text-primary" />
                    <span>{ctaConfig.secondaryLabel}</span>
                  </Link>
                </div>

                {ctaConfig.helperText && (
                  <p className="text-xs text-muted-foreground pt-1 flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-primary shrink-0" />
                    <span>{ctaConfig.helperText}</span>
                  </p>
                )}
              </div>

              {/* Right Interactive Telemetry & Guarantee Stack */}
              <div className="lg:col-span-5 space-y-3.5">
                {/* Active Role Status Header Card */}
                <div className="rounded-2xl border border-primary/25 bg-background/90 backdrop-blur-md p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/70">
                    <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-foreground">
                      <span className="relative flex size-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                      </span>
                      {ctaConfig.consoleRole}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-primary font-semibold">
                      <Lock className="size-3" />
                      SSL Secured
                    </span>
                  </div>

                  <div className="pt-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                      {ctaConfig.consoleMetricLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-foreground">
                      {ctaConfig.consoleMetricValue}
                    </span>
                  </div>
                </div>

                {/* Highlight Feature 1 */}
                <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-xs p-4 flex items-start gap-3.5 hover:border-primary/40 transition-colors">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Wallet className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      Verified Stripe Payouts
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Customers complete upfront Stripe Checkout before
                      equipment dispatch—zero payment chasing.
                    </p>
                  </div>
                </div>

                {/* Highlight Feature 2 */}
                <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-xs p-4 flex items-start gap-3.5 hover:border-emerald-500/40 transition-colors">
                  <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      Full Booking &amp; Stock Control
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Approve requests, manage live unit counts, and set custom
                      daily, weekly, or monthly rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}