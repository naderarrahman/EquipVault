import React from "react"
import Link from "next/link"
import { CalendarCheck, Heart, CreditCard, ArrowRight } from "lucide-react"

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Customer Dashboard
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track your active equipment rentals, payment receipts, and saved gear.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">Active Rentals</span>
            <CalendarCheck className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-mono font-bold text-foreground">0</p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">Saved Favorites</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-mono font-bold text-foreground">0</p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">Total Spent</span>
            <CreditCard className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-mono font-bold text-foreground">$0.00</p>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-foreground">Need industrial or event gear?</h3>
          <p className="text-sm text-muted-foreground">
            Explore verified equipment with instant booking and Stripe protection.
          </p>
        </div>
        <Link
          href="/equipment"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition shrink-0"
        >
          Browse Equipment <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}