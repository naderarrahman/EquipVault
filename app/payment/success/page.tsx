import Link from "next/link"
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Receipt,
  CalendarCheck,
  Hash,
  DollarSign,
} from "lucide-react"
import { verifyPaymentSessionAction } from "@/actions/payment.actions"

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
        <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertCircle className="size-7" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Invalid Payment Session
        </h1>
        <p className="text-sm text-muted-foreground">
          No Stripe session ID was found in the URL. Please check your bookings
          to confirm payment status.
        </p>
        <Link
          href="/dashboard/customer/bookings"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
        >
          Go to My Bookings
        </Link>
      </div>
    )
  }

  const verificationRes = await verifyPaymentSessionAction(session_id)

  if (!verificationRes.success || !verificationRes.data) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-4">
        <div className="size-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <AlertCircle className="size-7" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Payment Verification Pending
        </h1>
        <p className="text-sm text-muted-foreground">
          {verificationRes.message ||
            "We could not verify this payment session yet."}
        </p>
        <Link
          href="/dashboard/customer/bookings"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
        >
          Check My Bookings
        </Link>
      </div>
    )
  }

  const payment = verificationRes.data

  return (
    <div className="max-w-xl mx-auto px-4 py-14">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Success Icon & Title */}
        <div className="text-center space-y-2 border-b border-border pb-6">
          <div className="size-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="size-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Payment Successful!
          </h1>
          <p className="text-sm text-muted-foreground">
            Thank you, <strong className="text-foreground">{payment.customerName || "Renter"}</strong>. Your rental payment has been confirmed and recorded.
          </p>
        </div>

        {/* Receipt Details */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-border/60">
            <span className="text-muted-foreground inline-flex items-center gap-1.5">
              <Receipt className="size-4 text-primary" />
              Equipment
            </span>
            <span className="font-semibold text-foreground text-right">
              {payment.equipmentName}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border/60">
            <span className="text-muted-foreground inline-flex items-center gap-1.5">
              <DollarSign className="size-4 text-primary" />
              Amount Paid
            </span>
            <span className="text-lg font-bold font-mono text-emerald-500">
              ${Number(payment.amount).toFixed(2)} {payment.currency}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-border/60 gap-4">
            <span className="text-muted-foreground inline-flex items-center gap-1.5 shrink-0">
              <Hash className="size-4 text-primary" />
              Transaction ID
            </span>
            <code className="text-xs font-mono bg-muted px-2.5 py-1 rounded-lg text-foreground truncate">
              {payment.transactionId}
            </code>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground inline-flex items-center gap-1.5">
              <CalendarCheck className="size-4 text-primary" />
              Booking ID
            </span>
            <code className="text-xs font-mono text-foreground">
              {payment.bookingId}
            </code>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/customer/bookings"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition"
          >
            View My Bookings
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/equipment"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-medium text-sm transition"
          >
            Browse More
          </Link>
        </div>
      </div>
    </div>
  )
}