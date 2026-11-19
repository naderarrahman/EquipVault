import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  PackageCheck,
  Tag,
  FileText,
  AlertCircle,
  Layers,
  CheckCircle2,
  Clock,
  XCircle,
  Edit3,
  CalendarDays,
  ClipboardList,
} from "lucide-react"
import { getSingleEquipmentApi } from "@/lib/services/getApi"
import DeleteEquipmentButton from "@/components/ProductCard/DeleteEquipmentButton"

interface OwnerEquipmentDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function OwnerEquipmentDetailsPage({
  params,
}: OwnerEquipmentDetailsPageProps) {
  const { id } = await params
  const response = await getSingleEquipmentApi(id)

  if (!response.success || !response.data) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertCircle className="size-7" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Equipment Not Found
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {response.message ||
            "This equipment listing could not be found in your inventory."}
        </p>
        <Link
          href="/dashboard/owner/my-equipment"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
        >
          <ArrowLeft className="size-4" />
          Back to My Inventory
        </Link>
      </div>
    )
  }

  const equipment = response.data
  const status = equipment.status?.toLowerCase() || "pending"
  const isApproved = status === "approved"
  const isRejected = status === "rejected"
  const isAvailable = equipment.availableQuantity > 0

  const listedDate = equipment.createdAt
    ? new Date(equipment.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recently added"

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <Link
          href="/dashboard/owner/my-equipment"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="size-4" />
          Back to My Equipment Inventory
        </Link>

        <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-lg">
          ID: {equipment._id}
        </span>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image, Specifications & Terms (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Fixed-height Image Container */}
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-border bg-muted shadow-2xs">
            <Image
              src={
                equipment.image ||
                "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
              }
              alt={equipment.name}
              fill
              unoptimized
              priority
              className="object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-background/85 backdrop-blur-md text-foreground text-xs font-semibold border border-border">
              {equipment.category}
            </span>
          </div>

          {/* Description & Technical Specs */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5 shadow-2xs">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                Equipment Overview &amp; Specifications
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {equipment.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Tag className="size-3.5 text-primary" /> Brand
                </span>
                <p className="text-sm font-semibold text-foreground">
                  {equipment.brand}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Layers className="size-3.5 text-primary" /> Model
                </span>
                <p className="text-sm font-semibold text-foreground font-mono">
                  {equipment.model}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-primary" /> Condition
                </span>
                <p className="text-sm font-semibold text-foreground">
                  {equipment.condition}
                </p>
              </div>
            </div>
          </div>

          {/* Rental Terms & Conditions */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="size-4 text-primary" />
              <h3>Rental Terms &amp; Conditions</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {equipment.terms}
            </p>
          </div>
        </div>

        {/* Right Column: Owner Status, Inventory Metrics & Management Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-2xs">
            {/* Approval Status Banner */}
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                isApproved
                  ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400"
                  : isRejected
                  ? "bg-destructive/10 border-destructive/25 text-destructive"
                  : "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400"
              }`}
            >
              {isApproved ? (
                <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
              ) : isRejected ? (
                <XCircle className="size-5 shrink-0 mt-0.5" />
              ) : (
                <Clock className="size-5 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <p className="text-xs font-bold uppercase tracking-wider">
                  Status: {status}
                </p>
                <p className="text-xs opacity-90">
                  {isApproved
                    ? "Live on the public marketplace and visible to renters."
                    : isRejected
                    ? "This listing was rejected by an administrator."
                    : "Awaiting admin approval before appearing in public search."}
                </p>
              </div>
            </div>

            {/* Title & Location */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {equipment.name}
              </h1>

              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>{equipment.location}</span>
              </p>
            </div>

            {/* Pricing & Stock Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-muted/40 border border-border">
                <span className="text-xs text-muted-foreground block">
                  Rental Rate
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-foreground font-mono">
                    ${equipment.rentalPrice}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / {equipment.rentalType}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border">
                <span className="text-xs text-muted-foreground block">
                  Available Stock
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <PackageCheck
                    className={`size-4 ${
                      isAvailable ? "text-emerald-500" : "text-destructive"
                    }`}
                  />
                  <span className="text-2xl font-bold text-foreground font-mono">
                    {equipment.availableQuantity}
                  </span>
                  <span className="text-xs text-muted-foreground">units</span>
                </div>
              </div>
            </div>

            {/* Metadata Info */}
            <div className="pt-4 border-t border-border space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 text-primary" />
                  Listed Date
                </span>
                <span className="font-medium text-foreground">{listedDate}</span>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span>Billing Cycle</span>
                <span className="font-mono font-medium text-foreground">
                  {equipment.rentalType}
                </span>
              </div>
            </div>

            {/* Owner Management Actions (No Book Now / No Favorite) */}
            <div className="pt-5 border-t border-border space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Manage Listing
              </h3>

              <Link
                href={`/dashboard/owner/edit-equipment/${equipment._id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs"
              >
                <Edit3 className="size-4" />
                Edit Equipment Details
              </Link>

              <Link
                href="/dashboard/owner/bookings"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-medium text-sm transition"
              >
                <ClipboardList className="size-4 text-primary" />
                View Rental Requests
              </Link>

              <DeleteEquipmentButton
                equipmentId={equipment._id}
                equipmentName={equipment.name}
                redirectTo="/dashboard/owner/my-equipment"
                showLabel={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}