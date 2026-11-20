"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  HardHat,
  Camera,
  Truck,
  Tractor,
  Cpu,
  PartyPopper,
  ArrowUpRight,
  Layers,
  type LucideIcon,
} from "lucide-react"
import { HomeCategoryCount } from "@/types"

interface CategoriesSectionProps {
  categories: HomeCategoryCount[]
}

interface CategoryVisualConfig {
  name: string
  shortTitle: string
  description: string
  icon: LucideIcon
  accentClass: string
}

const CATEGORY_META: CategoryVisualConfig[] = [
  {
    name: "Construction Equipment",
    shortTitle: "Construction",
    description: "Excavators, loaders, concrete mixers, and heavy site tools.",
    icon: HardHat,
    accentClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    name: "Photography Equipment",
    shortTitle: "Photography & Cinema",
    description: "Cinema cameras, prime lenses, gimbals, and studio lighting.",
    icon: Camera,
    accentClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    name: "Vehicles & Transportation",
    shortTitle: "Vehicles & Transport",
    description: "Commercial cargo vans, pickup trucks, and utility trailers.",
    icon: Truck,
    accentClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    name: "Agriculture Equipment",
    shortTitle: "Agriculture",
    description: "4WD tractors, harvesters, irrigation pumps, and tillers.",
    icon: Tractor,
    accentClass: "bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20",
  },
  {
    name: "Electronics",
    shortTitle: "Industrial Electronics",
    description: "Silent generators, testing meters, drones, and power units.",
    icon: Cpu,
    accentClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  {
    name: "Event Equipment",
    shortTitle: "Event & Stage Gear",
    description: "PA sound systems, LED walls, trussing, and event tents.",
    icon: PartyPopper,
    accentClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
]

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  const countMap = new Map<string, number>(
    categories.map((cat) => [cat.name, cat.count])
  )

  return (
    <section className="py-16 md:py-24 bg-secondary/25 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
            <Layers className="size-3.5" />
            <span>BROWSE BY SPECIALTY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Explore Popular Equipment Categories
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Jump straight into verified machinery and gear tailored to your
            industry—filtered automatically for fast booking.
          </p>
        </motion.div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORY_META.map((cat, index) => {
            const Icon = cat.icon
            const liveCount = countMap.get(cat.name) ?? 0
            const href = `/equipment?category=${encodeURIComponent(cat.name)}`

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={href}
                  className="group h-full bg-card border border-border hover:border-primary/50 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`size-12 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${cat.accentClass}`}
                      >
                        <Icon className="size-6" />
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary text-xs font-mono font-semibold transition">
                        {liveCount} {liveCount === 1 ? "item" : "items"}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition flex items-center justify-between gap-2">
                        <span>{cat.shortTitle}</span>
                        <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/70 flex items-center justify-between text-xs font-semibold text-primary">
                    <span>Browse {cat.shortTitle}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      View Catalog &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}