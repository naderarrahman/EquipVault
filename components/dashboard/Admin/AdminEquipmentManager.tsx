"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Loader2,
  MapPin,
  Package,
  Pencil,
  Search,
  Trash2,
  User,
  X,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"
import {
  deleteEquipmentAdminAction,
  updateEquipmentAdminAction,
  updateEquipmentStatusAdminAction,
  type AdminEquipmentUpdatePayload,
} from "@/actions/admin.actions"
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

const STANDARD_CATEGORIES = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
] as const

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

  const [editTarget, setEditTarget] = useState<Equipment | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Equipment | null>(null)
  const [isSavingEdit, setIsSavingEdit] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
      const matchesTab = activeTab === "all" || normalizedStatus === activeTab

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

                {/* Right: Moderation & CRUD Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-border shrink-0">
                  <Link
                    href={`/dashboard/admin/equipment/${item._id}`}
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

                  <button
                    type="button"
                    onClick={() => setEditTarget(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition cursor-pointer"
                  >
                    <Pencil className="size-3.5 text-primary" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-destructive/30 bg-background hover:bg-destructive hover:text-destructive-foreground text-destructive text-xs font-medium transition cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Admin Quick Edit Modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              try {
                setIsSavingEdit(true)
                const rawStatus = String(
                  formData.get("status") || editTarget.status || "pending"
                ).toLowerCase()
                const validStatus: EquipmentApprovalStatus =
                  rawStatus === "approved" || rawStatus === "rejected"
                    ? rawStatus
                    : "pending"

                const payload: AdminEquipmentUpdatePayload = {
                  name: String(formData.get("name") || editTarget.name),
                  category: String(
                    formData.get("category") || editTarget.category
                  ) as Equipment["category"],
                  location: String(
                    formData.get("location") || editTarget.location
                  ),
                  rentalPrice: Number(
                    formData.get("rentalPrice") || editTarget.rentalPrice
                  ),
                  rentalType: String(
                    formData.get("rentalType") || editTarget.rentalType
                  ) as Equipment["rentalType"],
                  availableQuantity: Number(
                    formData.get("availableQuantity") ||
                      editTarget.availableQuantity
                  ),
                  status: validStatus,
                }

                const res = await updateEquipmentAdminAction(
                  editTarget._id,
                  payload
                )
                if (!res.success) {
                  toast.error(res.message || "Update failed.")
                  return
                }

                setEquipments((prev) =>
                  prev.map((eq) =>
                    eq._id === editTarget._id ? { ...eq, ...payload } : eq
                  )
                )
                toast.success("Equipment updated successfully.")
                setEditTarget(null)
                router.refresh()
              } finally {
                setIsSavingEdit(false)
              }
            }}
            className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">
                Edit Equipment Listing
              </h3>
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-foreground">
                  Equipment Name
                </label>
                <input
                  name="name"
                  defaultValue={editTarget.name}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Category</label>
                <select
                  name="category"
                  defaultValue={editTarget.category}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground"
                >
                  {STANDARD_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  {!STANDARD_CATEGORIES.includes(
                    editTarget.category as (typeof STANDARD_CATEGORIES)[number]
                  ) && (
                    <option value={editTarget.category}>
                      {editTarget.category}
                    </option>
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Location</label>
                <input
                  name="location"
                  defaultValue={editTarget.location}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Rental Price ($)
                </label>
                <input
                  name="rentalPrice"
                  type="number"
                  min={1}
                  defaultValue={editTarget.rentalPrice}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Available Qty
                </label>
                <input
                  name="availableQuantity"
                  type="number"
                  min={0}
                  defaultValue={editTarget.availableQuantity}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Rental Type
                </label>
                <select
                  name="rentalType"
                  defaultValue={editTarget.rentalType}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">
                  Listing Status
                </label>
                <select
                  name="status"
                  defaultValue={(editTarget.status || "pending").toLowerCase()}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setEditTarget(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSavingEdit}
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 disabled:opacity-60 cursor-pointer"
              >
                {isSavingEdit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admin Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Delete Equipment Listing?
                </h3>
                <p className="text-xs text-muted-foreground">
                  This will permanently remove &ldquo;{deleteTarget.name}&rdquo;.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  try {
                    setIsDeleting(true)
                    const res = await deleteEquipmentAdminAction(
                      deleteTarget._id
                    )
                    if (!res.success) {
                      toast.error(res.message || "Delete failed.")
                      return
                    }
                    setEquipments((prev) =>
                      prev.filter((eq) => eq._id !== deleteTarget._id)
                    )
                    toast.success("Equipment deleted.")
                    setDeleteTarget(null)
                    router.refresh()
                  } finally {
                    setIsDeleting(false)
                  }
                }}
                className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 disabled:opacity-60 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}