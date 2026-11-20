"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Wrench,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react"

const categoryLinks = [
  {
    label: "Construction Equipment",
    href: "/equipment?category=Construction+Equipment",
  },
  {
    label: "Photography & Cinema",
    href: "/equipment?category=Photography+Equipment",
  },
  {
    label: "Vehicles & Transportation",
    href: "/equipment?category=Vehicles+%26+Transportation",
  },
  {
    label: "Agriculture Machinery",
    href: "/equipment?category=Agriculture+Equipment",
  },
  {
    label: "Industrial Electronics",
    href: "/equipment?category=Electronics",
  },
]

const platformLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Equipment", href: "/equipment" },
  { label: "Dashboard Portal", href: "/dashboard" },
  { label: "Sign In", href: "/sign-in" },
  { label: "Create Account", href: "/sign-up" },
]

export default function Footer() {
  const pathname = usePathname()

  // Hide website footer inside dashboard & auth screens to keep layouts clean
  if (
    pathname?.startsWith("/dashboard") ||
    pathname === "/sign-in" ||
    pathname === "/sign-up"
  ) {
    return null
  }

  return (
    <footer className="border-t border-border bg-card text-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-2xs group-hover:scale-105 transition-transform">
                <Wrench className="size-4" />
              </div>
              <span className="font-heading font-bold tracking-tight text-xl text-foreground">
                Equip<span className="text-primary">Vault</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Trusted peer-to-peer and commercial equipment rental marketplace.
              Rent verified construction, photography, agricultural, and
              industrial gear on flexible daily, weekly, or monthly terms.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <ShieldCheck className="size-4 shrink-0" />
              <span>Admin-Verified Listings &amp; Secure Bookings</span>
            </div>

            {/* Social Media Links (Using Official New X Logo) */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow EquipVault on X"
                className="size-9 rounded-xl border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center text-muted-foreground transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4 fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="EquipVault on GitHub"
                className="size-9 rounded-xl border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center text-muted-foreground transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4 fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="EquipVault on LinkedIn"
                className="size-9 rounded-xl border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center text-muted-foreground transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4 fill-current"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Equipment Categories (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Equipment Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Contact &amp; Support
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Maijdee Commercial Hub, Noakhali, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-primary shrink-0" />
                <a
                  href="mailto:support@equipvault.com"
                  className="hover:text-foreground transition"
                >
                  support@equipvault.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-primary shrink-0" />
                <a
                  href="tel:+8801700000000"
                  className="hover:text-foreground transition font-mono text-xs"
                >
                  +880 1700-000000
                </a>
              </li>
            </ul>

            <div className="pt-1">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <span>List your equipment as an Owner</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} EquipVault Technologies. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/equipment"
              className="hover:text-foreground transition"
            >
              Rental Guidelines
            </Link>
            <Link
              href="/equipment"
              className="hover:text-foreground transition"
            >
              Safety &amp; Verification
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}