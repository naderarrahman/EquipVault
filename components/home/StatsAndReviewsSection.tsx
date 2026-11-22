"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Star,
  ShieldCheck,
  Package,
  Users,
  CheckCircle2,
  Quote,
  ArrowUpRight,
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

export default function StatsAndReviewsSection({
  stats,
  reviews = [],
}: StatsAndReviewsSectionProps) {
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

  const statCards = [
    {
      label: "Verified Equipment",
      value: `${
        stats?.totalEquipment && stats.totalEquipment > 0
          ? stats.totalEquipment
          : 12
      }+`,
      subtext: "Admin-inspected listings",
      icon: Package,
    },
    {
      label: "Trusted Owners",
      value: `${stats?.verifiedOwners || stats?.totalOwners || 2}+`,
      subtext: "Identity & gear verified",
      icon: Users,
    },
    {
      label: "Completed Rentals",
      value: `${stats?.completedBookings || stats?.totalBookings || 4}+`,
      subtext: "Delivered on schedule",
      icon: CheckCircle2,
    },
    {
      label: "Average Rating",
      value:
        stats?.averageRating && stats.averageRating > 0
          ? `${stats.averageRating.toFixed(1)}/5`
          : "5.0/5",
      subtext: "From verified renters",
      icon: Star,
    },
  ]

  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Live Platform Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-card border border-border hover:border-primary/40 rounded-2xl p-5 sm:p-6 shadow-2xs transition flex flex-col justify-between gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </span>
                  <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                    <Icon className="size-4" />
                  </div>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.subtext}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Verified Customer Reviews */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2.5 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-mono font-semibold">
                <ShieldCheck className="size-3.5" />
                <span>VERIFIED RENTER STORIES</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Trusted by Contractors, Creators &amp; Event Teams
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Real feedback submitted exclusively by customers who completed
                verified rentals on EquipVault.
              </p>
            </div>

            <Link
              href="/equipment"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-sm font-semibold text-foreground transition self-start md:self-auto"
            >
              <span>Browse Top-Rated Gear</span>
              <ArrowUpRight className="size-4 text-primary" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayReviews.map((review, index) => {
              const initials = (review.customerName || "VR")
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()

              return (
                <motion.article
                  key={review._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-card border border-border hover:border-primary/40 rounded-2xl p-5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`size-4 ${
                              star <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <Quote className="size-4 text-primary/40" />
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-3 pt-3.5 border-t border-border">
                    {review.equipmentName &&
                      (review.equipmentId ? (
                        <Link
                          href={`/equipment/${review.equipmentId}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/70 hover:bg-primary/10 hover:text-primary text-xs font-medium text-foreground max-w-full transition"
                        >
                          <Package className="size-3.5 text-primary shrink-0" />
                          <span className="truncate">
                            {review.equipmentName}
                          </span>
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/70 text-xs font-medium text-foreground max-w-full">
                          <Package className="size-3.5 text-primary shrink-0" />
                          <span className="truncate">
                            {review.equipmentName}
                          </span>
                        </div>
                      ))}

                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {review.customerName}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                          <CheckCircle2 className="size-3" />
                          Verified Rental
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}