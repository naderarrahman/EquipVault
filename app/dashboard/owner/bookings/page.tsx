import { AlertCircle } from "lucide-react"
import { getOwnerBookingsApi } from "@/lib/services/getApi"
import type { ApiResponse, BookingRecord } from "@/types"
import OwnerBookingsManager from "@/components/dashboard/owner/OwnerBookingsManager"

export default async function OwnerBookingsPage() {
  let bookings: BookingRecord[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<BookingRecord[]> = await getOwnerBookingsApi()
    if (response.success) {
      bookings = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load rental requests."
    }
  } catch (error) {
    console.error("Error fetching owner bookings:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Rental Requests &amp; Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review incoming booking requests, approve or reject rentals, and
          mark returned machinery as completed.
        </p>
      </div>

      {/* Error State */}
      {errorMessage ? (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : (
        <OwnerBookingsManager initialBookings={bookings} />
      )}
    </div>
  )
}