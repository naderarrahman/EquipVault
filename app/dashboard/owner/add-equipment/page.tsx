"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Upload,
  Link2,
  Loader2,
  PlusCircle,
  Package,
  DollarSign,
  MapPin,
  FileText,
  ImageIcon,
} from "lucide-react"
import { uploadImageToImgBB } from "@/lib/imgbb"
import type {
  EquipmentCategory,
  EquipmentFormValues,
  RentalType,
} from "@/types"
import { postEquipmentAction } from "@/actions/equipment.actions"

const categories: EquipmentCategory[] = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
]

const rentalTypes: RentalType[] = ["Daily", "Weekly", "Monthly"]

const conditionOptions = [
  "Brand New",
  "Like New",
  "Good",
  "Heavy-Duty Working",
]

const initialFormState: EquipmentFormValues = {
  name: "",
  description: "",
  category: "Construction Equipment",
  location: "",
  rentalPrice: "",
  rentalType: "Daily",
  availableQuantity: "1",
  condition: "Like New",
  brand: "",
  model: "",
  imageUrl: "",
  terms: "Valid government ID required at pickup. Refundable security deposit applies.",
}

export default function AddEquipmentPage() {
  const router = useRouter()
  const [formValues, setFormValues] = useState<EquipmentFormValues>(initialFormState)

  const [imageMode, setImageMode] = useState<"upload" | "url">("upload")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Single handler to update any field inside formValues object
  const handleInputChange = (
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

  // Handle local image selection & preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WebP).")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB.")
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  // Handle form submission and send payload via Server Action
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Number(formValues.rentalPrice) <= 0) {
      toast.error("Rental price must be greater than 0.")
      return
    }

    if (Number(formValues.availableQuantity) < 1) {
      toast.error("Available quantity must be at least 1.")
      return
    }

    if (imageMode === "upload" && !imageFile) {
      toast.error("Please select an equipment image or switch to Direct URL.")
      return
    }

    if (imageMode === "url" && !formValues.imageUrl.trim()) {
      toast.error("Please enter a valid equipment image URL.")
      return
    }

    try {
      setIsSubmitting(true)

      let finalImageUrl = formValues.imageUrl.trim()
      if (imageMode === "upload" && imageFile) {
        finalImageUrl = await uploadImageToImgBB(imageFile)
      }

      const equipmentPayload = {
        name: formValues.name.trim(),
        description: formValues.description.trim(),
        category: formValues.category,
        location: formValues.location.trim(),
        rentalPrice: Number(formValues.rentalPrice),
        rentalType: formValues.rentalType,
        availableQuantity: Number(formValues.availableQuantity),
        condition: formValues.condition,
        brand: formValues.brand.trim(),
        model: formValues.model.trim(),
        image: finalImageUrl,
        terms: formValues.terms.trim(),
      }

      console.log("Submitting Equipment Payload Object:", equipmentPayload)

      // Call Server Action
      const data = await postEquipmentAction(equipmentPayload)

      if (!data.success) {
        toast.error(data.message || "Failed to submit equipment.")
        return
      }

      toast.success("Equipment listed successfully! Pending admin approval.")
      
      // Reset form & redirect
      setFormValues(initialFormState)
      setImageFile(null)
      setImagePreview("")
      router.push("/dashboard/owner/my-equipment")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to process equipment form."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Add New Equipment
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill in the specifications below to list your equipment for rent on EquipVault.
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xs space-y-7"
      >
        {/* Section 1: Basic Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Package className="size-4" />
            <span>1. Basic Equipment Information</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                Equipment Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="e.g. Caterpillar 320 Hydraulic Excavator"
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1.5">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formValues.category}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-foreground mb-1.5">
                Condition *
              </label>
              <select
                id="condition"
                name="condition"
                value={formValues.condition}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {conditionOptions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-foreground mb-1.5">
                Brand *
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                required
                value={formValues.brand}
                onChange={handleInputChange}
                placeholder="e.g. Caterpillar / Sony / Honda"
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="model" className="block text-sm font-medium text-foreground mb-1.5">
                Model *
              </label>
              <input
                id="model"
                name="model"
                type="text"
                required
                value={formValues.model}
                onChange={handleInputChange}
                placeholder="e.g. CAT-320GC / FX6"
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing, Stock & Location */}
        <div className="space-y-4 pt-5 border-t border-border">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <DollarSign className="size-4" />
            <span>2. Rental Pricing, Stock &amp; Location</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="rentalPrice"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Rental Price ($) *
              </label>
              <input
                id="rentalPrice"
                name="rentalPrice"
                type="number"
                min="1"
                step="0.01"
                required
                value={formValues.rentalPrice}
                onChange={handleInputChange}
                placeholder="e.g. 120"
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label
                htmlFor="rentalType"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Billing Cycle *
              </label>
              <select
                id="rentalType"
                name="rentalType"
                value={formValues.rentalType}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {rentalTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="availableQuantity"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Available Units *
              </label>
              <input
                id="availableQuantity"
                name="availableQuantity"
                type="number"
                min="1"
                required
                value={formValues.availableQuantity}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1.5">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-muted-foreground" />
                Pickup / Warehouse Location *
              </span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={formValues.location}
              onChange={handleInputChange}
              placeholder="e.g. Tejgaon Industrial Area, Dhaka"
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Section 3: Equipment Photo */}
        <div className="space-y-3 pt-5 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <ImageIcon className="size-4" />
              <span>3. Equipment Photo *</span>
            </div>

            <div className="inline-flex rounded-lg border border-border p-0.5 bg-muted/60 text-xs">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition cursor-pointer ${
                  imageMode === "upload"
                    ? "bg-background text-foreground shadow-2xs font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Upload className="size-3" /> Upload (ImgBB)
              </button>
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition cursor-pointer ${
                  imageMode === "url"
                    ? "bg-background text-foreground shadow-2xs font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Link2 className="size-3" /> Direct URL
              </button>
            </div>
          </div>

          {imageMode === "upload" ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-dashed border-input bg-background hover:bg-muted/40 text-sm text-muted-foreground cursor-pointer transition">
                <Upload className="size-4 text-primary" />
                <span className="truncate">
                  {imageFile ? imageFile.name : "Choose image file (JPG, PNG, WebP — Max 5MB)"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Equipment preview"
                  width={88}
                  height={64}
                  unoptimized
                  className="w-22 h-16 rounded-xl object-cover border border-border shrink-0"
                />
              )}
            </div>
          ) : (
            <input
              name="imageUrl"
              type="url"
              value={formValues.imageUrl}
              onChange={handleInputChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          )}
        </div>

        {/* Section 4: Description & Rental Terms */}
        <div className="space-y-4 pt-5 border-t border-border">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <FileText className="size-4" />
            <span>4. Specifications &amp; Terms</span>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Detailed Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={formValues.description}
              onChange={handleInputChange}
              placeholder="Describe capacity, power specs, included accessories, and ideal projects..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label htmlFor="terms" className="block text-sm font-medium text-foreground mb-1.5">
              Rental Terms &amp; Conditions *
            </label>
            <textarea
              id="terms"
              name="terms"
              rows={2}
              required
              value={formValues.terms}
              onChange={handleInputChange}
              placeholder="Deposit rules, fuel policy, late return fees..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting to Database...
              </>
            ) : (
              <>
                <PlusCircle className="size-4" />
                Submit Equipment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}