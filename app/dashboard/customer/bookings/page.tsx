import Link from "next/link"
import { Compass, AlertCircle } from "lucide-react"
import { getMyBookingsApi } from "@/lib/services/getApi"
import type { ApiResponse, BookingRecord } from "@/types"
import CustomerBookingsManager from "@/components/dashboard/Customer/CustomerBookingsManager"

export default async function CustomerBookingsPage() {
  let bookings: BookingRecord[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<BookingRecord[]> = await getMyBookingsApi()
    if (response.success) {
      bookings = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load your bookings."
    }
  } catch (error) {
    console.error("Error fetching customer bookings:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Rental Bookings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your equipment rental requests, check approval statuses, and
            manage active bookings.
          </p>
        </div>

        <Link
          href="/equipment"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs"
        >
          <Compass className="size-4" />
          Rent More Equipment
        </Link>
      </div>

      {/* Error State */}
      {errorMessage ? (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : (
        <CustomerBookingsManager initialBookings={bookings} />
      )}
    </div>
  )
}