"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CheckCircle2,
  Clock,
  Eye,
  Loader2,
  MapPin,
  Package,
  Search,
  User,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"
import { updateEquipmentStatusAdminAction } from "@/actions/admin.actions"
import type { Equipment, EquipmentApprovalStatus } from "@/types"

interface AdminEquipmentManagerProps {
  initialEquipments: Equipment[]
}

const filterTabs: Array<{
  label: string
  value: "all" | EquipmentApprovalStatus
}> = [
  { label: "All Listings", value: "all" },
  { label: "Pending Review", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
]

export default function AdminEquipmentManager({
  initialEquipments,
}: AdminEquipmentManagerProps) {
  const router = useRouter()
  const [equipments, setEquipments] = useState<Equipment[]>(initialEquipments)
  const [activeTab, setActiveTab] = useState<"all" | EquipmentApprovalStatus>(
    "all"
  )
  const [searchQuery, setSearchQuery] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const stats = useMemo(() => {
    const total = equipments.length
    const pending = equipments.filter(
      (e) => (e.status || "pending").toLowerCase() === "pending"
    ).length
    const approved = equipments.filter(
      (e) => (e.status || "").toLowerCase() === "approved"
    ).length
    const rejected = equipments.filter(
      (e) => (e.status || "").toLowerCase() === "rejected"
    ).length

    return { total, pending, approved, rejected }
  }, [equipments])

  const filteredEquipments = useMemo(() => {
    return equipments.filter((item) => {
      const normalizedStatus = (item.status || "pending").toLowerCase()
      const matchesTab =
        activeTab === "all" || normalizedStatus === activeTab

      const keyword = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.brand.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword) ||
        (item.ownerName || "").toLowerCase().includes(keyword) ||
        (item.ownerEmail || "").toLowerCase().includes(keyword)

      return matchesTab && matchesSearch
    })
  }, [equipments, activeTab, searchQuery])

  const handleStatusChange = async (
    equipmentId: string,
    newStatus: EquipmentApprovalStatus
  ) => {
    try {
      setUpdatingId(equipmentId)
      const res = await updateEquipmentStatusAdminAction(equipmentId, newStatus)

      if (!res.success) {
        toast.error(res.message || "Failed to update equipment status.")
        return
      }

      setEquipments((prev) =>
        prev.map((item) =>
          item._id === equipmentId ? { ...item, status: newStatus } : item
        )
      )

      toast.success(
        newStatus === "approved"
          ? "Equipment approved and published to marketplace!"
          : "Equipment listing rejected."
      )
      router.refresh()
    } catch {
      toast.error("Something went wrong while updating status.")
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Listings
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              {stats.total}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Package className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Pending Approval
            </p>
            <p className="text-2xl font-bold text-amber-500 font-mono mt-1">
              {stats.pending}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Approved &amp; Live
            </p>
            <p className="text-2xl font-bold text-emerald-500 font-mono mt-1">
              {stats.approved}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Rejected
            </p>
            <p className="text-2xl font-bold text-destructive font-mono mt-1">
              {stats.rejected}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
            <XCircle className="size-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search equipment or owner..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Equipment Moderation Cards */}
      {filteredEquipments.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 space-y-3 shadow-2xs">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Package className="size-7" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No equipment listings found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            No listings match your selected status tab or search filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEquipments.map((item) => {
            const status = (item.status || "pending").toLowerCase()
            const isUpdating = updatingId === item._id

            return (
              <div
                key={item._id}
                className="bg-card border border-border rounded-2xl p-5 shadow-2xs hover:border-primary/40 transition flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                {/* Left: Image & Equipment Info */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0">
                  <div className="relative h-24 w-full sm:w-32 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                    <Image
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
                      }
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                          status === "approved"
                            ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                            : status === "rejected"
                            ? "bg-destructive/15 text-destructive border-destructive/30"
                            : "bg-amber-500/15 text-amber-500 border-amber-500/30"
                        }`}
                      >
                        {status}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-md bg-muted text-muted-foreground text-[11px] font-medium">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                      {item.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="font-mono">
                        ${item.rentalPrice}/{item.rentalType} &bull; Stock:{" "}
                        {item.availableQuantity}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5 text-primary" />
                        {item.location}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-0.5">
                      <User className="size-3.5 text-primary shrink-0" />
                      <span>
                        Owner:{" "}
                        <strong className="text-foreground">
                          {item.ownerName || "Owner"}
                        </strong>{" "}
                        {item.ownerEmail ? `(${item.ownerEmail})` : ""}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right: Moderation Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-border shrink-0">
                  <Link
                    href={`/equipment/${item._id}`}
                    title="Preview Listing"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition"
                  >
                    <Eye className="size-3.5" />
                    Preview
                  </Link>

                  {status !== "approved" && (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(item._id, "approved")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition disabled:opacity-60 cursor-pointer"
                    >
                      {isUpdating ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="size-3.5" />
                      )}
                      Approve
                    </button>
                  )}

                  {status !== "rejected" && (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(item._id, "rejected")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-destructive/40 bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground text-destructive text-xs font-semibold transition disabled:opacity-60 cursor-pointer"
                    >
                      <XCircle className="size-3.5" />
                      Reject
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}