"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  CalendarRange,
  CreditCard,
  Truck,
  Award,
  CheckCircle2,
  ArrowRight,
  Lock,
  MapPin,
  Sparkles,
  FileCheck2,
} from "lucide-react"

type BillingCyclePreview = "Daily" | "Weekly" | "Monthly"

const CYCLE_SAVINGS: Record<
  BillingCyclePreview,
  { tag: string; note: string }
> = {
  Daily: {
    tag: "1x Base Rate",
    note: "Ideal for 1–4 day urgent jobs & shoots",
  },
  Weekly: {
    tag: "Save ~15%",
    note: "Best for week-long construction & events",
  },
  Monthly: {
    tag: "Save ~30%",
    note: "Lowest per-day cost for long projects",
  },
}

const BENCHMARKS = [
  { label: "Listing Inspection", value: "100% Admin Vetted" },
  { label: "Payment Protection", value: "Stripe Escrow Verified" },
  { label: "Brokerage Markup", value: "$0.00 Platform Fee" },
]

export default function WhyChooseUsSection() {
  const [selectedCycle, setSelectedCycle] =
    useState<BillingCyclePreview>("Weekly")

  return (
    <section className="relative py-20 md:py-28 bg-background border-b border-border overflow-hidden">
      {/* Subtle Architectural Grid & Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_70%_at_30%_50%,#000_55%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 size-[420px] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Sticky Editorial Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-24 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
              <Award className="size-3.5" />
              <span>WHY EQUIPVAULT</span>
            </div>

            <div className="space-y-3.5">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Built for Dependable{" "}
                <span className="text-primary">Equipment Rentals</span>
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Whether you run a construction site, film commercial shoots, or
                manage seasonal farm operations, EquipVault eliminates risky
                rentals and keeps your workflow moving.
              </p>
            </div>

            {/* Operational Guarantee Card with Top Highlight Hairline */}
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 space-y-3.5 shadow-sm">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="size-3.5" />
                  <span>The EquipVault Standard</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 font-semibold">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="divide-y divide-border/70">
                {BENCHMARKS.map((item) => (
                  <div
                    key={item.label}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono font-semibold text-foreground">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition shadow-xs"
              >
                <span>Explore How It Works</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:bg-secondary text-sm font-semibold text-foreground transition"
              >
                <span>Browse Catalog</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Asymmetric 2x2 Staggered Bento Grid (Fixed Hover Offset) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Card 01: Admin-Verified Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="group relative overflow-hidden bg-card border border-border hover:border-emerald-500/45 rounded-2xl p-6 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-radial from-emerald-500/15 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 right-4 text-4xl font-mono font-black text-foreground/[0.04] select-none"
                >
                  01
                </span>

                <div>
                  <div className="size-12 rounded-2xl border bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                    <ShieldCheck className="size-6" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Admin-Verified Equipment
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                    Every machine, camera rig, and vehicle goes through admin
                    approval and owner verification before appearing in the
                    catalog.
                  </p>

                  {/* 2-Step Verification Pipeline Preview */}
                  <div className="mt-4 rounded-xl bg-muted/60 border border-border/70 p-2.5 space-y-2 text-[11px] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                        <FileCheck2 className="size-3.5 text-emerald-500 shrink-0" />
                        <span>1. Owner Identity</span>
                      </span>
                      <span className="text-emerald-500 font-semibold">
                        VERIFIED
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-border/60">
                      <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                        <span>2. Gear Inspection</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                        APPROVED
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/70 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                    Quality Assured
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 02: Interactive Flexible Rental Plans (Staggered via sm:mt-8) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="sm:mt-8"
            >
              <div className="group relative overflow-hidden bg-card border border-border hover:border-blue-500/45 rounded-2xl p-6 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-radial from-blue-500/15 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 right-4 text-4xl font-mono font-black text-foreground/[0.04] select-none"
                >
                  02
                </span>

                <div>
                  <div className="size-12 rounded-2xl border bg-blue-500/10 text-blue-500 border-blue-500/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                    <CalendarRange className="size-6" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Flexible Rental Plans
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                    Rent only for the exact duration you need—daily sprints,
                    weekly job sites, or monthly production cycles with clear
                    rates.
                  </p>

                  {/* Interactive Billing Cycle Toggle Preview */}
                  <div className="mt-4 rounded-xl bg-muted/60 border border-border/70 p-2 space-y-2">
                    <div className="grid grid-cols-3 gap-1 text-[11px] font-mono">
                      {(["Daily", "Weekly", "Monthly"] as const).map(
                        (cycle) => {
                          const active = selectedCycle === cycle
                          return (
                            <button
                              key={cycle}
                              type="button"
                              onClick={() => setSelectedCycle(cycle)}
                              className={`py-1 rounded-lg transition cursor-pointer ${
                                active
                                  ? "bg-background text-blue-600 dark:text-blue-400 font-bold shadow-2xs border border-border/70"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {cycle}
                            </button>
                          )
                        }
                      )}
                    </div>

                    <div className="flex items-center justify-between px-1.5 pt-1 text-[11px] font-mono">
                      <span className="text-muted-foreground truncate">
                        {CYCLE_SAVINGS[selectedCycle].note}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0 ml-2">
                        {CYCLE_SAVINGS[selectedCycle].tag}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/70 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-blue-500 shrink-0" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                    Daily • Weekly • Monthly
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 03: Transparent Stripe Checkout */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="group relative overflow-hidden bg-card border border-border hover:border-primary/45 rounded-2xl p-6 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-radial from-primary/15 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 right-4 text-4xl font-mono font-black text-foreground/[0.04] select-none"
                >
                  03
                </span>

                <div>
                  <div className="size-12 rounded-2xl border bg-primary/10 text-primary border-primary/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                    <CreditCard className="size-6" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    Transparent Stripe Checkout
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                    Upfront pricing with instant availability checks, clear unit
                    counts, and secure Stripe payment processing without hidden
                    fees.
                  </p>

                  {/* Mini Transparent Invoice Breakdown */}
                  <div className="mt-4 rounded-xl bg-muted/60 border border-border/70 p-2.5 space-y-1.5 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Platform Service Fee</span>
                      <span className="text-foreground font-semibold">
                        $0.00
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-border/60">
                      <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                        <Lock className="size-3 text-primary shrink-0" />
                        <span>Stripe SSL Checkout</span>
                      </span>
                      <span className="text-primary font-bold">100% Direct</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/70 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                    Secure Payments
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 04: Reliable Local Availability (Staggered via sm:mt-8) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="sm:mt-8"
            >
              <div className="group relative overflow-hidden bg-card border border-border hover:border-amber-500/45 rounded-2xl p-6 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-radial from-amber-500/15 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 right-4 text-4xl font-mono font-black text-foreground/[0.04] select-none"
                >
                  04
                </span>

                <div>
                  <div className="size-12 rounded-2xl border bg-amber-500/10 text-amber-500 border-amber-500/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                    <Truck className="size-6" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Reliable Local Availability
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                    Connect directly with verified local owners and regional
                    hubs so your gear is ready without long cross-country
                    delays.
                  </p>

                  {/* Regional Hub Telemetry Preview */}
                  <div className="mt-4 rounded-xl bg-muted/60 border border-border/70 p-2.5 space-y-2 text-[11px] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                        <MapPin className="size-3.5 text-amber-500 shrink-0" />
                        <span>Dhaka • Savar • Sylhet</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Live
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1.5 border-t border-border/60 text-muted-foreground">
                      <span>Dispatch Window</span>
                      <span className="text-foreground font-semibold">
                        Same-Day Pickup
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/70 flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                    Fast Turnaround
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}