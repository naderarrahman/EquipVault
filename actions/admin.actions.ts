"use server"

import { revalidatePath } from "next/cache"
import { authFetch } from "@/lib/api"
import type {
  ApiResponse,
  EquipmentApprovalStatus,
  UserRole,
} from "@/types"

export async function updateUserRoleAction(
  userId: string,
  role: UserRole
): Promise<ApiResponse<null>> {
  try {
    const res = await authFetch(`/api/admin/users/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    })

    const data: ApiResponse<null> = await res.json()

    if (data.success) {
      revalidatePath("/dashboard/admin/users")
      revalidatePath("/dashboard/admin")
    }

    return data
  } catch (error) {
    console.error("Update User Role Error:", error)
    return {
      success: false,
      message: "Failed to update user role on server.",
    }
  }
}

export async function deleteUserAction(
  userId: string
): Promise<ApiResponse<null>> {
  try {
    const res = await authFetch(`/api/admin/users/${userId}`, {
      method: "DELETE",
    })

    const data: ApiResponse<null> = await res.json()

    if (data.success) {
      revalidatePath("/dashboard/admin/users")
      revalidatePath("/dashboard/admin")
    }

    return data
  } catch (error) {
    console.error("Delete User Error:", error)
    return {
      success: false,
      message: "Failed to delete user account.",
    }
  }
}

export async function updateEquipmentStatusAdminAction(
  equipmentId: string,
  status: EquipmentApprovalStatus
): Promise<ApiResponse<null>> {
  try {
    const res = await authFetch(`/api/admin/equipment/${equipmentId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })

    const data: ApiResponse<null> = await res.json()

    if (data.success) {
      revalidatePath("/dashboard/admin/equipment")
      revalidatePath("/dashboard/admin")
      revalidatePath("/dashboard/owner/my-equipment")
      revalidatePath("/equipment")
    }

    return data
  } catch (error) {
    console.error("Update Equipment Status Error:", error)
    return {
      success: false,
      message: "Failed to update equipment approval status.",
    }
  }
}