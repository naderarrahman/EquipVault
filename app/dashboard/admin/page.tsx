import React from "react"
import Link from "next/link"
import { Package, ClipboardList, DollarSign, PlusCircle } from "lucide-react"

export default function OwnerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Owner Overview
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your listed machines, approve rental requests, and monitor earnings.
          </p>
        </div>
        <Link
          href="/dashboard/owner/add-equipment"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition self-start"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Equipment
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">Listed Equipment</span>
            <Package className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-mono font-bold text-foreground">0</p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">Pending Requests</span>
            <ClipboardList className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-mono font-bold text-foreground">0</p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">Total Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-mono font-bold text-foreground">$0.00</p>
        </div>
      </div>
    </div>
  )
}