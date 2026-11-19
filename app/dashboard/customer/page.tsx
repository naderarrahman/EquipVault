import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  Compass,
  DollarSign,
  Heart,
  UserCog,
} from "lucide-react"
import { getCustomerOverviewApi } from "@/lib/services/getApi"

export default async function CustomerOverviewPage() {
  const overviewRes = await getCustomerOverviewApi()

  if (!overviewRes.success || !overviewRes.data) {
    return (
      <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
        <AlertCircle className="size-4 shrink-0" />
        <span>
          {overviewRes.message || "Failed to load your dashboard overview."}
        </span>
      </div>
    )
  }

  const { bookings, favoritesCount, spending, recentBookings } =
    overviewRes.data

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Renter Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor your active equipment rentals, pending requests, saved
            items, and payment summary.
          </p>
        </div>

        <Link
          href="/equipment"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs"
        >
          <Compass className="size-4" />
          Browse Equipment
        </Link>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Total Paid
            </span>
            <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            ${spending.totalPaid.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            ${spending.unpaidDue.toFixed(2)} unpaid balance
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Active Rentals
            </span>
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CheckCircle2 className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-500 font-mono">
            {bookings.active}
          </p>
          <p className="text-xs text-muted-foreground">
            {bookings.completed} completed previously
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Pending Approval
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-amber-500 font-mono">
            {bookings.pending}
          </p>
          <p className="text-xs text-muted-foreground">
            Out of {bookings.total} total bookings
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Saved Favorites
            </span>
            <div className="size-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            {favoritesCount}
          </p>
          <p className="text-xs text-muted-foreground">
            Bookmarked machinery
          </p>
        </div>
      </div>

      {/* Recent Bookings List */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <ClipboardList className="size-4 text-primary" />
            Recent Rental Bookings
          </h2>
          <Link
            href="/dashboard/customer/bookings"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            View All Bookings <ArrowRight className="size-3" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-sm text-muted-foreground">
              You haven&apos;t made any equipment bookings yet.
            </p>
            <Link
              href="/equipment"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Explore Marketplace <ArrowRight className="size-3" />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <Link
                    href={`/equipment/${booking.equipmentId}`}
                    className="text-sm font-semibold text-foreground hover:text-primary truncate block"
                  >
                    {booking.equipmentName}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {booking.startDate} &rarr; {booking.endDate} &bull; Owner:{" "}
                    {booking.ownerName}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-muted text-foreground">
                    {booking.bookingStatus}
                  </span>
                  <span className="font-mono text-sm font-bold text-foreground">
                    ${Number(booking.totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/customer/bookings"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="size-4 text-primary" /> My Rental
            Bookings
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>

        <Link
          href="/dashboard/customer/favorites"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Heart className="size-4 text-rose-500" /> Saved Favorites
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>

        <Link
          href="/dashboard/customer/profile"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <UserCog className="size-4 text-primary" /> Renter Profile Settings
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
      </div>
    </div>
  )
}