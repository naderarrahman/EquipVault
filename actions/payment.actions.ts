"use server"

import { revalidatePath } from "next/cache"
import { authFetch } from "@/lib/api"
import type {
  ApiResponse,
  CheckoutSessionResponse,
  PaymentRecord,
} from "@/types"

export async function createCheckoutSessionAction(
  bookingId: string
): Promise<CheckoutSessionResponse> {
  try {
    const res = await authFetch("/api/payments/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ bookingId }),
    })

    return await res.json()
  } catch (error) {
    console.error("Create Checkout Session Error:", error)
    return {
      success: false,
      message: "Failed to initiate Stripe payment session.",
    }
  }
}

export async function verifyPaymentSessionAction(
  sessionId: string
): Promise<ApiResponse<PaymentRecord>> {
  try {
    const res = await authFetch("/api/payments/verify-session", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    })

    const data: ApiResponse<PaymentRecord> = await res.json()

    if (data.success) {
      revalidatePath("/dashboard/customer/bookings")
      revalidatePath("/dashboard/owner/bookings")
    }

    return data
  } catch (error) {
    console.error("Verify Payment Session Error:", error)
    return {
      success: false,
      message: "Failed to verify payment with server.",
    }
  }
}