"use server"

import { revalidatePath } from "next/cache"
import { authFetch } from "@/lib/api"
import type {
  ApiResponse,
  Equipment,
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

export interface AdminEquipmentUpdatePayload {
  name: string
  category: Equipment["category"]
  location: string
  rentalPrice: number
  rentalType: Equipment["rentalType"]
  availableQuantity: number
  status: EquipmentApprovalStatus
}

export async function updateEquipmentAdminAction(
  equipmentId: string,
  payload: AdminEquipmentUpdatePayload
): Promise<ApiResponse<null>> {
  try {
    const res = await authFetch(`/api/admin/equipment/${equipmentId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
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
    console.error("Admin Update Equipment Error:", error)
    return {
      success: false,
      message: "Failed to update equipment listing.",
    }
  }
}

export async function deleteEquipmentAdminAction(
  equipmentId: string
): Promise<ApiResponse<null>> {
  try {
    const res = await authFetch(`/api/admin/equipment/${equipmentId}`, {
      method: "DELETE",
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
    console.error("Admin Delete Equipment Error:", error)
    return {
      success: false,
      message: "Failed to delete equipment listing.",
    }
  }
}