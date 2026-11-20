"use client"

import { motion } from "framer-motion"
import {
  ShieldCheck,
  CalendarRange,
  CreditCard,
  Truck,
  Award,
} from "lucide-react"

const FEATURES = [
  {
    title: "Admin-Verified Equipment",
    description:
      "Every machine, camera rig, and vehicle goes through admin approval and owner verification before appearing in the catalog.",
    icon: ShieldCheck,
    badge: "Quality Assured",
  },
  {
    title: "Flexible Rental Plans",
    description:
      "Rent only for the exact duration you need—daily sprints, weekly job sites, or monthly production cycles with clear rates.",
    icon: CalendarRange,
    badge: "Daily • Weekly • Monthly",
  },
  {
    title: "Transparent Stripe Checkout",
    description:
      "Upfront pricing with instant availability checks, clear unit counts, and secure Stripe payment processing without hidden fees.",
    icon: CreditCard,
    badge: "Secure Payments",
  },
  {
    title: "Reliable Local Availability",
    description:
      "Connect directly with verified local owners and regional hubs so your gear is ready without long cross-country delays.",
    icon: Truck,
    badge: "Fast Turnaround",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
            <Award className="size-3.5" />
            <span>WHY EQUIPVAULT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Built for Dependable Equipment Rentals
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Whether you run a construction site, film commercial shoots, or
            manage seasonal farm operations, EquipVault keeps your workflow
            moving.
          </p>
        </motion.div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.07,
                  ease: "easeOut",
                }}
                className="bg-card border border-border hover:border-primary/45 rounded-2xl p-6 shadow-2xs transition-all duration-300 flex flex-col justify-between gap-5"
              >
                <div className="space-y-4">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                    <Icon className="size-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/70">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                    {feature.badge}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}