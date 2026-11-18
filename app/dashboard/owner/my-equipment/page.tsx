import Link from "next/link"
import { Plus, Package, AlertCircle } from "lucide-react"
import { getOwnerEquipmentApi } from "@/lib/services/getApi"
import EquipmentCard from "@/components/ProductCard/EquipmentCard"
import type { ApiResponse, Equipment } from "@/types"

export default async function MyEquipmentPage() {
  let equipments: Equipment[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<Equipment[]> = await getOwnerEquipmentApi()
    if (response.success) {
      equipments = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load equipment list."
    }
  } catch (error) {
    console.error("Error fetching owner equipment:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Equipment Inventory
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your listed machinery, monitor approval statuses, and track
            availability in real-time.
          </p>
        </div>

        <Link
          href="/dashboard/owner/add-equipment"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs cursor-pointer"
        >
          <Plus className="size-4" />
          Add New Equipment
        </Link>
      </div>

      {/* Error Alert State */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Empty State */}
      {!errorMessage && equipments.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-2xl p-8 space-y-4 shadow-2xs">
          <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Package className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">
              No equipment listed yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              You haven&apos;t added any machinery or items for rent. Start
              listing today to reach potential renters across the platform.
            </p>
          </div>
          <Link
            href="/dashboard/owner/add-equipment"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition hover:bg-primary/90"
          >
            <Plus className="size-4" /> List Your First Equipment
          </Link>
        </div>
      ) : (
        /* Equipment Grid using Reusable EquipmentCard Component */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipments.map((item) => (
            <EquipmentCard
              key={item._id}
              item={item}
              showStatus={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}