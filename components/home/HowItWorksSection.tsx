"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  SearchCheck,
  CalendarPlus,
  PackageCheck,
  ArrowRight,
  Workflow,
  CheckCircle2,
  PlusCircle,
  BadgeCheck,
  Wallet,
  ShieldCheck,
  Star,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

type WorkflowRole = "renter" | "owner"

interface WorkflowStep {
  stepNumber: string
  title: string
  description: string
  deliverable: string
  icon: LucideIcon
  previewTitle: string
  previewSubtitle: string
  previewStatus: string
  previewMetricLabel: string
  previewMetricValue: string
  ctaLabel: string
  ctaHref: string
}

const WORKFLOW_DATA: Record<WorkflowRole, WorkflowStep[]> = {
  renter: [
    {
      stepNumber: "01",
      title: "Find & Inspect Gear",
      description:
        "Filter by category, rental cycle, or location. Check live unit availability, technical specs, and verified renter ratings.",
      deliverable: "Live availability & verified specs",
      icon: SearchCheck,
      previewTitle: "Komatsu PC200 Hydraulic Excavator",
      previewSubtitle: "Tejgaon Hub • Admin Inspected • 2 Units Ready",
      previewStatus: "In Stock",
      previewMetricLabel: "Verified Rate",
      previewMetricValue: "$280 / day",
      ctaLabel: "Explore Live Catalog",
      ctaHref: "/equipment",
    },
    {
      stepNumber: "02",
      title: "Book & Pay via Stripe",
      description:
        "Pick your start and end dates, choose required units, and complete transparent Stripe Checkout with zero hidden fees.",
      deliverable: "Instant price breakdown & Stripe receipt",
      icon: CalendarPlus,
      previewTitle: "Booking #EV-2094 • 3 Days Selected",
      previewSubtitle: "Owner Approved • $0.00 Platform Service Fee",
      previewStatus: "Stripe Paid",
      previewMetricLabel: "Total Escrow",
      previewMetricValue: "$840.00",
      ctaLabel: "Browse Bookable Gear",
      ctaHref: "/equipment",
    },
    {
      stepNumber: "03",
      title: "Deploy & Review Smoothly",
      description:
        "Receive your equipment on schedule, finish your job or production, and publish a verified review once completed.",
      deliverable: "On-schedule handover & verified review",
      icon: PackageCheck,
      previewTitle: "Rental Completed • Handover Confirmed",
      previewSubtitle: "Verified Renter Feedback Published to Listing",
      previewStatus: "5.0 ★ Rated",
      previewMetricLabel: "Booking Status",
      previewMetricValue: "Completed",
      ctaLabel: "Read Full Guide",
      ctaHref: "/how-it-works",
    },
  ],
  owner: [
    {
      stepNumber: "01",
      title: "List Your Equipment",
      description:
        "Submit equipment specs, high-resolution photos, stock count, and daily, weekly, or monthly rates from your Owner dashboard.",
      deliverable: "Quick listing & admin quality review",
      icon: PlusCircle,
      previewTitle: "Sony FX6 Full-Frame Cinema Camera",
      previewSubtitle: "Submitted by Verified Owner • Specs & Terms Checked",
      previewStatus: "Approved",
      previewMetricLabel: "Listing Rate",
      previewMetricValue: "$115 / day",
      ctaLabel: "Register as Owner",
      ctaHref: "/sign-up",
    },
    {
      stepNumber: "02",
      title: "Approve Rental Requests",
      description:
        "Review incoming booking dates and quantities, approve qualified renters, and let EquipVault lock inventory automatically.",
      deliverable: "Real-time stock lock & booking alerts",
      icon: BadgeCheck,
      previewTitle: "Incoming Request • 2 Cinema Rigs",
      previewSubtitle: "4-Day Commercial Shoot • Inventory Auto-Reserved",
      previewStatus: "Confirmed",
      previewMetricLabel: "Booking Value",
      previewMetricValue: "$920.00",
      ctaLabel: "See Owner Workflow",
      ctaHref: "/how-it-works",
    },
    {
      stepNumber: "03",
      title: "Earn & Track Payouts",
      description:
        "Hand over gear confidently after Stripe payment verification and monitor your monthly revenue from one clean dashboard.",
      deliverable: "Verified Stripe payments & revenue stats",
      icon: Wallet,
      previewTitle: "Owner Fleet Earnings Overview",
      previewSubtitle: "100% Upfront Stripe Settlement Before Dispatch",
      previewStatus: "Payout Ready",
      previewMetricLabel: "Settlement",
      previewMetricValue: "100% Secured",
      ctaLabel: "Create Owner Account",
      ctaHref: "/sign-up",
    },
  ],
}

