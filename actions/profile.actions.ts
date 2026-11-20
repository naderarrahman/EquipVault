"use server"

import { revalidatePath } from "next/cache"
import { authFetch } from "@/lib/api"
import type { ApiResponse } from "@/types"

export interface ProfileContactData {
  phone: string
  address: string
}

export async function getProfileContactAction(): Promise<
  ApiResponse<ProfileContactData>
> {
  try {
    const res = await authFetch("/api/dashboard/profile-contact", {
      method: "GET",
    })

    const data: ApiResponse<ProfileContactData> = await res.json()
    return data
  } catch (error) {
    console.error("Get Profile Contact Error:", error)
    return {
      success: false,
      message: "Failed to load contact details.",
      data: { phone: "", address: "" },
    }
  }
}

export async function updateProfileContactAction(
  payload: ProfileContactData
): Promise<ApiResponse<ProfileContactData>> {
  try {
    const res = await authFetch("/api/dashboard/profile-contact", {
      method: "PATCH",
      body: JSON.stringify(payload),
    })

    const data: ApiResponse<ProfileContactData> = await res.json()

    if (data.success) {
      revalidatePath("/dashboard/customer/profile")
      revalidatePath("/dashboard/owner/profile")
      revalidatePath("/dashboard/admin/profile")
    }

    return data
  } catch (error) {
    console.error("Update Profile Contact Error:", error)
    return {
      success: false,
      message: "Failed to update contact details.",
    }
  }
}