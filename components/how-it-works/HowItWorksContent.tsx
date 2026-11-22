"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  CalendarCheck,
  CreditCard,
  PackageCheck,
  Upload,
  ShieldCheck,
  CheckCircle2,
  BadgeDollarSign,
  ChevronDown,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Star,
  Wrench,
  Users,
} from "lucide-react"

type RoleTab = "renter" | "owner"

interface StepItem {
  step: string
  title: string
  description: string
  highlight: string
  icon: React.ElementType
}

const RENTER_STEPS: StepItem[] = [
  {
    step: "01",
    title: "Discover & Filter Verified Gear",
    description:
      "Browse approved cameras, power tools, audio systems, and heavy machinery. Filter by category, rental cycle, price range, and real-time stock availability.",
    highlight: "Real-time availability & transparent rates",
    icon: Search,
  },
  {
    step: "02",
    title: "Select Dates & Submit Booking Request",
    description:
      "Choose your start and end dates, required quantity, and delivery address. The system automatically calculates total rental duration and cost before you submit.",
    highlight: "Instant cost breakdown with zero hidden fees",
    icon: CalendarCheck,
  },
  {
    step: "03",
    title: "Owner Approval & Secure Stripe Payment",
    description:
      "Once the equipment owner reviews and approves your booking request, complete your payment securely via Stripe Checkout directly from your Customer Dashboard.",
    highlight: "256-bit SSL encrypted Stripe checkout",
    icon: CreditCard,
  },
  {
    step: "04",
    title: "Handover, Project Execution & Review",
    description:
      "Receive or pick up the inspected gear, complete your project smoothly, return it on schedule, and publish a verified rating to help future renters.",
    highlight: "Verified renter badge on every review",
    icon: PackageCheck,
  },
]

const OWNER_STEPS: StepItem[] = [
  {
    step: "01",
    title: "Create Your Listing in Minutes",
    description:
      "Sign up as an Equipment Owner, upload high-resolution photos, specify brand, model, condition, available quantity, and set your daily or weekly rental rate.",
    highlight: "Full control over pricing & rental terms",
    icon: Upload,
  },
  {
    step: "02",
    title: "Admin Quality & Authenticity Review",
    description:
      "Every new listing goes through EquipVault's admin moderation queue to verify specifications and authenticity—building immediate buyer trust once published.",
    highlight: "Verified badge boosts booking conversion",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Review & Approve Rental Requests",
    description:
      "Receive booking requests in your Owner Portal with full renter contact details, dates, and delivery notes. Approve requests that fit your schedule.",
    highlight: "Accept or decline on your own terms",
    icon: CheckCircle2,
  },
  {
    step: "04",
    title: "Confirmed Payment & Seamless Handover",
    description:
      "Track payment confirmation in real time, hand over your equipment with confidence, and grow your recurring rental income with strong customer ratings.",
    highlight: "Centralized earnings & booking tracker",
    icon: BadgeDollarSign,
  },
]

const FAQS = [
  {
    question: "When am I charged for an equipment rental?",
    answer:
      "Submitting a booking request is completely free. Once the equipment owner approves your request (or when you are ready to confirm an active booking), you can complete payment securely through Stripe from your My Bookings dashboard.",
  },
  {
    question: "How does EquipVault ensure equipment quality and safety?",
    answer:
      "Every listing submitted by an owner is reviewed by our Admin team before appearing in the public catalog. In addition, only renters with verified paid or completed bookings can leave ratings and reviews.",
  },
  {
    question: "Can I cancel a booking request if my project dates change?",
    answer:
      "Yes. Any booking that is still in 'Pending' status can be cancelled immediately with one click from your Customer Bookings workspace without any penalty.",
  },
  {
    question: "How do I list my own equipment to earn rental income?",
    answer:
      "Create an account selecting the 'Owner' role (or access the Owner Portal), open 'Add Equipment', fill in your gear specs and rental rates, and submit. Once approved by an admin, renters can book it right away.",
  },
  {
    question: "What happens if an item is currently out of stock?",
    answer:
      "Each listing displays live available quantity. If all units are currently rented out, the booking button automatically disables until stock becomes available again.",
  },
]

export default function HowItWorksContent() {
  const [activeRole, setActiveRole] = useState<RoleTab>("renter")
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const currentSteps = activeRole === "renter" ? RENTER_STEPS : OWNER_STEPS

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/10 via-background to-background py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/15 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
            <Sparkles className="size-3.5" />
            Simple, Transparent &amp; Secure Rental Workflow
          </span>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            How <span className="text-primary">EquipVault</span> Works
          </h1>

          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you need specialized gear for a deadline or want to monetize
            idle equipment sitting in your studio or workshop, EquipVault handles
            verification, scheduling, and Stripe payments in four clear steps.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition shadow-xs"
            >
              Browse Equipment Catalog
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/dashboard/owner/add-equipment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground text-sm font-semibold hover:bg-muted transition"
            >
              List Your Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Role Workflow Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Role Toggle */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Choose Your Workflow
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Switch between Renter and Owner views to see how bookings,
              approvals, and payouts work end-to-end.
            </p>

            <div className="inline-flex p-1.5 rounded-2xl bg-muted/70 border border-border">
              <button
                type="button"
                onClick={() => setActiveRole("renter")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  activeRole === "renter"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="size-4" />
                For Renters (Customers)
              </button>

              <button
                type="button"
                onClick={() => setActiveRole("owner")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  activeRole === "owner"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Wrench className="size-4" />
                For Equipment Owners
              </button>
            </div>
          </div>

          {/* 4-Step Cards Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {currentSteps.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.step}
                    className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-2xs hover:border-primary/40 transition flex flex-col justify-between gap-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                          <Icon className="size-6" />
                        </div>
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                          STEP {item.step}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border/70 flex items-center gap-2 text-xs font-semibold text-primary">
                      <CheckCircle2 className="size-4 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Built-in Trust & Protection Pillars */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/60 bg-muted/20">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Built-In Trust at Every Stage
            </h2>
            <p className="text-sm text-muted-foreground">
              Three layers of verification keep both renters and equipment
              owners protected throughout every booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-2xs">
              <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Admin Listing Moderation
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                No unverified spam listings. Every piece of equipment is
                checked and approved by platform administrators before going
                live.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-2xs">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <CreditCard className="size-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Stripe-Powered Payments
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                All rental transactions are processed through Stripe with clear
                itemized receipts and instant payment status synchronization.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-2xs">
              <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Star className="size-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Verified-Only Reviews
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Reviews can only be submitted by customers who have paid for or
                completed an actual rental booking on EquipVault.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
              <HelpCircle className="size-3.5" />
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Got Questions? We&apos;ve Got Answers
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={faq.question}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-sm sm:text-base text-foreground hover:bg-muted/40 transition cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl border border-primary/25 bg-gradient-to-r from-card via-card to-primary/10 p-8 sm:p-12 text-center space-y-5 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to Rent or List Equipment?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Join verified equipment owners and renters already saving costs and
            earning income on EquipVault.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
            >
              Explore Marketplace
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-semibold hover:bg-muted transition"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}