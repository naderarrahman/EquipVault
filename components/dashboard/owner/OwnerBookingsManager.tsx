"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
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
  CheckCheck,
  ClipboardList,
} from "lucide-react"
import { toast } from "sonner"

import type { BookingRecord, BookingStatus } from "@/types"
import { OwnerBookingActionStatus, updateBookingStatusAction } from "@/actions/booking.actions"

interface OwnerBookingsManagerProps {
  initialBookings: BookingRecord[]
}

const statusTabs: Array<{ label: string; value: "all" | BookingStatus }> = [
  { label: "All Requests", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved (Active)", value: "approved" },
  { label: "Completed", value: "completed" },
  { label: "Rejected", value: "rejected" },
]

export default function OwnerBookingsManager({
  initialBookings,
}: OwnerBookingsManagerProps) {
  const router = useRouter()
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings)
  const [activeTab, setActiveTab] = useState<"all" | BookingStatus>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  // Summary metrics
  const stats = useMemo(() => {
    const total = bookings.length
    const pending = bookings.filter((b) => b.bookingStatus === "pending").length
    const active = bookings.filter((b) => b.bookingStatus === "approved").length
    const earnings = bookings
      .filter(
        (b) =>
          b.bookingStatus === "approved" || b.bookingStatus === "completed"
      )
      .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0)

    return { total, pending, active, earnings }
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
        booking.customerName.toLowerCase().includes(keyword) ||
        booking.customerEmail.toLowerCase().includes(keyword) ||
        booking.deliveryAddress.toLowerCase().includes(keyword)

      return matchesTab && matchesSearch
    })
  }, [bookings, activeTab, searchQuery])

  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: OwnerBookingActionStatus
  ) => {
    try {
      setUpdatingId(bookingId)
      const res = await updateBookingStatusAction(bookingId, newStatus)

      if (!res.success) {
        toast.error(res.message || "Could not update rental status.")
        return
      }

      setBookings((prev) =>
        prev.map((item) =>
          item._id === bookingId
            ? { ...item, bookingStatus: newStatus }
            : item
        )
      )

      const successMessages: Record<OwnerBookingActionStatus, string> = {
        approved: "Rental request approved & stock updated!",
        rejected: "Rental request rejected.",
        completed: "Rental marked as completed & stock restored!",
      }

      toast.success(successMessages[newStatus])
      router.refresh()
    } catch {
      toast.error("Something went wrong while updating status.")
    } finally {
      setUpdatingId(null)
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
      {/* Top KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Requests
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
              Approved Revenue
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              ${stats.earnings.toFixed(2)}
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
            placeholder="Search equipment or renter..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 space-y-3 shadow-2xs">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <ClipboardList className="size-7" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No rental requests found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {bookings.length === 0
              ? "When customers book your listed equipment, their rental requests will appear here for approval."
              : "No rental requests match your selected filter or search query."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const isUpdating = updatingId === booking._id

            return (
              <div
                key={booking._id}
                className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-primary/40 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Equipment & Rental Duration */}
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

                      <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                        {booking.equipmentName}
                      </h3>

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

                  {/* Middle: Customer & Delivery Info */}
                  <div className="lg:w-80 p-3.5 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <User className="size-3.5 text-primary shrink-0" />
                      <span>{booking.customerName || "Renter"}</span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1.5 truncate">
                      <Mail className="size-3.5 text-primary shrink-0" />
                      <span className="truncate">{booking.customerEmail}</span>
                    </p>
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

                  {/* Right: Total Amount & Action Buttons */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-border shrink-0">
                    <div className="lg:text-right">
                      <span className="text-[11px] text-muted-foreground block">
                        Total Rental Amount
                      </span>
                      <span className="text-2xl font-bold text-foreground font-mono">
                        ${Number(booking.totalAmount).toFixed(2)}
                      </span>
                    </div>

                    {/* Action Controls */}
                    {booking.bookingStatus === "pending" && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusUpdate(booking._id, "approved")
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition disabled:opacity-60 cursor-pointer"
                        >
                          {isUpdating ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="size-3.5" />
                          )}
                          Approve
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusUpdate(booking._id, "rejected")
                          }
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-destructive/40 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive text-xs font-semibold transition disabled:opacity-60 cursor-pointer"
                        >
                          <XCircle className="size-3.5" />
                          Reject
                        </button>
                      </div>
                    )}

                    {booking.bookingStatus === "approved" && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusUpdate(booking._id, "completed")
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold transition disabled:opacity-60 cursor-pointer"
                      >
                        {isUpdating ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <CheckCheck className="size-3.5" />
                        )}
                        Mark Returned / Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}