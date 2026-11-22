"use client"

import { useState } from "react"
import { Star, CheckCircle2 } from "lucide-react"
import ReviewModal from "./ReviewModal"

interface LeaveReviewButtonProps {
  booking: {
    _id: string
    equipmentId: string
    equipmentName?: string
    paymentStatus?: string
    bookingStatus?: string
    hasReviewed?: boolean
  }
}

export default function LeaveReviewButton({ booking }: LeaveReviewButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [reviewed, setReviewed] = useState(Boolean(booking.hasReviewed))

  const isEligible =
    booking.paymentStatus === "paid" || booking.bookingStatus === "completed"

  if (!isEligible) return null

  if (reviewed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold">
        <CheckCircle2 className="size-3.5" />
        Reviewed
      </span>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/25 transition cursor-pointer"
      >
        <Star className="size-3.5 fill-current" />
        Leave a Review
      </button>

      <ReviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={booking._id}
        equipmentId={booking.equipmentId}
        equipmentName={booking.equipmentName || "Rented Equipment"}
        onSuccess={() => setReviewed(true)}
      />
    </>
  )
}