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
import type { HomeCategoryCount } from "@/types"

interface CategoriesSectionProps {
  categories: HomeCategoryCount[]
}

interface CategoryVisualConfig {
  name: string
  shortTitle: string
  code: string
  description: string
  tags: string[]
  icon: LucideIcon
  iconWrapClass: string
  borderHoverClass: string
  spotlightClass: string
  topBarClass: string
  badgeHoverClass: string
}

const CATEGORY_META: CategoryVisualConfig[] = [
  {
    name: "Construction Equipment",
    shortTitle: "Construction",
    code: "01",
    description:
      "Heavy earthmovers, hydraulic excavators, loaders, and commercial site machinery.",
    tags: ["Excavators", "Loaders", "Mixers"],
    icon: HardHat,
    iconWrapClass:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25 group-hover:bg-amber-500 group-hover:text-white",
    borderHoverClass: "hover:border-amber-500/45",
    spotlightClass: "from-amber-500/15 via-amber-500/5 to-transparent",
    topBarClass: "from-amber-500/0 via-amber-500 to-amber-500/0",
    badgeHoverClass:
      "group-hover:border-amber-500/30 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:group-hover:text-amber-400",
  },
  {
    name: "Photography Equipment",
    shortTitle: "Photography & Cinema",
    code: "02",
    description:
      "Full-frame cinema cameras, gimbals, prime lenses, and studio lighting kits.",
    tags: ["Cinema Rigs", "Gimbals", "LED Kits"],
    icon: Camera,
    iconWrapClass:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25 group-hover:bg-blue-500 group-hover:text-white",
    borderHoverClass: "hover:border-blue-500/45",
    spotlightClass: "from-blue-500/15 via-blue-500/5 to-transparent",
    topBarClass: "from-blue-500/0 via-blue-500 to-blue-500/0",
    badgeHoverClass:
      "group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  {
    name: "Vehicles & Transportation",
    shortTitle: "Vehicles & Transport",
    code: "03",
    description:
      "High-roof cargo vans, commercial pickup trucks, and heavy utility transport.",
    tags: ["Cargo Vans", "Pickups", "Trailers"],
    icon: Truck,
    iconWrapClass:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 group-hover:bg-emerald-500 group-hover:text-white",
    borderHoverClass: "hover:border-emerald-500/45",
    spotlightClass: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    topBarClass: "from-emerald-500/0 via-emerald-500 to-emerald-500/0",
    badgeHoverClass:
      "group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  {
    name: "Agriculture Equipment",
    shortTitle: "Agriculture",
    code: "04",
    description:
      "High-torque 4WD tractors, harvesters, irrigation pumps, and field implements.",
    tags: ["4WD Tractors", "Harvesters", "Pumps"],
    icon: Tractor,
    iconWrapClass:
      "bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/25 group-hover:bg-lime-600 group-hover:text-white",
    borderHoverClass: "hover:border-lime-500/45",
    spotlightClass: "from-lime-500/15 via-lime-500/5 to-transparent",
    topBarClass: "from-lime-500/0 via-lime-500 to-lime-500/0",
    badgeHoverClass:
      "group-hover:border-lime-500/30 group-hover:bg-lime-500/10 group-hover:text-lime-600 dark:group-hover:text-lime-400",
  },
  {
    name: "Electronics",
    shortTitle: "Industrial Electronics",
    code: "05",
    description:
      "Silent diesel generators, thermal analyzers, drones, and power backup units.",
    tags: ["Generators", "Thermal Meters", "UPS"],
    icon: Cpu,
    iconWrapClass:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25 group-hover:bg-purple-500 group-hover:text-white",
    borderHoverClass: "hover:border-purple-500/45",
    spotlightClass: "from-purple-500/15 via-purple-500/5 to-transparent",
    topBarClass: "from-purple-500/0 via-purple-500 to-purple-500/0",
    badgeHoverClass:
      "group-hover:border-purple-500/30 group-hover:bg-purple-500/10 group-hover:text-purple-600 dark:group-hover:text-purple-400",
  },
  {
    name: "Event Equipment",
    shortTitle: "Event & Stage Gear",
    code: "06",
    description:
      "Line-array PA sound systems, modular LED video walls, and stage trussing.",
    tags: ["PA Systems", "LED Walls", "Lighting"],
    icon: PartyPopper,
    iconWrapClass:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25 group-hover:bg-rose-500 group-hover:text-white",
    borderHoverClass: "hover:border-rose-500/45",
    spotlightClass: "from-rose-500/15 via-rose-500/5 to-transparent",
    topBarClass: "from-rose-500/0 via-rose-500 to-rose-500/0",
    badgeHoverClass:
      "group-hover:border-rose-500/30 group-hover:bg-rose-500/10 group-hover:text-rose-600 dark:group-hover:text-rose-400",
  },
]

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  const countMap = new Map<string, number>(
    categories.map((cat) => [cat.name, cat.count])
  )

  const totalListings = categories.reduce(
    (sum, item) => sum + (item.count || 0),
    0
  )

  return (
    <section className="relative py-20 md:py-24 bg-secondary/25 border-b border-border overflow-hidden">
      {/* Subtle Background Dot Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:24px_24px] opacity-45"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
              <Layers className="size-3.5" />
              <span>BROWSE BY SPECIALTY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Explore Equipment Categories
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Select an industry domain to inspect admin-verified machinery,
              live stock counts, and flexible daily-to-monthly rental rates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {totalListings > 0 && (
              <div className="px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-mono text-muted-foreground">
                <span className="font-bold text-foreground">
                  {totalListings}
                </span>{" "}
                Active Listings Across 6 Sectors
              </div>
            )}

            <Link
              href="/equipment"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary text-sm font-semibold text-foreground transition-colors shadow-2xs"
            >
              <span>All Equipment</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </motion.div>

        {/* 6 Category Cards Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CATEGORY_META.map((cat) => {
            const Icon = cat.icon
            const liveCount = countMap.get(cat.name) ?? 0
            const href = `/equipment?category=${encodeURIComponent(cat.name)}`

            return (
              <motion.div
                key={cat.name}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="h-full"
              >
                <Link
                  href={href}
                  className={`group relative h-full bg-card border border-border ${cat.borderHoverClass} rounded-2xl p-6 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6 overflow-hidden`}
                >
                  {/* Top Illuminated Accent Line on Hover */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${cat.topBarClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Category-Tinted Radial Spotlight on Hover */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-20 -right-20 size-52 rounded-full bg-radial ${cat.spotlightClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Subtle Watermark Icon in Background */}
                  <Icon
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-5 -right-5 size-28 text-foreground/[0.03] dark:text-foreground/[0.04] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500"
                  />

                  {/* Top & Middle Content */}
                  <div className="relative space-y-4">
                    {/* Icon + Sector Code & Listing Count Pill */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`size-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-2xs ${cat.iconWrapClass}`}
                      >
                        <Icon className="size-5 transition-transform duration-300 group-hover:rotate-3" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-muted-foreground/60">
                          #{cat.code}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 border border-border text-muted-foreground text-xs font-mono font-semibold transition-colors ${cat.badgeHoverClass}`}
                        >
                          <span className="size-1.5 rounded-full bg-current opacity-80" />
                          <span>
                            {liveCount}{" "}
                            {liveCount === 1 ? "listing" : "listings"}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {cat.shortTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    {/* Popular Gear Sub-Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {cat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-secondary/70 border border-border/70 text-[11px] font-mono text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Clean Single-Action Footer */}
                  <div className="relative pt-4 border-t border-border/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                      Explore Catalog
                    </span>

                    <span className="size-8 rounded-xl border border-border bg-background group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground text-muted-foreground flex items-center justify-center transition-all duration-200">
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}