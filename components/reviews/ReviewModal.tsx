"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Star, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { submitReviewAction } from "@/actions/reviewActions"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  bookingId: string
  equipmentId: string
  equipmentName: string
  onSuccess?: () => void
}

const RATING_LABELS: Record<number, string> = {
  1: "Poor — Did not meet expectations",
  2: "Fair — Had noticeable issues",
  3: "Good — Worked as expected",
  4: "Very Good — Great condition & service",
  5: "Excellent — Top-notch equipment & smooth rental!",
}

export default function ReviewModal({
  isOpen,
  onClose,
  bookingId,
  equipmentId,
  equipmentName,
  onSuccess,
}: ReviewModalProps) {
  const router = useRouter()
  const [rating, setRating] = useState<number>(5)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [comment, setComment] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  if (!isOpen) return null

  const activeRating = hoveredRating || rating

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (comment.trim().length < 5) {
      setError("Please write at least 5 characters about your rental experience.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await submitReviewAction({
        bookingId,
        equipmentId,
        rating,
        comment: comment.trim(),
      })

      if (!response.success) {
        setError(response.message || "Could not submit your review.")
        return
      }

      setSubmitted(true)
      router.refresh()
      onSuccess?.()

      setTimeout(() => {
        setSubmitted(false)
        setComment("")
        onClose()
      }, 1200)
    } catch {
      setError("Network error while submitting review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b border-border">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Verified Renter Review
            </span>
            <h2 className="text-lg font-bold text-foreground mt-0.5 line-clamp-1">
              {equipmentName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="size-12 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              Review Published!
            </h3>
            <p className="text-sm text-muted-foreground">
              Thank you for helping other renters on EquipVault.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {/* Star Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Overall Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((starValue) => {
                  const isFilled = starValue <= activeRating
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 rounded-lg transition-transform hover:scale-110 focus:outline-none"
                      aria-label={`Rate ${starValue} out of 5 stars`}
                    >
                      <Star
                        className={`size-7 transition-colors ${
                          isFilled
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
              <p className="text-xs font-medium text-primary">
                {RATING_LABELS[activeRating]}
              </p>
            </div>

            {/* Review Comment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="review-comment"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Your Experience
                </label>
                <span className="text-xs text-muted-foreground font-mono">
                  {comment.length}/400
                </span>
              </div>
              <textarea
                id="review-comment"
                rows={4}
                maxLength={400}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share how the equipment performed, handover smoothness, and overall condition..."
                className="w-full rounded-xl bg-background border border-border px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 transition"
              >
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {isSubmitting ? "Publishing..." : "Submit Review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}