export default function HowItWorksSection() {
  const [activeRole, setActiveRole] = useState<WorkflowRole>("renter")
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = WORKFLOW_DATA[activeRole]
  const currentStep = steps[activeStep] ?? steps[0]

  const handleRoleChange = (role: WorkflowRole) => {
    setActiveRole(role)
    setActiveStep(0)
  }

  return (
    <section className="relative py-20 md:py-28 bg-secondary/25 border-b border-border overflow-hidden">
      {/* Subtle Architectural Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_80%_75%_at_50%_50%,#000_60%,transparent_100%)]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header + Interactive Role Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
              <Workflow className="size-3.5" />
              <span>HOW IT WORKS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              A Predictable Flow from{" "}
              <span className="text-primary">Discovery to Handover</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Switch between Renter and Owner perspectives and click any stage
              below to inspect how EquipVault handles bookings and payments.
            </p>
          </div>

          {/* Animated Role Switcher Pill */}
          <div className="inline-flex items-center p-1.5 rounded-2xl border border-border bg-card shadow-2xs self-start lg:self-auto">
            {(
              [
                { id: "renter", label: "Renting Equipment" },
                { id: "owner", label: "Listing Your Fleet" },
              ] as const
            ).map((tab) => {
              const isSelected = activeRole === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleRoleChange(tab.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="howItWorksRolePill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-xl bg-primary shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Interactive 3-Node Connected Pipeline */}
        <div className="relative">
          {/* Desktop Animated Connector Track */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[3.35rem] left-[16%] right-[16%] h-[2px] bg-border overflow-hidden rounded-full"
          >
            <motion.div
              animate={{
                width:
                  activeStep === 0 ? "0%" : activeStep === 1 ? "50%" : "100%",
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-primary via-amber-500 to-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon
              const isActive = index === activeStep
              const isCompleted = index < activeStep

              return (
                <motion.button
                  key={`${activeRole}-${item.stepNumber}`}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -4 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative text-left rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between gap-6 overflow-hidden cursor-pointer ${
                    isActive
                      ? "bg-card border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/25"
                      : "bg-card/85 hover:bg-card border-border hover:border-primary/40 shadow-2xs"
                  }`}
                >
                  {/* Top Active Beam */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepTopLine"
                      className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-primary via-amber-500 to-primary"
                    />
                  )}

                  {/* Oversized Watermark Step Number */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-3 right-4 text-6xl font-mono font-black select-none transition-colors ${
                      isActive
                        ? "text-primary/[0.08]"
                        : "text-foreground/[0.03]"
                    }`}
                  >
                    {item.stepNumber}
                  </span>

                  <div className="relative space-y-5">
                    <div className="flex items-center justify-between">
                      <div
                        className={`size-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative z-10 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md scale-105"
                            : isCompleted
                            ? "bg-primary/15 text-primary border border-primary/30"
                            : "bg-muted text-muted-foreground border border-border group-hover:text-primary group-hover:border-primary/30"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>

                      <span
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-full border transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary border-primary/30"
                            : "bg-muted/70 text-muted-foreground border-border"
                        }`}
                      >
                        STEP {item.stepNumber}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3
                        className={`text-lg font-bold transition-colors ${
                          isActive
                            ? "text-primary"
                            : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative pt-3.5 border-t border-border/70 flex items-center justify-between gap-2 text-xs font-medium text-foreground">
                    <span className="inline-flex items-center gap-2 min-w-0">
                      <CheckCircle2
                        className={`size-3.5 shrink-0 ${
                          isActive ? "text-primary" : "text-emerald-500"
                        }`}
                      />
                      <span className="truncate">{item.deliverable}</span>
                    </span>

                    <span className="text-[11px] font-mono text-primary shrink-0">
                      {isActive ? "Viewing" : "Inspect"}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Connected Live Stage Simulator Bar */}
        <div className="relative rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-20 size-56 rounded-full bg-primary/10 blur-3xl"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeRole}-${activeStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              {/* Left: Live Stage Details */}
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <div className="size-11 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="size-5" />
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
                      Stage {currentStep.stepNumber} Live Preview
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-semibold">
                      <ShieldCheck className="size-3" />
                      {currentStep.previewStatus}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-foreground truncate">
                    {currentStep.previewTitle}
                  </h4>

                  <p className="text-xs text-muted-foreground truncate">
                    {currentStep.previewSubtitle}
                  </p>
                </div>
              </div>

              {/* Right: Metric Pill + Direct Action */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-border/70 shrink-0">
                <div className="px-3.5 py-2 rounded-xl bg-muted/60 border border-border/70">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {currentStep.previewMetricLabel}
                  </p>
                  <p className="text-sm sm:text-base font-mono font-extrabold text-foreground flex items-center gap-1">
                    {currentStep.previewMetricValue.includes("★") && (
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    )}
                    <span>{currentStep.previewMetricValue}</span>
                  </p>
                </div>

                <Link
                  href={currentStep.ctaHref}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition shadow-2xs"
                >
                  <span>{currentStep.ctaLabel}</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}