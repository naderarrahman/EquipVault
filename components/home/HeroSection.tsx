"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react"

const QUICK_SEARCH_TAGS = [
  "Excavator",
  "Sony FX6",
  "Generator",
  "Tractor",
  "PA System",
]

export default function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleQuickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = searchQuery.trim()
    if (trimmed) {
      router.push(`/equipment?search=${encodeURIComponent(trimmed)}`)
    } else {
      router.push("/equipment")
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Subtle Architectural Grid & Ambient Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 size-[420px] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-22 lg:py-26">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Headline, Description, Quick Search & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Top Live Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-primary" />
              </span>
              <span>VERIFIED EQUIPMENT RENTAL MARKETPLACE</span>
            </div>

            {/* Main Banner Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-extrabold tracking-tight text-foreground leading-[1.13]">
              Rent Pro-Grade Gear{" "}
              <span className="text-primary">
                Without Heavy Ownership Costs
              </span>
            </h1>

            {/* Platform Purpose Description */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              EquipVault connects businesses, creators, and contractors with
              verified equipment owners. Browse heavy machinery, cinema cameras,
              vehicles, and event tools with flexible daily, weekly, or monthly
              rental plans.
            </p>

            {/* Quick Search Bar + Popular Tags */}
            <div className="space-y-2.5 max-w-xl">
              <form
                onSubmit={handleQuickSearch}
                className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl border border-border bg-card/95 backdrop-blur-xs shadow-sm focus-within:border-primary/50 transition"
              >
                <div className="relative flex-1 flex items-center">
                  <Search className="w-4 h-4 text-muted-foreground ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search excavator, Sony FX6, generator, or city..."
                    className="w-full px-3 py-2 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition shrink-0 cursor-pointer shadow-2xs"
                >
                  Find Gear
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <span className="font-mono text-[11px] uppercase tracking-wider mr-1">
                  Popular:
                </span>
                {QUICK_SEARCH_TAGS.map((tag) => (
                  <Link
                    key={tag}
                    href={`/equipment?search=${encodeURIComponent(tag)}`}
                    className="px-2.5 py-1 rounded-lg bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/70 transition font-medium"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition shadow-xs"
              >
                Browse All Equipment
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard/owner/add-equipment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-sm font-semibold transition"
              >
                List Your Equipment
              </Link>
            </div>

            {/* Key Platform Metrics / Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border/70 max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                  500+
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verified Machines
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                  99.2%
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  On-Time Delivery
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                  24/7
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Stripe Protection
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Quality Equipment Showcase Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-border bg-card p-3.5 shadow-xl">
              {/* Main Banner Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted group">
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85"
                  alt="Heavy construction and industrial equipment available for rent on EquipVault"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Top Left Live Tag */}
                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
                  <TrendingUp className="size-3.5 text-emerald-400" />
                  <span>High Demand Fleet</span>
                </div>

                {/* Bottom Overlay Caption inside Image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-primary text-primary-foreground font-semibold">
                      Featured Fleet
                    </span>
                    <p className="text-base font-bold mt-1.5">
                      CAT &amp; Pro Industrial Series
                    </p>
                  </div>
                  <div className="text-right bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase tracking-wider text-white/75">
                      Starting from
                    </p>
                    <p className="text-base font-mono font-bold text-amber-300">
                      $45/day
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Strip */}
              <div className="mt-3.5 grid grid-cols-2 gap-2.5 text-xs">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/60 border border-border/60 text-foreground">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-medium">Admin-Verified Owners</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/60 border border-border/60 text-foreground">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-medium">Instant Stripe Booking</span>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 }}
                className="hidden sm:flex items-center gap-2 absolute -top-4 -right-4 px-3.5 py-2 rounded-xl border border-border bg-card shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-foreground">
                  100% Secure Escrow
                </span>
              </motion.div>

              {/* Floating Sparkle Tag */}
              <div className="hidden sm:flex items-center gap-1.5 absolute -bottom-3.5 left-6 px-3 py-1 rounded-full border border-primary/25 bg-card shadow-md text-[11px] font-mono font-semibold text-primary">
                <Sparkles className="size-3" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}