import { authFetch } from "@/lib/api"

export const getOwnerEquipmentApi = async () => {
  const res = await authFetch("/api/equipment/my-equipment")
  return res.json()
}

