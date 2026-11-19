"use client"

import React, { useMemo, useState } from "react"
import { toast } from "sonner"
import {
  Heart,
  CalendarCheck,
  X,
  Loader2,
  Calculator,
  Phone,
  MapPin,
  FileText,
  Package,
} from "lucide-react"
import {
  createBookingAction,
  toggleFavoriteAction,
} from "@/actions/equipment.actions"
import type { Equipment } from "@/types"

interface EquipmentDetailsActionsProps {
  equipment: Equipment
  initialIsFavorite: boolean
}

export default function EquipmentDetailsActions({
  equipment,
  initialIsFavorite,
}: EquipmentDetailsActionsProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isTogglingFav, setIsTogglingFav] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [requiredQuantity, setRequiredQuantity] = useState("1")
  const [contactNumber, setContactNumber] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const isAvailable = equipment.availableQuantity > 0
  const todayStr = new Date().toISOString().split("T")[0]

  const pricingSummary = useMemo(() => {
    const qty = Math.max(1, Number(requiredQuantity) || 1)
    if (!startDate || !endDate) {
      return {
        durationDays: 0,
        billingUnits: 0,
        totalAmount: 0,
        isValidDates: false,
      }
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffMs = end.getTime() - start.getTime()

    if (Number.isNaN(diffMs) || diffMs <= 0) {
      return {
        durationDays: 0,
        billingUnits: 0,
        totalAmount: 0,
        isValidDates: false,
      }
    }

    const durationDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    let billingUnits = durationDays

    if (equipment.rentalType === "Weekly") {
      billingUnits = Math.ceil(durationDays / 7)
    } else if (equipment.rentalType === "Monthly") {
      billingUnits = Math.ceil(durationDays / 30)
    }

    const totalAmount = Number(
      (billingUnits * equipment.rentalPrice * qty).toFixed(2)
    )

    return {
      durationDays,
      billingUnits,
      totalAmount,
      isValidDates: true,
    }
  }, [
    startDate,
    endDate,
    requiredQuantity,
    equipment.rentalPrice,
    equipment.rentalType,
  ])

  const handleToggleFavorite = async () => {
    try {
      setIsTogglingFav(true)
      const res = await toggleFavoriteAction(equipment._id)
      if (!res.success) {
        toast.error(res.message || "Could not update favorites.")
        return
      }
      setIsFavorite(res.isFavorite)
      toast.success(
        res.isFavorite ? "Saved to your favorites!" : "Removed from favorites."
      )
    } catch {
      toast.error("Something went wrong.")
    } finally {
      setIsTogglingFav(false)
    }
  }

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!pricingSummary.isValidDates) {
      toast.error("Rental End Date must be after Start Date.")
      return
    }

    const qty = Number(requiredQuantity)
    if (qty < 1 || qty > equipment.availableQuantity) {
      toast.error(
        `Please enter a quantity between 1 and ${equipment.availableQuantity}.`
      )
      return
    }

    try {
      setIsSubmittingBooking(true)
      const response = await createBookingAction({
        equipmentId: equipment._id,
        startDate,
        endDate,
        requiredQuantity: qty,
        contactNumber: contactNumber.trim(),
        deliveryAddress: deliveryAddress.trim(),
        additionalNotes: additionalNotes.trim(),
      })

      if (!response.success) {
        toast.error(response.message || "Booking failed.")
        return
      }

      toast.success(
        `Booking request submitted ($${pricingSummary.totalAmount})!`
      )
      setIsModalOpen(false)
      setStartDate("")
      setEndDate("")
      setRequiredQuantity("1")
      setContactNumber("")
      setDeliveryAddress("")
      setAdditionalNotes("")
    } catch {
      toast.error("Failed to process booking request.")
    } finally {
      setIsSubmittingBooking(false)
    }
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!isAvailable}
            onClick={() => setIsModalOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <CalendarCheck className="size-4" />
            {isAvailable ? "Book Now" : "Out of Stock"}
          </button>

          <button
            type="button"
            disabled={isTogglingFav}
            onClick={handleToggleFavorite}
            aria-label="Add to favorites"
            className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-semibold transition cursor-pointer ${
              isFavorite
                ? "border-rose-500/40 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                : "border-border bg-background hover:bg-muted text-foreground"
            }`}
          >
            <Heart
              className={`size-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
            />
            <span className="hidden sm:inline">
              {isFavorite ? "Saved" : "Favorite"}
            </span>
          </button>
        </div>

        <p className="text-[11px] text-center text-muted-foreground">
          Instant availability verification before payment confirmation.
        </p>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Book Equipment
                </h3>
                <p className="text-xs text-muted-foreground truncate max-w-xs">
                  {equipment.name} (${equipment.rentalPrice}/{equipment.rentalType})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Rental Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    Rental End Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={startDate || todayStr}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    <span className="inline-flex items-center gap-1">
                      <Package className="size-3.5 text-primary" />
                      Required Quantity (Max: {equipment.availableQuantity}) *
                    </span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={equipment.availableQuantity}
                    value={requiredQuantity}
                    onChange={(e) => setRequiredQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="size-3.5 text-primary" />
                      Contact Number *
                    </span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5 text-primary" />
                    Delivery / Project Site Address *
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Full street address, area, and city"
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  <span className="inline-flex items-center gap-1">
                    <FileText className="size-3.5 text-primary" />
                    Additional Notes (Optional)
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Preferred delivery time, operator requirements, or special instructions..."
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Cost Summary Box */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    <Calculator className="size-3.5 text-primary" />
                    Rental Cost Breakdown
                  </span>
                  {pricingSummary.isValidDates && (
                    <span className="font-mono">
                      {pricingSummary.durationDays} day(s) &bull;{" "}
                      {pricingSummary.billingUnits} {equipment.rentalType} cycle(s)
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xs text-muted-foreground">
                    Total Rental Amount
                  </span>
                  <span className="text-2xl font-bold text-foreground font-mono">
                    ${pricingSummary.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingBooking || !pricingSummary.isValidDates}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmittingBooking ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}