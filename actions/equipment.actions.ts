"use server"

import { authFetch } from "@/lib/api"
import type { CreateEquipmentPayload } from "@/types"

export async function postEquipmentAction(equipmentData: CreateEquipmentPayload) {
  try {
    const res = await authFetch("/api/equipment", {
      method: "POST",
      body: JSON.stringify(equipmentData),
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error("Server Action Error:", error)
    return { success: false, message: "Failed to submit equipment on server." }
  }
}