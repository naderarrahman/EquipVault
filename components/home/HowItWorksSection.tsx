"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  SearchCheck,
  CalendarPlus,
  PackageCheck,
  ArrowRight,
  Workflow,
} from "lucide-react"

const STEPS = [
  {
    stepNumber: "01",
    title: "Find & Inspect Gear",
    description:
      "Search by equipment name, category, or location. Check real-time stock, technical specs, condition, and rental terms.",
    icon: SearchCheck,
  },
  {
    stepNumber: "02",
    title: "Book & Confirm Schedule",
    description:
      "Select your rental window and quantity, review transparent pricing, and confirm your booking with owner approval.",
    icon: CalendarPlus,
  },
  {
    stepNumber: "03",
    title: "Deploy & Return Smoothly",
    description:
      "Pick up or receive your verified equipment, complete your project on schedule, and return it cleanly when done.",
    icon: PackageCheck,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/25 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
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

          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition w-fit shrink-0"
          >
            <span>Get Started Free</span>
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-2xs space-y-5 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-mono font-extrabold text-primary/25">
                    {item.stepNumber}
                  </span>
                  <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}