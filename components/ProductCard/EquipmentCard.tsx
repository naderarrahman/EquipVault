"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  MapPin,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Edit3,
  ArrowUpRight,
  Star,
  ShieldCheck,
  Sparkles,
  Layers,
} from "lucide-react"
import DeleteEquipmentButton from "./DeleteEquipmentButton"
import RemoveFavoriteButton from "./RemoveFavoriteButton"
import type { Equipment } from "@/types"

interface EquipmentCardProps {
  item: Equipment
  showStatus?: boolean
  detailsHref?: string
  editHref?: string
  showDelete?: boolean
  showUnfavorite?: boolean
}

export default function EquipmentCard({
  item,
  showStatus = false,
  detailsHref,
  editHref,
  showDelete = false,
  showUnfavorite = false,
}: EquipmentCardProps) {
  const statusLower = item.status?.toLowerCase()
  const isApproved = statusLower === "approved"
  const isRejected = statusLower === "rejected"
  const viewLink = detailsHref || `/equipment/${item._id}`

  const isAvailable = (item.availableQuantity ?? 0) > 0
  const hasRating =
    typeof item.averageRating === "number" && item.averageRating > 0
  const hasManagementActions = Boolean(
    editHref || showDelete || showUnfavorite
  )

  const isLikeNew =
    item.condition?.toLowerCase().includes("new") ||
    item.condition?.toLowerCase().includes("mint")

  const ownerInitials = (item.ownerName || "EV")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative h-full rounded-[24px] p-[1.5px] overflow-hidden bg-border/80 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_45px_-15px_rgba(245,158,11,0.18)] transition-shadow duration-300"
    >
      {/* Hero-Style Rotating Border Beam (Illuminates on Hover) */}
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,var(--primary)_310deg,#f59e0b_345deg,transparent_360deg)]"
      />

      {/* Inner Card Container */}
      <div className="relative h-full flex flex-col justify-between rounded-[22.5px] bg-card overflow-hidden">
        {/* Subtle Ambient Top Glow on Hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-64 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <div>
          {/* Visual Media Header */}
          <Link
            href={viewLink}
            className="relative aspect-[16/10] w-full bg-muted overflow-hidden block shrink-0"
          >
            <Image
              src={
                item.image ||
                "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
              }
              alt={item.name}
              fill
              unoptimized
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Diagonal Light Sweep Effect on Hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
            />

            {/* Multi-stop Contrast Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />

            {/* Top Bar: Category Pill (Left) + Status / Rating Badge (Right) */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-medium border border-white/15 truncate max-w-[64%]">
                <Layers className="size-3 text-primary shrink-0" />
                <span className="truncate">{item.category}</span>
              </span>

              {showStatus && item.status ? (
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 border shrink-0 ${
                    isApproved
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-400/30"
                      : isRejected
                      ? "bg-rose-950/80 text-rose-300 border-rose-400/30"
                      : "bg-amber-950/80 text-amber-300 border-amber-400/30"
                  }`}
                >
                  {isApproved ? (
                    <CheckCircle2 className="size-3" />
                  ) : isRejected ? (
                    <XCircle className="size-3" />
                  ) : (
                    <Clock className="size-3" />
                  )}
                  <span>{item.status}</span>
                </span>
              ) : hasRating ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-amber-300 text-[11px] font-mono font-semibold border border-white/15 shrink-0">
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                  <span>{item.averageRating!.toFixed(1)}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-emerald-300 text-[11px] font-mono font-medium border border-white/15 shrink-0">
                  <ShieldCheck className="size-3" />
                  <span>Verified</span>
                </span>
              )}
            </div>

            {/* Bottom Overlay: Live Stock Pill (Left) + Floating Glass Price Tag (Right) */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 z-10">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold backdrop-blur-md border ${
                  isAvailable
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-400/30"
                    : "bg-rose-950/80 text-rose-300 border-rose-400/30"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    isAvailable
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-rose-400"
                  }`}
                />
                <span>
                  {isAvailable
                    ? `${item.availableQuantity} Unit${
                        item.availableQuantity > 1 ? "s" : ""
                      } Ready`
                    : "Out of Stock"}
                </span>
              </span>

              {/* Floating Glassmorphic Price Pill */}
              <div className="px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-right shadow-lg shrink-0">
                <p className="text-sm sm:text-base font-extrabold font-mono text-amber-300 leading-none">
                  ${item.rentalPrice}
                  <span className="text-[10px] font-normal text-white/80 ml-0.5">
                    /{item.rentalType}
                  </span>
                </p>
              </div>
            </div>
          </Link>

          {/* Card Content Body (Strictly Aligned Grid Heights) */}
          <div className="p-5 pb-4 flex flex-col">
            {/* Visual Spec Pills: Brand & Condition */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[11px] font-mono font-semibold truncate max-w-[60%]">
                <Sparkles className="size-3 shrink-0" />
                <span className="truncate">{item.brand}</span>
              </span>

              <span
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold border shrink-0 ${
                  isLikeNew
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                }`}
              >
                {item.condition}
              </span>
            </div>

            {/* Locked 2-Line Title */}
            <Link href={viewLink} className="block">
              <h3 className="font-bold text-foreground text-base sm:text-[17px] leading-snug line-clamp-2 min-h-[2.85rem] group-hover:text-primary transition-colors">
                {item.name}
              </h3>
            </Link>

            {/* Locked 2-Line Description */}
            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.4rem] leading-relaxed mt-1.5">
              {item.description}
            </p>

            {/* Location & Owner Avatar Strip */}
            <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                <div className="size-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="size-3.5" />
                </div>
                <span className="truncate font-medium">{item.location}</span>
              </div>

              {item.ownerName && (
                <div className="flex items-center gap-1.5 pl-2 border-l border-border shrink-0">
                  <span className="size-5 rounded-full bg-secondary text-foreground border border-border text-[9px] font-mono font-bold flex items-center justify-center shrink-0">
                    {ownerInitials}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground max-w-[85px] truncate">
                    {item.ownerName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visual Action Footer */}
        <div className="px-5 pb-5 pt-1">
          {hasManagementActions ? (
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
              <Link
                href={viewLink}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground text-xs font-semibold transition-colors cursor-pointer"
              >
                <Eye className="size-3.5" />
                <span>Inspect</span>
              </Link>

              {editHref && (
                <Link
                  href={editHref}
                  title="Edit Listing"
                  className="p-2.5 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  <Edit3 className="size-4" />
                </Link>
              )}

              {showDelete && (
                <DeleteEquipmentButton
                  equipmentId={item._id}
                  equipmentName={item.name}
                />
              )}

              {showUnfavorite && (
                <RemoveFavoriteButton
                  equipmentId={item._id}
                  equipmentName={item.name}
                />
              )}
            </div>
          ) : (
            <Link
              href={viewLink}
              className="group/btn w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 hover:border-primary text-xs font-semibold transition-all duration-200 cursor-pointer"
            >
              <span>View Details &amp; Rent</span>
              <span className="size-6 rounded-lg bg-primary/15 group-hover/btn:bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5">
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )
}