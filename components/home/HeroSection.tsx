"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  LayoutDashboard,
  ClipboardList,
  UserPlus,
  Layers,
  Star,
  ArrowUpRight,
  CreditCard,
  MapPin,
  Pause,
  Play,
  Zap,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/types"

const HERO_CATEGORIES = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
] as const

const QUICK_SEARCH_TAGS = [
  "Excavator",
  "Sony FX6",
  "Hiace Van",
  "Tractor",
  "Generator",
  "PA System",
]

interface ShowcaseEquipment {
  id: string
  tabLabel: string
  heroHeadlinePhrase: string
  savingsBadge: string
  category: string
  title: string
  model: string
  location: string
  price: string
  cycle: string
  rating: string
  image: string
  badge: string
}

const SHOWCASE_ITEMS: ShowcaseEquipment[] = [
  {
    id: "construction",
    tabLabel: "Construction",
    heroHeadlinePhrase: "Heavy Machinery",
    savingsBadge: "Save ~84% vs. buying • 20-Ton Fleet Ready",
    category: "Construction Equipment",
    title: "Komatsu PC200 Hydraulic Excavator",
    model: "PC200-8 • 20-Ton Class",
    location: "Tejgaon Industrial Area, Dhaka",
    price: "$280",
    cycle: "/day",
    rating: "4.9",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvIsMsAisUjHLX6C4fyMZB8-2DFiFc4TsMHWMWFG9-sw&s=10",
    badge: "Construction • 2 Units Ready",
  },
  {
    id: "photography",
    tabLabel: "Photography",
    heroHeadlinePhrase: "4K Cinema Rigs",
    savingsBadge: "Save ~88% vs. buying • Sensor Inspected",
    category: "Photography Equipment",
    title: "Sony FX6 Full-Frame Cinema Camera",
    model: "ILME-FX6V • 4K 120p",
    location: "Banani Road 11, Dhaka",
    price: "$115",
    cycle: "/day",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85",
    badge: "Photography • 3 Units Ready",
  },
  {
    id: "vehicles",
    tabLabel: "Vehicles",
    heroHeadlinePhrase: "Cargo Fleets",
    savingsBadge: "Zero maintenance overhead • Insured Transit",
    category: "Vehicles & Transportation",
    title: "Toyota Hiace Commercial Cargo Van",
    model: "H200 High-Roof • Commercial",
    location: "Mohakhali DOHS, Dhaka",
    price: "$95",
    cycle: "/day",
    rating: "4.9",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRgyOdbjFqKY0ME5fPGrHCmeGRfO-ATJ7sQ_1dwSoKA&s=10",
    badge: "Vehicles • 3 Units Ready",
  },
  {
    id: "agriculture",
    tabLabel: "Agriculture",
    heroHeadlinePhrase: "4WD Tractors",
    savingsBadge: "Seasonal flexible terms • Field Tested",
    category: "Agriculture Equipment",
    title: "John Deere 5050D 4WD Tractor",
    model: "5050D • 50 HP High-Torque",
    location: "Sylhet Bypass Agro Hub",
    price: "$340",
    cycle: "/week",
    rating: "5.0",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWcmssybfr_Aw6qK_FS1x7nIYuCzLF-iBP1hLRXm3IdA&s=10",
    badge: "Agriculture • 2 Units Ready",
  },
  {
    id: "electronics",
    tabLabel: "Electronics",
    heroHeadlinePhrase: "Silent Generators",
    savingsBadge: "24/7 backup reliability • Monthly Plans",
    category: "Electronics",
    title: "Caterpillar 50kVA Silent Generator",
    model: "DE50E0 • 3-Phase Silent",
    location: "Ashulia Industrial Zone, Savar",
    price: "$390",
    cycle: "/month",
    rating: "4.9",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Tgvr8h3TW33YhYNK0pm8QaGJFXIPl6lTGg5bg9MyMg&s=10",
    badge: "Electronics • 2 Units Ready",
  },
  {
    id: "event",
    tabLabel: "Event Gear",
    heroHeadlinePhrase: "Event Audio Gear",
    savingsBadge: "Concert-grade clarity • Fast Setup",
    category: "Event Equipment",
    title: "JBL EON715 Line-Array PA System",
    model: "EON715 Pair • Built-in DSP",
    location: "Mirpur DOHS, Dhaka",
    price: "$85",
    cycle: "/day",
    rating: "5.0",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQw4z9XdFsPV-cO_fXvpPur3RJQqNdm5oiYRIPJQBoLw&s=10",
    badge: "Event Gear • 4 Units Ready",
  },
]

