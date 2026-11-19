import { AlertCircle } from "lucide-react"
import { getAllPaymentsAdminApi } from "@/lib/services/getApi"
import type { ApiResponse, PaymentRecord } from "@/types"
import AdminPaymentsMonitor from "@/components/dashboard/Admin/AdminPaymentsMonitor"

export default async function AdminPaymentsPage() {
  let payments: PaymentRecord[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<PaymentRecord[]> = await getAllPaymentsAdminApi()
    if (response.success) {
      payments = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load payment records."
    }
  } catch (error) {
    console.error("Error fetching admin payments:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Payments &amp; Revenue Ledger
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Audit all verified Stripe transactions, booking receipts, and gross
          platform revenue.
        </p>
      </div>

      {errorMessage ? (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : (
        <AdminPaymentsMonitor initialPayments={payments} />
      )}
    </div>
  )
}