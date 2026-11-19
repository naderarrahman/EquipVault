"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  Search,
  User,
  XCircle,
  ClipboardList,
  AlertTriangle,
  X,
  ExternalLink,
  CreditCard,
} from "lucide-react"
import { toast } from "sonner"
import { cancelMyBookingAction } from "@/actions/booking.actions"
import { createCheckoutSessionAction } from "@/actions/payment.actions"
import type { BookingRecord, BookingStatus } from "@/types"

interface CustomerBookingsManagerProps {
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

export default function CustomerBookingsManager({
  initialBookings,
}: CustomerBookingsManagerProps) {
  const router = useRouter()
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings)
  const [activeTab, setActiveTab] = useState<"all" | BookingStatus>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cancelTarget, setCancelTarget] = useState<BookingRecord | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)
  const [payingBookingId, setPayingBookingId] = useState<string | null>(null)

  // Summary metrics
  const stats = useMemo(() => {
    const total = bookings.length
    const pending = bookings.filter((b) => b.bookingStatus === "pending").length
    const active = bookings.filter((b) => b.bookingStatus === "approved").length
    const totalAmount = bookings
      .filter(
        (b) =>
          b.bookingStatus !== "cancelled" && b.bookingStatus !== "rejected"
      )
      .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0)

    return { total, pending, active, totalAmount }
  }, [bookings])

  // Filtered bookings list
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesTab =
        activeTab === "all" || booking.bookingStatus === activeTab

      const keyword = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !keyword ||
        booking.equipmentName.toLowerCase().includes(keyword) ||
        booking.ownerName.toLowerCase().includes(keyword) ||
        booking.deliveryAddress.toLowerCase().includes(keyword)

      return matchesTab && matchesSearch
    })
  }, [bookings, activeTab, searchQuery])

  const handlePayNow = async (bookingId: string) => {
    try {
      setPayingBookingId(bookingId)
      const checkoutRes = await createCheckoutSessionAction(bookingId)

      if (!checkoutRes.success || !checkoutRes.url) {
        toast.error(checkoutRes.message || "Could not start Stripe payment.")
        setPayingBookingId(null)
        return
      }

      const handlePayNow = async (bookingId: string) => {
    try {
      setPayingBookingId(bookingId)
      const checkoutRes = await createCheckoutSessionAction(bookingId)

      if (!checkoutRes.success || !checkoutRes.url) {
        toast.error(checkoutRes.message || "Could not start Stripe payment.")
        setPayingBookingId(null)
        return
      }

      window.location.assign(checkoutRes.url)
    } catch {
      toast.error("Something went wrong while initiating payment.")
      setPayingBookingId(null)
    }
  }
    } catch {
      toast.error("Something went wrong while initiating payment.")
      setPayingBookingId(null)
    }
  }

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return

    try {
      setIsCancelling(true)
      const res = await cancelMyBookingAction(cancelTarget._id)

      if (!res.success) {
        toast.error(res.message || "Could not cancel booking.")
        return
      }

      setBookings((prev) =>
        prev.map((item) =>
          item._id === cancelTarget._id
            ? { ...item, bookingStatus: "cancelled" }
            : item
        )
      )

      toast.success("Booking request cancelled.")
      setCancelTarget(null)
      router.refresh()
    } catch {
      toast.error("Something went wrong while cancelling.")
    } finally {
      setIsCancelling(false)
    }
  }

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
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Bookings
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
              Pending Approval
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
              Total Booking Value
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              ${stats.totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <DollarSign className="size-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {statusTabs.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
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

        <div className="relative w-full lg:w-72">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search equipment or owner..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 space-y-4 shadow-2xs">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <ClipboardList className="size-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">
              No bookings found
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {bookings.length === 0
                ? "You haven't booked any equipment yet. Browse the marketplace to rent machinery and tools."
                : "No bookings match your current filter or search query."}
            </p>
          </div>
          {bookings.length === 0 && (
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
            >
              Browse Equipment
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-primary/40 transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Equipment Info & Rental Dates */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
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

                {/* Middle: Owner & Delivery Details */}
                <div className="lg:w-80 p-3.5 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <User className="size-3.5 text-primary shrink-0" />
                    <span>Owner: {booking.ownerName || "Verified Owner"}</span>
                  </p>
                  {booking.ownerEmail && (
                    <p className="text-muted-foreground flex items-center gap-1.5 truncate">
                      <Mail className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{booking.ownerEmail}</span>
                    </p>
                  )}
                  <p className="text-muted-foreground flex items-center gap-1.5">
                    <Phone className="size-3.5 text-primary shrink-0" />
                    <span className="font-mono">{booking.contactNumber}</span>
                  </p>
                  <p className="text-muted-foreground flex items-start gap-1.5">
                    <MapPin className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      {booking.deliveryAddress}
                    </span>
                  </p>
                  {booking.additionalNotes && (
                    <p className="text-muted-foreground flex items-start gap-1.5 pt-1 border-t border-border/60">
                      <FileText className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="italic line-clamp-2">
                        &ldquo;{booking.additionalNotes}&rdquo;
                      </span>
                    </p>
                  )}
                </div>

                {/* Right: Total Amount, Pay Now & Cancel Action */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-border shrink-0">
                  <div className="lg:text-right">
                    <span className="text-[11px] text-muted-foreground block">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-foreground font-mono">
                      ${Number(booking.totalAmount).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {booking.paymentStatus === "unpaid" &&
                      booking.bookingStatus !== "cancelled" &&
                      booking.bookingStatus !== "rejected" && (
                        <button
                          type="button"
                          disabled={payingBookingId === booking._id}
                          onClick={() => handlePayNow(booking._id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold transition disabled:opacity-60 cursor-pointer shadow-2xs"
                        >
                          {payingBookingId === booking._id ? (
                            <>
                              <Loader2 className="size-3.5 animate-spin" />
                              Redirecting...
                            </>
                          ) : (
                            <>
                              <CreditCard className="size-3.5" />
                              Pay Now
                            </>
                          )}
                        </button>
                      )}

                    {booking.bookingStatus === "pending" && (
                      <button
                        type="button"
                        onClick={() => setCancelTarget(booking)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-destructive/40 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive text-xs font-semibold transition cursor-pointer"
                      >
                        <XCircle className="size-3.5" />
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Cancel Booking Request?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This will withdraw your pending rental request.
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => setCancelTarget(null)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to cancel your booking for{" "}
              <strong className="text-foreground">
                {cancelTarget.equipmentName}
              </strong>
              ?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => setCancelTarget(null)}
                className="px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs sm:text-sm font-medium text-foreground transition cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs sm:text-sm font-semibold hover:bg-destructive/90 transition disabled:opacity-60 cursor-pointer"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle className="size-4" />
                    Yes, Cancel Booking
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}