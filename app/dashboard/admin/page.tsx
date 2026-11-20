import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  DollarSign,
  Package,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react"
import {
  getAdminStatsApi,
  getAllBookingsAdminApi,
  getAllEquipmentAdminApi,
} from "@/lib/services/getApi"
import AnalyticsBarChart from "@/components/dashboard/Shared/AnalyticsBarChart"

export default async function AdminOverviewPage() {
  const [statsRes, equipmentRes, bookingsRes] = await Promise.all([
    getAdminStatsApi(),
    getAllEquipmentAdminApi(),
    getAllBookingsAdminApi(),
  ])

  if (!statsRes.success || !statsRes.data) {
    return (
      <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
        <AlertCircle className="size-4 shrink-0" />
        <span>{statsRes.message || "Failed to load admin overview."}</span>
      </div>
    )
  }

  const stats = statsRes.data
  const pendingEquipments = (equipmentRes.data ?? [])
    .filter((item) => (item.status || "pending").toLowerCase() === "pending")
    .slice(0, 4)
  const recentBookings = (bookingsRes.data ?? []).slice(0, 5)

  const approvalRate =
    stats.equipment.total > 0
      ? Math.round((stats.equipment.approved / stats.equipment.total) * 100)
      : 0

  const ownerShare =
    stats.users.total > 0
      ? Math.round((stats.users.owners / stats.users.total) * 100)
      : 0

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Platform Admin Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time snapshot of platform revenue, user growth, pending
            approvals, and active rentals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/admin/equipment"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:bg-primary/90 transition"
          >
            <ShieldCheck className="size-4" />
            Review Listings ({stats.equipment.pending})
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Verified Revenue
            </span>
            <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            ${stats.revenue.total.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            From {stats.revenue.transactionsCount} Stripe payment(s)
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Registered Users
            </span>
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            {stats.users.total}
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.users.owners} Owners &bull; {stats.users.customers} Customers
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Equipment Listings
            </span>
            <div className="size-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Package className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            {stats.equipment.total}
          </p>
          <p className="text-xs text-amber-500 font-medium">
            {stats.equipment.pending} awaiting approval
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Platform Bookings
            </span>
            <div className="size-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ClipboardList className="size-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
            {stats.bookings.total}
          </p>
          <p className="text-xs text-emerald-500 font-medium">
            {stats.bookings.active} active rental(s)
          </p>
        </div>
      </div>

      {/* 6-Month Platform Revenue & Booking Chart */}
      <AnalyticsBarChart
        title="Monthly Bookings & Revenue Analytics"
        subtitle="Last 6 months platform performance across all equipment"
        primaryLabel="Revenue ($)"
        secondaryLabel="Bookings"
        valuePrefix="$"
        data={(stats.monthlyStats ?? []).map((m) => ({
          month: m.month,
          primaryValue: m.revenue,
          secondaryValue: m.bookings,
        }))}
      />

      {/* Platform Health Distribution Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              Marketplace Approval Ratio
            </h2>
            <span className="text-xs font-mono font-semibold text-emerald-500">
              {approvalRate}% Live
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${approvalRate}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Approved: {stats.equipment.approved}</span>
            <span>Pending: {stats.equipment.pending}</span>
            <span>Total: {stats.equipment.total}</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              User Role Composition
            </h2>
            <span className="text-xs font-mono font-semibold text-primary">
              {ownerShare}% Owners
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${ownerShare}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Store className="size-3.5 text-primary" /> Owners:{" "}
              {stats.users.owners}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5 text-blue-500" /> Customers:{" "}
              {stats.users.customers}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Two Columns: Pending Approvals & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Equipment Queue */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Clock className="size-4 text-amber-500" />
              Pending Equipment Approvals
            </h2>
            <Link
              href="/dashboard/admin/equipment"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              Manage All <ArrowRight className="size-3" />
            </Link>
          </div>

          {pendingEquipments.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              All submitted equipment listings have been reviewed.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {pendingEquipments.map((item) => (
                <div
                  key={item._id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      By {item.ownerName || "Owner"} &bull; {item.category}
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

        {/* Recent Platform Bookings */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <CreditCard className="size-4 text-primary" />
              Recent Platform Bookings
            </h2>
            <Link
              href="/dashboard/admin/bookings"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowRight className="size-3" />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No bookings recorded yet.
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
                      Renter: {booking.customerName} &bull;{" "}
                      <span className="uppercase font-semibold">
                        {booking.bookingStatus}
                      </span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-xs font-bold text-foreground">
                      ${Number(booking.totalAmount).toFixed(2)}
                    </p>
                    <span
                      className={`text-[10px] font-mono uppercase ${
                        booking.paymentStatus === "paid"
                          ? "text-emerald-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/admin/users"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users className="size-4 text-primary" /> Manage Users &amp; Roles
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>

        <Link
          href="/dashboard/admin/payments"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="size-4 text-emerald-500" /> Stripe Revenue
            Ledger
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>

        <Link
          href="/dashboard/admin/profile"
          className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition flex items-center justify-between"
        >
          <span className="text-sm font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" /> Admin Account
            Settings
          </span>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
      </div>
    </div>
  )
}