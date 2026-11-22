"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BadgeDollarSign,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react"

export default function OwnerCtaSection() {
  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-card via-card to-primary/10 p-8 sm:p-12 lg:p-14 shadow-md"
        >
          {/* Subtle Architectural Grid & Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:28px_28px]"
          />
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/25 text-xs font-mono font-semibold">
                <Sparkles className="size-3.5" />
                <span>MONETIZE IDLE EQUIPMENT</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                Have Machinery, Cinema Gear, or Commercial Tools Sitting Idle?
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                Turn your unused equipment into predictable recurring income.
                List your gear in minutes, control your own rental pricing and
                availability, and approve every booking request before handover.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/dashboard/owner/add-equipment"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition shadow-xs"
                >
                  <span>Start Listing Equipment</span>
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-background/85 text-foreground text-sm font-semibold hover:bg-muted transition"
                >
                  <span>Learn How It Works</span>
                </Link>
              </div>
            </div>

            {/* Right Feature Highlights */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="p-4 rounded-2xl bg-background/85 backdrop-blur-xs border border-border hover:border-primary/40 transition flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <BadgeDollarSign className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Flexible Daily, Weekly &amp; Monthly Rates
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Set custom rental rates, stock quantities, and clear
                    handover terms for every listing.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background/85 backdrop-blur-xs border border-border hover:border-emerald-500/40 transition flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Stripe-Secured Booking Payments
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Renters pay online through Stripe before pickup, giving you
                    full transaction visibility in your Owner Portal.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background/85 backdrop-blur-xs border border-border hover:border-amber-500/40 transition flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Wrench className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Full Approval &amp; Inventory Control
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Review renter details, accept or decline requests, and
                    update stock anytime from one dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}