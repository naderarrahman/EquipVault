"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import { toast } from "sonner"
import { updateEquipmentAction } from "@/actions/equipment.actions"
import type {
  Equipment,
  EquipmentCategory,
  EquipmentFormValues,
  RentalType,
} from "@/types"

const categories: EquipmentCategory[] = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
]

const rentalTypes: RentalType[] = ["Daily", "Weekly", "Monthly"]

interface EditEquipmentFormProps {
  equipment: Equipment
}

export default function EditEquipmentForm({
  equipment,
}: EditEquipmentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formValues, setFormValues] = useState<EquipmentFormValues>({
    name: equipment.name,
    description: equipment.description,
    category: equipment.category,
    location: equipment.location,
    rentalPrice: String(equipment.rentalPrice),
    rentalType: equipment.rentalType,
    availableQuantity: String(equipment.availableQuantity),
    condition: equipment.condition,
    brand: equipment.brand,
    model: equipment.model,
    imageUrl: equipment.image,
    terms: equipment.terms,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const parsedPrice = Number(formValues.rentalPrice)
    const parsedQuantity = Number(formValues.availableQuantity)

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Please enter a valid rental price greater than 0.")
      return
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
      toast.error("Available quantity must be 0 or greater.")
      return
    }

    try {
      setIsSubmitting(true)
      const res = await updateEquipmentAction(equipment._id, {
        name: formValues.name.trim(),
        description: formValues.description.trim(),
        category: formValues.category,
        location: formValues.location.trim(),
        rentalPrice: parsedPrice,
        rentalType: formValues.rentalType,
        availableQuantity: parsedQuantity,
        condition: formValues.condition.trim(),
        brand: formValues.brand.trim(),
        model: formValues.model.trim(),
        image: formValues.imageUrl.trim(),
        terms: formValues.terms.trim(),
      })

      if (!res.success) {
        toast.error(res.message || "Failed to update equipment.")
        return
      }

      toast.success("Equipment updated successfully!")
      router.push("/dashboard/owner/my-equipment")
      router.refresh()
    } catch {
      toast.error("Something went wrong while updating.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <Link
            href="/dashboard/owner/my-equipment"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition mb-2"
          >
            <ArrowLeft className="size-3.5" />
            Back to My Equipment
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Edit Equipment Listing
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Update pricing, stock availability, or technical specifications.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Equipment Name */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Equipment Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formValues.name}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formValues.category}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Brand *
            </label>
            <input
              type="text"
              name="brand"
              required
              value={formValues.brand}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Model *
            </label>
            <input
              type="text"
              name="model"
              required
              value={formValues.model}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Rental Price */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Rental Price ($) *
            </label>
            <input
              type="number"
              name="rentalPrice"
              required
              min="1"
              step="any"
              value={formValues.rentalPrice}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Rental Type */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Rental Type *
            </label>
            <select
              name="rentalType"
              value={formValues.rentalType}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {rentalTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Available Quantity */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Available Quantity *
            </label>
            <input
              type="number"
              name="availableQuantity"
              required
              min="0"
              value={formValues.availableQuantity}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Condition *
            </label>
            <input
              type="text"
              name="condition"
              required
              value={formValues.condition}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Location *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formValues.location}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Equipment Image URL *
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              value={formValues.imageUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows={4}
            value={formValues.description}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Rental Terms */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Rental Terms &amp; Conditions *
          </label>
          <textarea
            name="terms"
            required
            rows={3}
            value={formValues.terms}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Link
            href="/dashboard/owner/my-equipment"
            className="px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}