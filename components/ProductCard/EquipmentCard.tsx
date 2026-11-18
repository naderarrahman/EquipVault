import Image from "next/image"
import Link from "next/link"
import { MapPin, CheckCircle2, Clock, Eye, Edit3 } from "lucide-react"
import type { Equipment } from "@/types"

interface EquipmentCardProps {
  item: Equipment
  showStatus?: boolean
  editHref?: string
}

export default function EquipmentCard({
  item,
  showStatus = false,
  editHref,
}: EquipmentCardProps) {
  const isApproved = item.status?.toLowerCase() === "approved"

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between hover:border-primary/50 transition duration-300 group">
      <div>
        {/* Image Thumbnail & Status Badge */}
        <div className="relative h-52 w-full bg-muted overflow-hidden">
          <Image
            src={
              item.image ||
              "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
            }
            alt={item.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Status Badge (Only shown if enabled) */}
          {showStatus && item.status && (
            <span
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-xs ${
                isApproved
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}
            >
              {isApproved ? (
                <CheckCircle2 className="size-3.5" />
              ) : (
                <Clock className="size-3.5" />
              )}
              {item.status}
            </span>
          )}

          {/* Category Tag */}
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-background/80 backdrop-blur-md text-foreground text-xs font-medium border border-border">
            {item.category}
          </span>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>
              Brand: <strong className="text-foreground">{item.brand}</strong>
            </span>
            <span>
              Condition:{" "}
              <strong className="text-foreground">{item.condition}</strong>
            </span>
          </div>

          <h3 className="font-semibold text-foreground text-base line-clamp-1 group-hover:text-primary transition">
            {item.name}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-primary shrink-0" />
              <span className="truncate max-w-[180px]">{item.location}</span>
            </div>
            {item.ownerName && (
              <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                By: {item.ownerName}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Price & Quick Actions */}
      <div className="p-5 pt-3 flex items-center justify-between border-t border-border mt-2 bg-muted/20">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-foreground font-mono">
              ${item.rentalPrice}
            </span>
            <span className="text-xs text-muted-foreground">
              / {item.rentalType}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground font-mono">
            Available: {item.availableQuantity} units
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/equipment/${item._id}`}
            title="View Details"
            className="p-2 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
          >
            <Eye className="size-4" />
          </Link>
          {editHref && (
            <Link
              href={editHref}
              title="Edit Listing"
              className="p-2 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition cursor-pointer"
            >
              <Edit3 className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}