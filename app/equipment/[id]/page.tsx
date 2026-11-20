import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  PackageCheck,
  Tag,
  User,
  Mail,
  FileText,
  AlertCircle,
  Layers,
} from "lucide-react"
import { checkFavoriteApi, getSingleEquipmentApi } from "@/lib/services/getApi"
import {
  EquipmentPrivateRouteGuard,
  RoleAwareEquipmentActions,
} from "@/components/ProductCard/EquipmentDetailsRoleGuard"

interface EquipmentDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function EquipmentDetailsPage({
  params,
}: EquipmentDetailsPageProps) {
  const { id } = await params

  const [response, favoriteRes] = await Promise.all([
    getSingleEquipmentApi(id),
    checkFavoriteApi(id),
  ])

  if (!response.success || !response.data) {
    return (
      <EquipmentPrivateRouteGuard>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
          <div className="size-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <AlertCircle className="size-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Equipment Not Found
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {response.message ||
              "The equipment listing you are looking for does not exist or may have been removed."}
          </p>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
          >
            <ArrowLeft className="size-4" />
            Back to Marketplace
          </Link>
        </div>
      </EquipmentPrivateRouteGuard>
    )
  }

  const equipment = response.data
  const isAvailable = equipment.availableQuantity > 0

  return (
    <EquipmentPrivateRouteGuard>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Top Navigation */}
        <div className="border-b border-border pb-4">
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="size-4" />
            Back to All Equipment
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image, Specs & Terms (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
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

            {/* Overview & Technical Specifications */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-2xs">
              <h2 className="text-lg font-semibold text-foreground">
                Equipment Overview &amp; Specifications
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {equipment.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Tag className="size-3.5 text-primary" /> Brand
                  </span>
                  <p className="text-sm font-semibold text-foreground">
                    {equipment.brand}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Layers className="size-3.5 text-primary" /> Model
                  </span>
                  <p className="text-sm font-semibold text-foreground font-mono">
                    {equipment.model}
                  </p>
                </div>

                <div className="space-y-1">
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

          {/* Right Column: Pricing, Role-Aware Actions & Owner Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-2xs">
              <div className="space-y-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    isAvailable
                      ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/25"
                      : "bg-destructive/15 text-destructive border border-destructive/25"
                  }`}
                >
                  <PackageCheck className="size-3.5" />
                  {isAvailable
                    ? `In Stock (${equipment.availableQuantity} available)`
                    : "Currently Out of Stock"}
                </span>

                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {equipment.name}
                </h1>

                <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>{equipment.location}</span>
                </p>
              </div>

              {/* Pricing Box */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Rental Rate
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-bold text-foreground font-mono">
                      ${equipment.rentalPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {equipment.rentalType}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {equipment.rentalType} Billing
                </span>
              </div>

              {/* Role-Aware Favorites & Booking Actions */}
              <RoleAwareEquipmentActions
                equipment={equipment}
                initialIsFavorite={favoriteRes.isFavorite}
              />

              {/* Owner Information */}
              <div className="pt-5 border-t border-border space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Listed By Verified Owner
                </h3>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    <User className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {equipment.ownerName || "Verified EquipVault Owner"}
                    </p>
                    {equipment.ownerEmail && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                        <Mail className="size-3 shrink-0" />
                        <span>{equipment.ownerEmail}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EquipmentPrivateRouteGuard>
  )
}