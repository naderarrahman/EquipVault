import { AlertCircle } from "lucide-react"
import { getAllBookingsAdminApi } from "@/lib/services/getApi"
import type { ApiResponse, BookingRecord } from "@/types"
import AdminBookingsMonitor from "@/components/dashboard/Admin/AdminBookingsMonitor"

export default async function AdminAllBookingsPage() {
  let bookings: BookingRecord[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<BookingRecord[]> = await getAllBookingsAdminApi()
    if (response.success) {
      bookings = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load platform bookings."
    }
  } catch (error) {
    console.error("Error fetching admin bookings:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          All Platform Bookings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor every rental request, active lease, and payment status across
          the entire marketplace.
        </p>
      </div>

      {errorMessage ? (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : (
        <AdminBookingsMonitor initialBookings={bookings} />
      )}
    </div>
  )
}