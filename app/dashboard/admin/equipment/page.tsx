import { AlertCircle } from "lucide-react"
import { getAllEquipmentAdminApi } from "@/lib/services/getApi"
import type { ApiResponse, Equipment } from "@/types"
import AdminEquipmentManager from "@/components/dashboard/Admin/AdminEquipmentManager"

export default async function AdminManageEquipmentPage() {
  let equipments: Equipment[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<Equipment[]> = await getAllEquipmentAdminApi()
    if (response.success) {
      equipments = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load equipment listings."
    }
  } catch (error) {
    console.error("Error fetching admin equipment:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Equipment Approval &amp; Moderation
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review newly submitted machinery listings and approve or reject them
          for the public marketplace.
        </p>
      </div>

      {errorMessage ? (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : (
        <AdminEquipmentManager initialEquipments={equipments} />
      )}
    </div>
  )
}