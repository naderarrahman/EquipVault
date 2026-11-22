"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, PackageOpen, Sparkles, ShieldCheck } from "lucide-react"
import EquipmentCard from "@/components/ProductCard/EquipmentCard"
import type { Equipment } from "@/types"

interface FeaturedEquipmentSectionProps {
  equipments: Equipment[]
}

export default function FeaturedEquipmentSection({
  equipments,
}: FeaturedEquipmentSectionProps) {
  return (
    <section className="py-20 md:py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
              <Sparkles className="size-3.5" />
              <span>FEATURED FLEET</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Featured Rental Equipment
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore admin-verified machinery, cinema rigs, and commercial
              tools ready for immediate daily, weekly, or monthly booking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {equipments.length > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/60 border border-border text-xs font-mono text-muted-foreground">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                Showing {equipments.length} Verified Listings
              </span>
            )}

            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary hover:border-primary/40 text-sm font-semibold text-foreground transition w-fit shrink-0 shadow-2xs"
            >
              <span>View All Equipment</span>
              <ArrowRight className="size-4 text-primary" />
            </Link>
          </div>
        </motion.div>

        {/* Server-Sorted Featured Equipment Cards */}
        {equipments.length === 0 ? (
          <div className="bg-card border border-dashed border-border rounded-2xl p-14 text-center space-y-3 shadow-2xs">
            <div className="size-12 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <PackageOpen className="size-6" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              No Featured Equipment Available Yet
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Approved equipment listings from verified owners will appear here
              automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipments.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <EquipmentCard item={item} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Centered CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition shadow-xs"
          >
            <span>Explore Full Marketplace Catalog</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}