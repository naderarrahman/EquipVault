"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Wrench,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import ThemeToggle from "../shared/ThemeToggle"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipment" },
  { label: "How It Works", href: "/#how-it-works" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  // Live session state from Better Auth
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user
  const userRole =
    ((user as Record<string, unknown> | undefined)?.role as string | undefined) || "customer"

  // Close avatar dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

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

  // Fallback initials if user has no profile picture
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo & Website Name */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-2.5 shrink-0 group"
          >
            <span className="p-2 rounded-lg bg-primary text-primary-foreground shadow-xs group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Equip<span className="text-primary">Vault</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("#")[0]) &&
                    item.href !== "/#how-it-works"

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {isPending ? (
              <div className="h-9 w-28 rounded-lg bg-muted animate-pulse" />
            ) : user ? (
              /* User Avatar & Dropdown Menu */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                  className="inline-flex items-center gap-2 p-1 pr-2.5 rounded-full border border-border bg-card hover:bg-secondary/70 transition-all shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User avatar"}
                      width={34}
                      height={34}
                      unoptimized
                      className="w-8 h-8 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center">
                      {userInitial}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-foreground" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                {dropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2.5 w-64 origin-top-right rounded-xl border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-black/5 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3.5 bg-muted/40 border-b border-border">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {user.name}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold shrink-0">
                          <ShieldCheck className="w-3 h-3" />
                          {userRole}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>

                    {/* Menu Actions */}
                    <div className="p-1.5 space-y-1">
                      <Link
                        href="/dashboard"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-primary" />
                        Dashboard
                      </Link>

                      <div className="my-1 border-t border-border/70" />

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Refined Guest Auth Buttons */
              <div className="flex items-center gap-2.5">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-foreground/90 hover:text-foreground border border-border bg-card hover:bg-secondary/80 transition-all shadow-2xs"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all shadow-xs"
                >
                  Get Started
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
              className="p-2 rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("#")[0]) &&
                    item.href !== "/#how-it-works"

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="pt-3 border-t border-border">
            {isPending ? (
              <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
            ) : user ? (
              <div className="space-y-3">
                {/* Mobile User Card */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50 border border-border">
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
                      <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-primary/15 text-primary font-semibold">
                        {userRole}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>

                {/* Mobile Dashboard & Logout Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/15 transition cursor-pointer"
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
                  className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-secondary text-sm font-medium text-foreground transition"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center px-3 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}