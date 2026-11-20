import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  Mail,
  MapPin,
  Package,
  ShieldAlert,
  Tag,
  User,
  Wrench,
  XCircle,
} from "lucide-react"
import { getAllEquipmentAdminApi } from "@/lib/services/getApi"

interface AdminEquipmentDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function AdminEquipmentDetailsPage({
  params,
}: AdminEquipmentDetailsPageProps) {
  const { id } = await params
  const equipmentRes = await getAllEquipmentAdminApi()
  const item = (equipmentRes.data ?? []).find((eq) => eq._id === id)

  if (!item) {
    notFound()
  }

  const status = (item.status || "pending").toLowerCase()

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Back Navigation (Keeps Admin inside Dashboard) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <Link
          href="/dashboard/admin/equipment"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition w-fit"
        >
          <ArrowLeft className="size-4" />
          Back to Equipment Moderation
        </Link>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border w-fit ${
            status === "approved"
              ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
              : status === "rejected"
                ? "bg-destructive/15 text-destructive border-destructive/30"
                : "bg-amber-500/15 text-amber-500 border-amber-500/30"
          }`}
        >
          {status === "approved" ? (
            <CheckCircle2 className="size-3.5" />
          ) : status === "rejected" ? (
            <XCircle className="size-3.5" />
          ) : (
            <Clock className="size-3.5" />
          )}
          Status: {status}
        </span>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image & Specifications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-muted border border-border shadow-2xs">
            <Image
              src={
                item.image ||
                "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000"
              }
              alt={item.name}
              fill
              unoptimized
              className="object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur-xs border border-border text-xs font-semibold text-foreground">
              {item.category}
            </span>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-5">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Equipment Overview &amp; Specifications
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                {item.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Tag className="size-3.5 text-primary" /> Brand
                </span>
                <p className="font-bold text-foreground text-sm">
                  {item.brand || "N/A"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Layers className="size-3.5 text-primary" /> Model
                </span>
                <p className="font-bold text-foreground text-sm">
                  {item.model || "N/A"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Wrench className="size-3.5 text-primary" /> Condition
                </span>
                <p className="font-bold text-foreground text-sm">
                  {item.condition || "Good"}
                </p>
              </div>
            </div>

            {item.terms && (
              <div className="pt-4 border-t border-border space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <FileText className="size-3.5 text-primary" />
                  Rental Terms &amp; Conditions
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3.5 rounded-xl border border-border/60">
                  {item.terms}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing, Stock, Owner Info & Admin Notice */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-5">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Package className="size-3.5" />
                {item.availableQuantity} unit(s) in stock
              </span>

              <h1 className="text-2xl font-bold text-foreground">
                {item.name}
              </h1>

              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary shrink-0" />
                {item.location}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border flex items-baseline justify-between">
              <div>
                <p className="text-[11px] uppercase font-semibold text-muted-foreground">
                  Rental Rate
                </p>
                <p className="text-3xl font-bold font-mono text-foreground mt-0.5">
                  ${item.rentalPrice}
                  <span className="text-sm font-sans font-normal text-muted-foreground">
                    {" "}
                    / {item.rentalType}
                  </span>
                </p>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {item.rentalType} Billing
              </span>
            </div>

            {/* Admin Moderation Notice (Replaces Book Now / Favorite) */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ShieldAlert className="size-4 text-primary" />
                Admin Moderation Preview Mode
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Booking and favorite actions are disabled for administrator
                accounts. Return to the moderation queue to approve, reject,
                edit, or delete this listing.
              </p>
              <Link
                href="/dashboard/admin/equipment"
                className="mt-2 inline-flex items-center justify-center w-full h-10 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition"
              >
                Return to Moderation Queue
              </Link>
            </div>

            {/* Owner Details */}
            <div className="pt-4 border-t border-border space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Submitted By Owner
              </p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/60">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <User className="size-5" />
                </div>
                <div className="min-w-0 text-xs space-y-0.5">
                  <p className="font-bold text-foreground truncate flex items-center gap-1.5">
                    <Building2 className="size-3.5 text-primary shrink-0" />
                    {item.ownerName || "Verified Owner"}
                  </p>
                  {item.ownerEmail && (
                    <p className="text-muted-foreground truncate flex items-center gap-1.5">
                      <Mail className="size-3.5 shrink-0" />
                      {item.ownerEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}