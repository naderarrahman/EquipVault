"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  SearchCheck,
  CalendarPlus,
  PackageCheck,
  ArrowRight,
  Workflow,
  CheckCircle2,
} from "lucide-react"

const STEPS = [
  {
    stepNumber: "01",
    title: "Find & Inspect Gear",
    description:
      "Search by equipment name, category, or location. Check real-time stock, technical specs, condition, and rental terms.",
    deliverable: "Live availability & verified specs",
    icon: SearchCheck,
  },
  {
    stepNumber: "02",
    title: "Book & Confirm Schedule",
    description:
      "Select your rental window and quantity, review transparent pricing, and confirm your booking with owner approval & Stripe.",
    deliverable: "Instant price breakdown & Stripe checkout",
    icon: CalendarPlus,
  },
  {
    stepNumber: "03",
    title: "Deploy & Return Smoothly",
    description:
      "Pick up or receive your verified equipment, complete your project on schedule, and publish a verified review when done.",
    deliverable: "On-schedule handover & renter review",
    icon: PackageCheck,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-24 bg-secondary/25 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5"
        >
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
              <Workflow className="size-3.5" />
              <span>HOW IT WORKS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Rent Equipment in Three Simple Steps
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              A clear, predictable booking flow from catalog discovery to
              project completion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold text-foreground transition"
            >
              <span>Full Workflow Guide</span>
            </Link>

            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition w-fit shrink-0 shadow-2xs"
            >
              <span>Get Started Free</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>

        {/* 3 Connected Step Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Desktop Horizontal Connector Track */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-14 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20"
          />

          {STEPS.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.stepNumber}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="group relative bg-card border border-border hover:border-primary/45 rounded-2xl p-6 sm:p-7 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs relative z-10 group-hover:scale-105 transition-transform">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      STEP {item.stepNumber}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-border/70 flex items-center gap-2 text-xs font-medium text-foreground">
                  <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                  <span>{item.deliverable}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}