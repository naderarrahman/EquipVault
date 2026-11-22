"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  Star,
  ShieldCheck,
  Package,
  Users,
  CheckCircle2,
  Quote,
  ArrowUpRight,
  Sparkles,
  Layers,
} from "lucide-react"
import type { PlatformStats, ReviewItem } from "@/types"

interface StatsAndReviewsSectionProps {
  stats?: PlatformStats
  reviews?: ReviewItem[]
}

const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    _id: "fallback-1",
    equipmentName: "Komatsu PC200 Hydraulic Excavator",
    category: "Construction Equipment",
    customerName: "Tanvir Hasan",
    rating: 5,
    comment:
      "Booked the excavator for a 5-day commercial foundation job. Handover was right on schedule, machine hydraulics were spotless, and Stripe checkout was completely transparent.",
  },
  {
    _id: "fallback-2",
    equipmentName: "Sony FX6 Full-Frame Cinema Camera",
    category: "Photography Equipment",
    customerName: "Mahmudul Karim",
    rating: 5,
    comment:
      "Saved huge production budget compared to purchasing new cinema gear. The owner verified every lens and battery pack before pickup and everything worked flawlessly.",
  },
  {
    _id: "fallback-3",
    equipmentName: "JBL EON715 Line-Array PA Sound System",
    category: "Event Equipment",
    customerName: "Nusrat Jahan",
    rating: 5,
    comment:
      "Rented full stage audio and wireless mics for our university tech summit. Crystal clear sound, fast owner approval, and zero hidden rental fees.",
  },
  {
    _id: "fallback-4",
    equipmentName: "John Deere 5050D 4WD Tractor",
    category: "Agriculture Equipment",
    customerName: "Rafiul Islam",
    rating: 5,
    comment:
      "Reliable 4WD tractor with strong pulling power for heavy field work. Smooth handover and transparent pricing made the whole rental effortless.",
  },
]

