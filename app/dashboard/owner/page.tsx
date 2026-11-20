import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  DollarSign,
  Package,
  Plus,
  UserCog,
} from "lucide-react"
import { getOwnerOverviewApi } from "@/lib/services/getApi"
import AnalyticsBarChart from "@/components/dashboard/Shared/AnalyticsBarChart"

export default async function OwnerOverviewPage() {
  const overviewRes = await getOwnerOverviewApi()

  if (!overviewRes.success || !overviewRes.data) {
    return (
      <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
        <AlertCircle className="size-4 shrink-0" />
        <span>
          {overviewRes.message || "Failed to load owner dashboard overview."}
        </span>
      </div>
    )
  }

  const {
    equipment,
    bookings,
    revenue,
    monthlyEarnings,
    recentBookings,
    recentEquipment,
  } = overviewRes.data

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Owner Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your machinery fleet, incoming rental requests, and verified
            rental earnings.
          </p>
        </div>

        <Link
          href="/dashboard/owner/add-equipment"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs"
        >
          <Plus className="size-4" />
          Add New Equipment
        </Link>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Verified Earnings
            </span>
            <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            ${revenue.paidEarnings.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            ${revenue.pendingValue.toFixed(2)} unpaid pending
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Listed Machinery
            </span>
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Package className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            {equipment.total}
          </p>
          <p className="text-xs text-muted-foreground">
            {equipment.approved} Approved &bull; {equipment.pending} Pending
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Pending Requests
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-500 font-mono">
            {bookings.pending}
          </p>
          <p className="text-xs text-muted-foreground">
            Awaiting your approval
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Active &amp; Completed
            </span>
            <div className="size-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <CheckCircle2 className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            {bookings.approved + bookings.completed}
          </p>
          <p className="text-xs text-emerald-500 font-medium">
            {bookings.approved} currently rented out
          </p>
        </div>
      </div>

      {/* 6-Month Rental Earnings & Bookings Chart */}
      <AnalyticsBarChart
        title="Monthly Rental Earnings"
        subtitle="Verified Stripe payouts and booking volume over the last 6 months"
        primaryLabel="Earnings ($)"
        secondaryLabel="Bookings"
        valuePrefix="$"
        data={(monthlyEarnings ?? []).map((m) => ({
          month: m.month,
          primaryValue: m.earnings,
          secondaryValue: m.bookings,
        }))}
      />

      {/* Recent Bookings & Fleet Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Rental Requests */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <ClipboardList className="size-4 text-primary" />
              Recent Rental Requests
            </h2>
            <Link
              href="/dashboard/owner/bookings"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              Manage All <ArrowRight className="size-3" />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No rental requests received yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {booking.equipmentName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {booking.customerName} &bull; {booking.durationDays} day(s)
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-xs font-bold text-foreground">
                      ${Number(booking.totalAmount).toFixed(2)}
                    </p>
                    <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                      {booking.bookingStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Equipment Snapshot */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Package className="size-4 text-primary" />
              Your Equipment Fleet
            </h2>
            <Link
              href="/dashboard/owner/my-equipment"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              View Inventory <ArrowRight className="size-3" />
            </Link>
          </div>

          {recentEquipment.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              You haven&apos;t listed any equipment yet.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recentEquipment.map((item) => (
                <div
                  key={item._id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/owner/my-equipment/${item._id}`}
                      className="text-sm font-semibold text-foreground hover:text-primary truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Stock: {item.availableQuantity} unit(s) &bull;{" "}
                      <span className="uppercase">{item.status}</span>
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground shrink-0">
                    ${item.rentalPrice}/{item.rentalType}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/owner/my-equipment"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Package className="size-4 text-primary" /> My Equipment Inventory
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>

        <Link
          href="/dashboard/owner/bookings"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="size-4 text-amber-500" /> Rental Requests
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>

        <Link
          href="/dashboard/owner/profile"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <UserCog className="size-4 text-primary" /> Owner Profile Settings
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
      </div>
    </div>
  )
}