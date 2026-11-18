import { authFetch } from "@/lib/api"
import type { CreateEquipmentPayload } from "@/types"

export const postEquipmentApi = async (equipmentData: CreateEquipmentPayload) => {
  const res = await authFetch("/api/equipment", {
    method: "POST",
    body: JSON.stringify(equipmentData),
  })
  return res.json()
}