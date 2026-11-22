import { Star, MessageSquareQuote, ShieldCheck } from "lucide-react"
import type { ReviewRecord } from "@/types"

interface EquipmentReviewsSectionProps {
  reviews: ReviewRecord[]
  averageRating: number
  totalReviews: number
}

export default function EquipmentReviewsSection({
  reviews,
  averageRating,
  totalReviews,
}: EquipmentReviewsSectionProps) {
  return (
    <section className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-2xs">
      {/* Header & Rating Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-base font-semibold text-foreground">
            <MessageSquareQuote className="size-5 text-primary" />
            <h2>Verified Renter Reviews</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Feedback submitted exclusively by renters who completed paid bookings.
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted/50 border border-border self-start sm:self-auto">
          <div className="flex items-center gap-1">
            <Star className="size-5 fill-amber-400 text-amber-400" />
            <span className="text-xl font-bold text-foreground font-mono">
              {totalReviews > 0 ? averageRating.toFixed(1) : "New"}
            </span>
          </div>
          <div className="h-6 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground">
            {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
          </span>
        </div>
      </div>

      {/* Reviews List or Empty State */}
      {reviews.length === 0 ? (
        <div className="py-10 text-center space-y-2 rounded-xl bg-muted/25 border border-dashed border-border px-4">
          <div className="flex justify-center gap-1 text-muted-foreground/40">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="size-4" />
            ))}
          </div>
          <p className="text-sm font-semibold text-foreground">
            No reviews yet for this equipment
          </p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Rent this item and complete your booking from your dashboard to be the
            first to share your experience.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => {
            const initials = (review.customerName || "VR")
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()

            const formattedDate = review.createdAt
              ? new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""

            return (
              <article
                key={review._id}
                className="p-4 rounded-xl bg-background/60 border border-border space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Row: Reviewer & Stars */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="size-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {review.customerName}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                          <ShieldCheck className="size-3" />
                          Verified Renter
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-3.5 ${
                            star <= review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                {formattedDate && (
                  <p className="text-[11px] text-muted-foreground/80 pt-2 border-t border-border/60">
                    Posted on {formattedDate}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}