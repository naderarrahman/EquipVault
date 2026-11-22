"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import {
  Wrench,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Home,
  Compass,
  Workflow,
  ArrowRight,
  CalendarCheck,
  PlusCircle,
  Heart,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import ThemeToggle from "../shared/ThemeToggle"
import type { UserRole } from "@/types"

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "All Equipment", href: "/equipment", icon: Compass },
  { label: "How It Works", href: "/how-it-works", icon: Workflow },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  // Live session state from Better Auth
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user
  const userRole: UserRole = (user?.role as UserRole | undefined) || "customer"

  // Track scroll position for subtle header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close avatar dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (pathname.startsWith("/dashboard")) {
    return null
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await authClient.signOut()
      toast.success("Logged out successfully.")
      setDropdownOpen(false)
      setMobileMenuOpen(false)
      router.push("/")
      router.refresh()
    } catch {
      toast.error("Failed to log out. Please try again.")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const isRouteActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U"
  const firstName = user?.name ? user.name.split(" ")[0] : "Account"

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl shadow-sm"
          : "border-b border-border/60 bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo & Website Name */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-2.5 shrink-0 group"
          >
            <span className="size-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:rotate-[-3deg] transition-transform duration-200">
              <Wrench className="w-4.5 h-4.5" />
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-foreground leading-none">
                Equip<span className="text-primary">Vault</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5 hidden sm:block">
                Rental Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation Pill */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1 p-1 rounded-full border border-border/80 bg-muted/45 backdrop-blur-xs"
          >
            {navLinks.map((item) => {
              const active = isRouteActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavbarPill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-card border border-border/80 shadow-2xs"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />

            {isPending ? (
              <div className="h-9 w-32 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2.5">
                {/* Quick Dashboard Pill */}
                <Link
                  href="/dashboard"
                  className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-primary/25 bg-primary/10 text-primary hover:bg-primary/15 text-xs font-semibold transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>

                {/* User Avatar & Dropdown Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="menu"
                    className="inline-flex items-center gap-2 p-1 pr-3 rounded-full border border-border bg-card hover:bg-secondary/70 hover:border-primary/40 transition-all shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User avatar"}
                        width={32}
                        height={32}
                        unoptimized
                        className="w-8 h-8 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center">
                        {userInitial}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-foreground max-w-[96px] truncate hidden sm:inline">
                      {firstName}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180 text-foreground" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Panel */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        role="menu"
                        className="absolute right-0 mt-2.5 w-68 origin-top-right rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl ring-1 ring-black/5 overflow-hidden"
                      >
                        {/* User Info Header */}
                        <div className="px-4 py-3.5 bg-muted/40 border-b border-border">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-sm font-bold text-foreground truncate">
                              {user.name}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 font-semibold shrink-0">
                              <ShieldCheck className="w-3 h-3" />
                              {userRole}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>

                        {/* Role-Aware Menu Actions */}
                        <div className="p-1.5 space-y-0.5">
                          <Link
                            href="/dashboard"
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-primary" />
                            Dashboard Overview
                          </Link>

                          {userRole === "owner" && (
                            <Link
                              href="/dashboard/owner/add-equipment"
                              role="menuitem"
                              onClick={() => setDropdownOpen(false)}
                              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                            >
                              <PlusCircle className="w-4 h-4 text-emerald-500" />
                              List New Equipment
                            </Link>
                          )}

                          {userRole === "customer" && (
                            <>
                              <Link
                                href="/dashboard/customer/bookings"
                                role="menuitem"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                              >
                                <CalendarCheck className="w-4 h-4 text-emerald-500" />
                                My Rental Bookings
                              </Link>
                              <Link
                                href="/dashboard/customer/favorites"
                                role="menuitem"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                              >
                                <Heart className="w-4 h-4 text-rose-500" />
                                Saved Favorites
                              </Link>
                            </>
                          )}

                          <div className="my-1.5 border-t border-border/70" />

                          <button
                            type="button"
                            role="menuitem"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            {isLoggingOut ? "Logging out..." : "Logout"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* Guest Auth Buttons */
              <div className="flex items-center gap-2">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium text-foreground/90 hover:text-foreground border border-border bg-card hover:bg-secondary/80 transition-all shadow-2xs"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all shadow-xs"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl border border-border bg-card hover:bg-secondary text-foreground transition cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-card/95 backdrop-blur-xl shadow-xl"
          >
            <div className="px-4 pt-3 pb-5 space-y-3">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((item) => {
                  const Icon = item.icon
                  const active = isRouteActive(item.href)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                        active
                          ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          active ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="pt-3 border-t border-border">
                {isPending ? (
                  <div className="h-11 w-full rounded-xl bg-muted animate-pulse" />
                ) : user ? (
                  <div className="space-y-3">
                    {/* Mobile User Card */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={40}
                          height={40}
                          unoptimized
                          className="w-10 h-10 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <span className="w-10 h-10 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center">
                          {userInitial}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {user.name}
                          </p>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">
                            {userRole}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Dashboard & Logout Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/15 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl border border-border bg-background hover:bg-secondary text-sm font-medium text-foreground transition"
                    >
                      Login
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}