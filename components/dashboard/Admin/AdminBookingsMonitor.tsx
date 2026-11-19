"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  DollarSign,
  ExternalLink,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  Store,
  User,
} from "lucide-react"
import type { BookingRecord, BookingStatus, PaymentStatus } from "@/types"

interface AdminBookingsMonitorProps {
  initialBookings: BookingRecord[]
}

const statusTabs: Array<{ label: string; value: "all" | BookingStatus }> = [
  { label: "All Bookings", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Rejected", value: "rejected" },
]

export default function AdminBookingsMonitor({
  initialBookings,
}: AdminBookingsMonitorProps) {
  const [activeTab, setActiveTab] = useState<"all" | BookingStatus>("all")
  const [paymentFilter, setPaymentFilter] = useState<"all" | PaymentStatus>(
    "all"
  )
  const [searchQuery, setSearchQuery] = useState("")

  const stats = useMemo(() => {
    const total = initialBookings.length
    const pending = initialBookings.filter(
      (b) => b.bookingStatus === "pending"
    ).length
    const active = initialBookings.filter(
      (b) => b.bookingStatus === "approved"
    ).length
    const grossValue = initialBookings
      .filter(
        (b) =>
          b.bookingStatus !== "cancelled" && b.bookingStatus !== "rejected"
      )
      .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0)

    return { total, pending, active, grossValue }
  }, [initialBookings])

  const filteredBookings = useMemo(() => {
    return initialBookings.filter((booking) => {
      const matchesStatus =
        activeTab === "all" || booking.bookingStatus === activeTab

      const matchesPayment =
        paymentFilter === "all" || booking.paymentStatus === paymentFilter

      const keyword = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !keyword ||
        booking.equipmentName.toLowerCase().includes(keyword) ||
        booking.customerName.toLowerCase().includes(keyword) ||
        booking.customerEmail.toLowerCase().includes(keyword) ||
        booking.ownerName.toLowerCase().includes(keyword) ||
        booking.deliveryAddress.toLowerCase().includes(keyword)

      return matchesStatus && matchesPayment && matchesSearch
    })
  }, [initialBookings, activeTab, paymentFilter, searchQuery])

  const formatDate = (dateStr: string) => {
    const parsed = new Date(dateStr)
    if (Number.isNaN(parsed.getTime())) return dateStr
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
      case "completed":
        return "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
      case "rejected":
      case "cancelled":
        return "bg-destructive/15 text-destructive border-destructive/30"
      case "pending":
      default:
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Platform Bookings
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              {stats.total}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <ClipboardList className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Pending Requests
            </p>
            <p className="text-2xl font-bold text-amber-500 font-mono mt-1">
              {stats.pending}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Active Rentals
            </p>
            <p className="text-2xl font-bold text-emerald-500 font-mono mt-1">
              {stats.active}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Gross Booking Volume
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              ${stats.grossValue.toFixed(2)}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <DollarSign className="size-5" />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {statusTabs.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            aria-label="Filter by payment status"
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(e.target.value as "all" | PaymentStatus)
            }
            className="px-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid Only</option>
            <option value="unpaid">Unpaid Only</option>
          </select>

          <div className="relative w-full sm:w-72">
            <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment, renter, or owner..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 space-y-3 shadow-2xs">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <ClipboardList className="size-7" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No platform bookings found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            No rental bookings match your current filter or search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-primary/40 transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Equipment & Schedule */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0">
                  <div className="relative h-24 w-full sm:w-32 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                    <Image
                      src={
                        booking.equipmentImage ||
                        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
                      }
                      alt={booking.equipmentName}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusBadge(
                          booking.bookingStatus
                        )}`}
                      >
                        {booking.bookingStatus}
                      </span>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${
                          booking.paymentStatus === "paid"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/25"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        Payment: {booking.paymentStatus}
                      </span>
                    </div>

                    <Link
                      href={`/equipment/${booking.equipmentId}`}
                      className="inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-foreground hover:text-primary transition"
                    >
                      <span className="truncate">{booking.equipmentName}</span>
                      <ExternalLink className="size-3.5 shrink-0 opacity-70" />
                    </Link>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-primary" />
                        {formatDate(booking.startDate)} &rarr;{" "}
                        {formatDate(booking.endDate)} ({booking.durationDays}{" "}
                        days)
                      </span>

                      <span className="inline-flex items-center gap-1.5 font-mono">
                        <Package className="size-3.5 text-primary" />
                        Qty: {booking.requiredQuantity} unit(s)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Renter & Owner Parties */}
                <div className="lg:w-96 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 p-3.5 rounded-xl bg-muted/40 border border-border text-xs">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <User className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">
                        Renter: {booking.customerName || "Customer"}
                      </span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1.5 truncate">
                      <Mail className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{booking.customerEmail}</span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1.5">
                      <Phone className="size-3.5 text-primary shrink-0" />
                      <span className="font-mono">{booking.contactNumber}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/60 space-y-1">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <Store className="size-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">
                        Owner: {booking.ownerName || "Owner"}
                      </span>
                    </p>
                    <p className="text-muted-foreground flex items-start gap-1.5">
                      <MapPin className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="line-clamp-1">
                        {booking.deliveryAddress}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right: Amount & Booking ID */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-border shrink-0">
                  <div className="lg:text-right">
                    <span className="text-[11px] text-muted-foreground block">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-foreground font-mono">
                      ${Number(booking.totalAmount).toFixed(2)}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                    #{booking._id.slice(-8).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}