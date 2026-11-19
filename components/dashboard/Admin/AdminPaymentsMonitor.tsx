"use client"

import { useMemo, useState } from "react"
import {
  CheckCircle2,
  CreditCard,
  DollarSign,
  Hash,
  Receipt,
  Search,
  Users,
} from "lucide-react"
import type { PaymentRecord } from "@/types"

interface AdminPaymentsMonitorProps {
  initialPayments: PaymentRecord[]
}

export default function AdminPaymentsMonitor({
  initialPayments,
}: AdminPaymentsMonitorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const stats = useMemo(() => {
    const succeeded = initialPayments.filter((p) => p.status === "succeeded")
    const totalRevenue = succeeded.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0
    )
    const uniqueCustomers = new Set(
      initialPayments.map((p) => p.customerEmail || p.customerId)
    ).size
    const averageOrder =
      succeeded.length > 0 ? totalRevenue / succeeded.length : 0

    return {
      totalRevenue,
      totalTransactions: initialPayments.length,
      uniqueCustomers,
      averageOrder,
    }
  }, [initialPayments])

  const filteredPayments = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()
    if (!keyword) return initialPayments

    return initialPayments.filter(
      (payment) =>
        payment.equipmentName.toLowerCase().includes(keyword) ||
        payment.customerName.toLowerCase().includes(keyword) ||
        payment.customerEmail.toLowerCase().includes(keyword) ||
        payment.ownerName.toLowerCase().includes(keyword) ||
        payment.transactionId.toLowerCase().includes(keyword)
    )
  }, [initialPayments, searchQuery])

  const formatDate = (dateStr: string) => {
    const parsed = new Date(dateStr)
    if (Number.isNaN(parsed.getTime())) return dateStr
    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Verified Revenue
            </p>
            <p className="text-2xl font-bold text-emerald-500 font-mono mt-1">
              ${stats.totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <DollarSign className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Transactions
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              {stats.totalTransactions}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <CreditCard className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Average Transaction
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              ${stats.averageOrder.toFixed(2)}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Receipt className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Paying Customers
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              {stats.uniqueCustomers}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Users className="size-5" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-medium text-muted-foreground">
          Showing{" "}
          <strong className="text-foreground">{filteredPayments.length}</strong>{" "}
          Stripe payment record(s)
        </p>

        <div className="relative w-full sm:w-80">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transaction ID, equipment, or user..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Transactions Table */}
      {filteredPayments.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 space-y-3 shadow-2xs">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <CreditCard className="size-7" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No payment transactions found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {initialPayments.length === 0
              ? "Verified Stripe checkout payments will appear here once customers complete a rental payment."
              : "No transactions match your search query."}
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3.5 px-5">Transaction ID</th>
                  <th className="py-3.5 px-5">Equipment</th>
                  <th className="py-3.5 px-5">Customer</th>
                  <th className="py-3.5 px-5">Owner</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-muted/20 transition"
                  >
                    <td className="py-4 px-5">
                      <code className="inline-flex items-center gap-1 text-xs font-mono bg-muted px-2.5 py-1 rounded-lg text-foreground max-w-[180px] truncate">
                        <Hash className="size-3 text-primary shrink-0" />
                        <span className="truncate">
                          {payment.transactionId}
                        </span>
                      </code>
                    </td>

                    <td className="py-4 px-5 font-semibold text-foreground max-w-[200px] truncate">
                      {payment.equipmentName}
                    </td>

                    <td className="py-4 px-5">
                      <p className="font-medium text-foreground text-xs">
                        {payment.customerName || "Renter"}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                        {payment.customerEmail}
                      </p>
                    </td>

                    <td className="py-4 px-5 text-xs text-muted-foreground">
                      {payment.ownerName || "Owner"}
                    </td>

                    <td className="py-4 px-5 text-xs text-muted-foreground font-mono whitespace-nowrap">
                      {formatDate(payment.createdAt)}
                    </td>

                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                        <CheckCircle2 className="size-3" />
                        {payment.status}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right font-mono font-bold text-foreground whitespace-nowrap">
                      ${Number(payment.amount).toFixed(2)}{" "}
                      <span className="text-[11px] font-normal text-muted-foreground">
                        {payment.currency || "USD"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}