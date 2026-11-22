"use server"

import { revalidatePath } from "next/cache"
import { authFetch } from "@/lib/api"
import type { ApiResponse, CreateReviewPayload, ReviewRecord } from "@/types"

export async function submitReviewAction(
  payload: CreateReviewPayload
): Promise<ApiResponse<ReviewRecord>> {
  try {
    const res = await authFetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    const data: ApiResponse<ReviewRecord> = await res.json()

    if (data.success) {
      revalidatePath("/dashboard/customer/bookings")
      revalidatePath(`/equipment/${payload.equipmentId}`)
      revalidatePath("/")
    }

    return data
  } catch (error) {
    console.error("Error submitting review:", error)
    return {
      success: false,
      message: "Something went wrong while submitting your review.",
    }
  }
}