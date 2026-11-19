"use server"

import { revalidatePath } from "next/cache"
import { authFetch } from "@/lib/api"
import type { ApiResponse } from "@/types"

export type OwnerBookingActionStatus = "approved" | "rejected" | "completed"

export async function updateBookingStatusAction(
  bookingId: string,
  status: OwnerBookingActionStatus
): Promise<ApiResponse<null>> {
  try {
    const res = await authFetch(`/api/bookings/${bookingId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })

    const data: ApiResponse<null> = await res.json()

    if (data.success) {
      revalidatePath("/dashboard/owner/bookings")
      revalidatePath("/dashboard/owner/my-equipment")
      revalidatePath("/dashboard/customer/bookings")
      revalidatePath("/equipment")
    }

    return data
  } catch (error) {
    console.error("Update Booking Status Error:", error)
    return {
      success: false,
      message: "Failed to update booking status on server.",
    }
  }
}