const AUTO_SLIDE_MS = 4500

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length)
    }, AUTO_SLIDE_MS)

    return () => clearInterval(timer)
  }, [isPaused])

  const user = session?.user
  const rawRole =
    user && "role" in user && typeof user.role === "string"
      ? user.role
      : undefined

  const role: UserRole | null =
    rawRole === "admin" || rawRole === "owner" || rawRole === "customer"
      ? rawRole
      : user
      ? "customer"
      : null

  const heroActions = (() => {
    if (role === "owner") {
      return {
        primary: {
          label: "Add New Equipment",
          href: "/dashboard/owner/add-equipment",
          icon: PlusCircle,
        },
        secondary: {
          label: "Owner Dashboard",
          href: "/dashboard/owner",
          icon: LayoutDashboard,
        },
      }
    }

    if (role === "admin") {
      return {
        primary: {
          label: "Manage Equipment",
          href: "/dashboard/admin/equipment",
          icon: ShieldCheck,
        },
        secondary: {
          label: "Admin Dashboard",
          href: "/dashboard/admin",
          icon: LayoutDashboard,
        },
      }
    }

    if (role === "customer") {
      return {
        primary: {
          label: "Browse All Equipment",
          href: "/equipment",
          icon: ArrowRight,
        },
        secondary: {
          label: "My Rentals",
          href: "/dashboard/customer/my-rentals",
          icon: ClipboardList,
        },
      }
    }

    return {
      primary: {
        label: "Browse All Equipment",
        href: "/equipment",
        icon: ArrowRight,
      },
      secondary: {
        label: "Become an Owner",
        href: "/sign-up",
        icon: UserPlus,
      },
    }
  })()

  const PrimaryIcon = heroActions.primary.icon
  const SecondaryIcon = heroActions.secondary.icon

  const activeItem = SHOWCASE_ITEMS[activeIndex]
  const nextItem1 = SHOWCASE_ITEMS[(activeIndex + 1) % SHOWCASE_ITEMS.length]
  const nextItem2 = SHOWCASE_ITEMS[(activeIndex + 2) % SHOWCASE_ITEMS.length]

  const handleQuickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim())
    }
    if (selectedCategory !== "All") {
      params.set("category", selectedCategory)
    }

    const queryString = params.toString()
    router.push(queryString ? `/equipment?${queryString}` : "/equipment")
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-secondary/25">
      {/* Subtle Architectural Grid & Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_85%_70%_at_50%_15%,#000_65%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/4 size-[440px] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6"
          >
            {/* Live Synced Telemetry Pill */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-mono font-semibold">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-primary" />
                </span>
                <span>VERIFIED RENTAL MARKETPLACE</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/80 text-[11px] font-mono text-muted-foreground overflow-hidden">
                <Zap className="size-3 text-amber-500 shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeItem.savingsBadge}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Locked-Height Smooth Morphing Headline (Zero Layout Shift) */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                <span className="block">Rent Pro-Grade</span>
                <span className="block h-[1.25em] overflow-hidden relative my-0.5">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={activeItem.id}
                      initial={{ opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -26 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-x-0 top-0 text-primary truncate"
                    >
                      {activeItem.heroHeadlinePhrase}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="block">Without Ownership Costs</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                EquipVault connects contractors, production studios, and
                businesses with verified equipment owners across 6 specialized
                categories—backed by transparent Stripe checkout.
              </p>
            </motion.div>

            {/* Interactive Search + Category Bar */}
            <motion.div variants={itemVariants} className="space-y-2.5">
              <form
                onSubmit={handleQuickSearch}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-sm focus-within:border-primary/50 transition"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <Search className="w-4 h-4 text-muted-foreground ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search excavator, Sony FX6, generator..."
                    aria-label="Search equipment"
                    className="w-full px-3 py-2 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>

                <div className="hidden sm:block h-6 w-px bg-border" />

                <div className="flex items-center gap-1.5 px-3 py-1.5 sm:py-0">
                  <Layers className="w-4 h-4 text-primary shrink-0" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Select equipment category"
                    className="w-full sm:w-36 bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer"
                  >
                    <option value="All" className="bg-card text-foreground">
                      All Categories
                    </option>
                    {HERO_CATEGORIES.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                        className="bg-card text-foreground"
                      >
                        {cat}
                      </option>
                    ))}
                  </select>
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
            </motion.div>

            {/* Role-Aware Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <Link
                href={heroActions.primary.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition shadow-xs"
              >
                <span>{heroActions.primary.label}</span>
                <PrimaryIcon className="w-4 h-4" />
              </Link>

              <Link
                href={heroActions.secondary.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-sm font-semibold transition"
              >
                <SecondaryIcon className="w-4 h-4 text-primary" />
                <span>{heroActions.secondary.label}</span>
              </Link>
            </motion.div>

            {/* Trust Micro-Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-5 border-t border-border/70"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    100% Vetted
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Admin verified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <CreditCard className="size-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    Stripe Safe
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Instant receipts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    6 Categories
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Daily to Monthly
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Pre-loaded Simultaneous Crossfade Deck + 4-Sided Border Beam */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-6 relative pb-8"
          >
            {/* Interactive 6-Category Segmented Progress Switcher */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mb-4">
              {SHOWCASE_ITEMS.map((item, idx) => {
                const isActive = idx === activeIndex
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`group text-left p-2 rounded-xl border transition cursor-pointer ${
                      isActive
                        ? "bg-card border-primary/50 shadow-2xs"
                        : "bg-card/50 border-border/70 hover:bg-card"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-mono font-semibold truncate transition-colors ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.tabLabel}
                    </p>
                    <div className="mt-1.5 h-1 w-full rounded-full bg-muted overflow-hidden">
                      {isActive ? (
                        <motion.div
                          key={`${item.id}-${isPaused}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isPaused ? 0.55 : 1 }}
                          transition={{
                            duration: isPaused ? 0.3 : AUTO_SLIDE_MS / 1000,
                            ease: "linear",
                          }}
                          style={{ originX: 0 }}
                          className="h-full w-full bg-primary rounded-full"
                        />
                      ) : (
                        <div
                          className={`h-full rounded-full ${
                            idx < activeIndex ? "w-full bg-primary/40" : "w-0"
                          }`}
                        />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* 3D Layered Card Deck Container */}
            <div className="relative">
              {/* Back Depth Layer 2 */}
              <div
                aria-hidden="true"
                className="absolute inset-x-8 -bottom-6 h-24 rounded-3xl border border-border/60 bg-card/50 backdrop-blur-xs shadow-sm transition-all duration-500"
                style={{ transform: "scale(0.92)" }}
              >
                <span className="sr-only">{nextItem2.title}</span>
              </div>

              {/* Middle Depth Layer 1 */}
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length)
                }
                aria-label={`Next equipment: ${nextItem1.title}`}
                className="absolute inset-x-4 -bottom-3 h-20 rounded-3xl border border-border/80 bg-card/85 shadow-md hover:border-primary/40 transition-all duration-500 cursor-pointer"
                style={{ transform: "scale(0.96)" }}
              />

              {/* Animated Rotating 4-Sided Border Line Wrapper */}
              <div className="relative rounded-[26px] p-[2px] overflow-hidden shadow-2xl bg-border/60">
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="pointer-events-none absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_255deg,var(--primary)_315deg,#f59e0b_345deg,transparent_360deg)]"
                />

                {/* Inner Solid Card Surface */}
                <div className="relative rounded-[24px] bg-card p-3">
                  <Link
                    href={`/equipment?category=${encodeURIComponent(
                      activeItem.category
                    )}`}
                    className="group block relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-muted"
                  >
                    {/* All 6 Images Mounted & Crossfaded Simultaneously (Zero Flicker) */}
                    {SHOWCASE_ITEMS.map((item, idx) => {
                      const isCurrent = idx === activeIndex
                      return (
                        <motion.img
                          key={item.id}
                          src={item.image}
                          alt={item.title}
                          loading="eager"
                          initial={false}
                          animate={{
                            opacity: isCurrent ? 1 : 0,
                            scale: isCurrent ? 1 : 1.06,
                          }}
                          transition={{
                            opacity: { duration: 0.75, ease: "easeInOut" },
                            scale: { duration: 4.5, ease: "easeOut" },
                          }}
                          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                        />
                      )
                    })}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />

                    {/* Top Overlay Bar */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={activeItem.id}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.3 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/15"
                        >
                          <CheckCircle2 className="size-3.5 text-emerald-400" />
                          <span>{activeItem.badge}</span>
                        </motion.span>
                      </AnimatePresence>

                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-mono font-semibold border border-white/15">
                          <Star className="size-3 fill-amber-400 text-amber-400" />
                          <span>{activeItem.rating}</span>
                        </span>
                        <span className="size-8 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                    </div>

                    {/* Bottom Glass Info Panel (Fixed Height for Zero Jump) */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 p-3.5 sm:p-4 text-white z-10 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeItem.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.32, ease: "easeOut" }}
                          className="flex items-end justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <p className="text-[11px] font-mono uppercase tracking-wider text-amber-300 truncate">
                              {activeItem.model}
                            </p>
                            <h2 className="text-base sm:text-lg font-bold truncate mt-0.5">
                              {activeItem.title}
                            </h2>
                            <p className="inline-flex items-center gap-1 text-xs text-white/75 mt-1 truncate max-w-full">
                              <MapPin className="size-3 text-emerald-400 shrink-0" />
                              <span className="truncate">
                                {activeItem.location}
                              </span>
                            </p>
                          </div>

                          <div className="text-right shrink-0 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                            <p className="text-[10px] uppercase tracking-wider text-white/70">
                              Rate
                            </p>
                            <p className="text-base sm:text-lg font-mono font-extrabold text-amber-300">
                              {activeItem.price}
                              <span className="text-[11px] font-normal text-white/80">
                                {activeItem.cycle}
                              </span>
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </Link>

                  {/* Bottom Control Strip */}
                  <div className="mt-3 px-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono text-[11px]">
                      {activeIndex + 1}/6 • Up next:{" "}
                      <strong className="text-foreground">
                        {nextItem1.tabLabel}
                      </strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsPaused((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/70 hover:bg-secondary text-foreground text-[11px] font-mono transition cursor-pointer"
                    >
                      {isPaused ? (
                        <>
                          <Play className="size-3 text-primary" />
                          <span>Resume</span>
                        </>
                      ) : (
                        <>
                          <Pause className="size-3 text-primary" />
                          <span>Auto-Cycling</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}