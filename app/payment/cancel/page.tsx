import Link from "next/link"
import { XCircle, ArrowLeft, ClipboardList } from "lucide-react"

export default function PaymentCancelPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-sm">
        <div className="size-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <XCircle className="size-9" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-foreground">
            Payment Cancelled
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your Stripe checkout session was cancelled and no charges were made.
            Your booking request is saved as unpaid—you can complete the payment
            anytime from your dashboard.
          </p>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard/customer/bookings"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
          >
            <ClipboardList className="size-4" />
            Go to My Bookings
          </Link>
          <Link
            href="/equipment"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition"
          >
            <ArrowLeft className="size-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    </div>
  )
}