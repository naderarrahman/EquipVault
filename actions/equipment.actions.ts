"use server"

import { revalidatePath } from "next/cache"
import { authFetch } from "@/lib/api"
import type {
  ApiResponse,
  CreateEquipmentPayload,
  Equipment,
} from "@/types"

export async function postEquipmentAction(
  equipmentData: CreateEquipmentPayload
): Promise<ApiResponse<Equipment>> {
  try {
    const res = await authFetch("/api/equipment", {
      method: "POST",
      body: JSON.stringify(equipmentData),
    })
    const data: ApiResponse<Equipment> = await res.json()
    if (data.success) {
      revalidatePath("/dashboard/owner/my-equipment")
    }
    return data
  } catch (error) {
    console.error("Server Action Error (POST):", error)
    return { success: false, message: "Failed to submit equipment on server." }
  }
}

export async function updateEquipmentAction(
  id: string,
  equipmentData: Partial<CreateEquipmentPayload>
): Promise<ApiResponse<Equipment>> {
  try {
    const res = await authFetch(`/api/equipment/${id}`, {
      method: "PATCH",
      body: JSON.stringify(equipmentData),
    })
    const data: ApiResponse<Equipment> = await res.json()
    if (data.success) {
      revalidatePath("/dashboard/owner/my-equipment")
      revalidatePath("/equipment")
      revalidatePath(`/equipment/${id}`)
    }
    return data
  } catch (error) {
    console.error("Server Action Error (PATCH):", error)
    return { success: false, message: "Failed to update equipment on server." }
  }
}

export async function deleteEquipmentAction(
  id: string
): Promise<ApiResponse<null>> {
  try {
    const res = await authFetch(`/api/equipment/${id}`, {
      method: "DELETE",
    })
    const data: ApiResponse<null> = await res.json()
    if (data.success) {
      revalidatePath("/dashboard/owner/my-equipment")
      revalidatePath("/equipment")
    }
    return data
  } catch (error) {
    console.error("Server Action Error (DELETE):", error)
    return { success: false, message: "Failed to delete equipment on server." }
  }
}