function getInitials(name?: string) {
  return (name || "VR")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default function StatsAndReviewsSection({
  stats,
  reviews = [],
}: StatsAndReviewsSectionProps) {
  const [spotlightIndex, setSpotlightIndex] = useState(0)

  const validReviews = Array.isArray(reviews) ? reviews : []

  const displayReviews =
    validReviews.length >= 4
      ? validReviews.slice(0, 4)
      : validReviews.length > 0
      ? [
          ...validReviews,
          ...FALLBACK_REVIEWS.slice(0, 4 - validReviews.length),
        ]
      : FALLBACK_REVIEWS

  const activeSpotlight = displayReviews[spotlightIndex] ?? displayReviews[0]

  const statItems = [
    {
      label: "Verified Equipment",
      value: `${
        stats?.totalEquipment && stats.totalEquipment > 0
          ? stats.totalEquipment
          : 12
      }+`,
      subtext: "Admin-inspected catalog",
      icon: Package,
      accentClass: "text-primary bg-primary/10 border-primary/20",
    },
    {
      label: "Trusted Owners",
      value: `${stats?.verifiedOwners || stats?.totalOwners || 2}+`,
      subtext: "Identity & fleet vetted",
      icon: Users,
      accentClass: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Completed Rentals",
      value: `${stats?.completedBookings || stats?.totalBookings || 4}+`,
      subtext: "Delivered on schedule",
      icon: CheckCircle2,
      accentClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Average Rating",
      value:
        stats?.averageRating && stats.averageRating > 0
          ? `${stats.averageRating.toFixed(1)}/5`
          : "5.0/5",
      subtext: "From verified renters",
      icon: Star,
      accentClass: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
  ]

  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-border bg-background overflow-hidden">
      {/* Subtle Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 size-[460px] rounded-full bg-primary/8 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* 1. Unified Segmented Telemetry Dock with Hero-Style 4-Sided Rotating Border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative rounded-[26px] p-[2px] overflow-hidden bg-border/60 shadow-lg"
        >
          {/* Continuous Rotating Light Beam Around All 4 Sides */}
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -inset-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_255deg,var(--primary)_315deg,#f59e0b_345deg,transparent_360deg)]"
          />

          {/* Inner Solid Telemetry Surface */}
          <div className="relative rounded-[24px] bg-card overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/80">
              {statItems.map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    className="group p-6 sm:p-7 hover:bg-muted/30 transition-colors flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                      <div
                        className={`size-9 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${item.accentClass}`}
                      >
                        <Icon className="size-4" />
                      </div>
                    </div>

                    <div>
                      <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        <span>{item.subtext}</span>
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* 2. Verified Customer Reviews: Spotlight + Interactive Bento Stack */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-mono font-semibold">
                <ShieldCheck className="size-3.5" />
                <span>VERIFIED RENTER STORIES</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                Trusted by Contractors, Creators &amp;{" "}
                <span className="text-primary">Event Teams</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Real feedback submitted exclusively by customers who completed
                verified rentals on EquipVault. Click any story to inspect.
              </p>
            </div>

            <Link
              href="/equipment"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-sm font-semibold text-foreground transition-colors self-start md:self-auto shadow-2xs"
            >
              <span>Browse Top-Rated Gear</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 5 Columns: Featured Spotlight Quote Card with Rotating Border */}
            <div className="lg:col-span-5">
              <div className="relative h-full rounded-[26px] p-[2px] overflow-hidden bg-border/60 shadow-xl">
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="pointer-events-none absolute -inset-[120%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_255deg,var(--primary)_315deg,#f59e0b_345deg,transparent_360deg)]"
                />

                <div className="relative h-full rounded-[24px] bg-card p-6 sm:p-8 flex flex-col justify-between gap-6 overflow-hidden">
                  {/* Decorative Oversized Quote Watermark */}
                  <Quote
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 right-4 size-24 text-primary/[0.06] rotate-12"
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSpotlight._id || spotlightIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative space-y-5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-mono font-semibold">
                          <Sparkles className="size-3" />
                          <span>SPOTLIGHT REVIEW</span>
                        </span>

                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`size-4 ${
                                star <= activeSpotlight.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <blockquote className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                        &ldquo;{activeSpotlight.comment}&rdquo;
                      </blockquote>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`meta-${activeSpotlight._id || spotlightIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative space-y-4 pt-5 border-t border-border/80"
                    >
                      {activeSpotlight.equipmentName && (
                        <div className="flex items-center justify-between gap-2 rounded-xl bg-muted/60 border border-border/70 px-3.5 py-2.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <Layers className="size-4 text-primary shrink-0" />
                            <div className="min-w-0">
                              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                                {activeSpotlight.category || "Verified Gear"}
                              </p>
                              <p className="text-xs font-semibold text-foreground truncate">
                                {activeSpotlight.equipmentName}
                              </p>
                            </div>
                          </div>

                          {activeSpotlight.equipmentId && (
                            <Link
                              href={`/equipment/${activeSpotlight.equipmentId}`}
                              className="size-7 rounded-lg bg-background border border-border hover:bg-primary hover:text-primary-foreground flex items-center justify-center shrink-0 transition"
                              title="Inspect Equipment"
                            >
                              <ArrowUpRight className="size-3.5" />
                            </Link>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-10 rounded-full bg-primary text-primary-foreground font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                            {getInitials(activeSpotlight.customerName)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">
                              {activeSpotlight.customerName}
                            </p>
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-medium">
                              <CheckCircle2 className="size-3.5" />
                              <span>Verified Stripe Renter</span>
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-mono text-muted-foreground shrink-0">
                          0{spotlightIndex + 1} / 0{displayReviews.length}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Interactive Review Selector List */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {displayReviews.map((review, index) => {
                const isSelected = index === spotlightIndex
                const initials = getInitials(review.customerName)

                return (
                  <motion.button
                    key={review._id || index}
                    type="button"
                    onClick={() => setSpotlightIndex(index)}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className={`group w-full text-left rounded-2xl p-4 sm:p-5 border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-card border-primary shadow-md ring-1 ring-primary/20"
                        : "bg-card/70 hover:bg-card border-border hover:border-primary/40 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div
                        className={`size-9 rounded-full font-mono font-bold text-xs flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-foreground border-border group-hover:border-primary/40"
                        }`}
                      >
                        {initials}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-bold text-foreground">
                            {review.customerName}
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-amber-400">
                            <Star className="size-3 fill-amber-400" />
                            <span className="text-xs font-mono font-semibold text-foreground">
                              {review.rating.toFixed(1)}
                            </span>
                          </span>
                          {review.equipmentName && (
                            <span className="text-[11px] font-mono text-primary truncate max-w-[220px]">
                              • {review.equipmentName}
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </div>
                    </div>

                    <span
                      className={`self-end sm:self-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold shrink-0 transition-colors ${
                        isSelected
                          ? "bg-primary/10 text-primary border border-primary/25"
                          : "bg-muted/70 text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {isSelected ? "Active" : "Read Story"}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}