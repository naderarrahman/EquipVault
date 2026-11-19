import { AlertCircle } from "lucide-react"
import { getAllUsersAdminApi } from "@/lib/services/getApi"
import type { AdminUserRecord, ApiResponse } from "@/types"
import AdminUsersManager from "@/components/dashboard/Admin/AdminUsersManager"

export default async function AdminManageUsersPage() {
  let users: AdminUserRecord[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<AdminUserRecord[]> = await getAllUsersAdminApi()
    if (response.success) {
      users = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load users."
    }
  } catch (error) {
    console.error("Error fetching admin users:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          User &amp; Role Management
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View all registered platform accounts, assign roles, and manage
          access permissions.
        </p>
      </div>

      {errorMessage ? (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : (
        <AdminUsersManager initialUsers={users} />
      )}
    </div>
  )
}