import { authFetch } from "@/lib/api"
import { AdminDashboardStats, AdminUserRecord, ApiResponse, BookingRecord, Equipment, EquipmentFilterParams, PaymentRecord } from "@/types"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export const getOwnerEquipmentApi = async () => {
  const res = await authFetch("/api/equipment/my-equipment")
  return res.json()
}

// Public marketplace equipment with backend search, filter & sort
export const getAllEquipmentApi = async (
  params?: EquipmentFilterParams
): Promise<ApiResponse<Equipment[]>> => {
  try {
    const query = new URLSearchParams()

    if (params?.search?.trim()) {
      query.set("search", params.search.trim())
    }
    if (params?.category && params.category !== "All") {
      query.set("category", params.category)
    }
    if (params?.rentalType && params.rentalType !== "All") {
      query.set("rentalType", params.rentalType)
    }
    if (params?.minPrice && params.minPrice.trim() !== "") {
      query.set("minPrice", params.minPrice.trim())
    }
    if (params?.maxPrice && params.maxPrice.trim() !== "") {
      query.set("maxPrice", params.maxPrice.trim())
    }
    if (params?.availability && params.availability !== "all") {
      query.set("availability", params.availability)
    }
    if (params?.sort) {
      query.set("sort", params.sort)
    }
    if (params?.status) {
      query.set("status", params.status)
    }

    const queryString = query.toString()
    const url = `${API_BASE_URL}/api/equipment${queryString ? `?${queryString}` : ""}`

    const res = await fetch(url, {
      cache: "no-store",
    })

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch equipment list.",
        data: [],
      }
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching all equipment:", error)
    return {
      success: false,
      message: "Network error while fetching equipment.",
      data: [],
    }
  }
}

// Single equipment details by ID (for Edit Form & Details Page)
export const getSingleEquipmentApi = async (
  id: string
): Promise<ApiResponse<Equipment>> => {
  try {
    const res = await authFetch(`/api/equipment/${id}`)
    return await res.json()
  } catch (error) {
    console.error("Error fetching single equipment:", error)
    return {
      success: false,
      message: "Failed to load equipment details.",
    }
  }
}

export const checkFavoriteApi = async (
  equipmentId: string
): Promise<{ success: boolean; isFavorite: boolean }> => {
  try {
    const res = await authFetch(`/api/favorites/check/${equipmentId}`)
    return await res.json()
  } catch {
    return { success: false, isFavorite: false }
  }
}

export const getOwnerBookingsApi = async (): Promise<ApiResponse<BookingRecord[]>> => {
  try {
    const res = await authFetch("/api/bookings/owner")
    return await res.json()
  } catch (error) {
    console.error("Error fetching owner bookings:", error)
    return {
      success: false,
      message: "Failed to load rental requests.",
      data: [],
    }
  }
}

// Customer: Fetch all saved favorite equipment
export const getMyFavoritesApi = async (): Promise<ApiResponse<Equipment[]>> => {
  try {
    const res = await authFetch("/api/favorites/my-favorites")
    return await res.json()
  } catch (error) {
    console.error("Error fetching favorite equipment:", error)
    return {
      success: false,
      message: "Failed to load saved favorites.",
      data: [],
    }
  }
}

// Customer: Fetch logged-in customer's own booking history
export const getMyBookingsApi = async (): Promise<ApiResponse<BookingRecord[]>> => {
  try {
    const res = await authFetch("/api/bookings/my-bookings")
    return await res.json()
  } catch (error) {
    console.error("Error fetching customer bookings:", error)
    return {
      success: false,
      message: "Failed to load your bookings.",
      data: [],
    }
  }
}

// Admin: Overview Stats
export const getAdminStatsApi = async (): Promise<ApiResponse<AdminDashboardStats>> => {
  try {
    const res = await authFetch("/api/admin/stats")
    return await res.json()
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      success: false,
      message: "Failed to load admin statistics.",
    }
  }
}

// Admin: Get All Users
export const getAllUsersAdminApi = async (): Promise< ApiResponse<AdminUserRecord[]>> => {
  try {
    const res = await authFetch("/api/admin/users")
    return await res.json()
  } catch (error) {
    console.error("Error fetching all users:", error)
    return {
      success: false,
      message: "Failed to load users list.",
      data: [],
    }
  }
}

// Admin: Get All Equipment (Pending, Approved, Rejected)
export const getAllEquipmentAdminApi = async (): Promise<ApiResponse<Equipment[]>> => {
  try {
    const res = await authFetch("/api/admin/equipment")
    return await res.json()
  } catch (error) {
    console.error("Error fetching all admin equipment:", error)
    return {
      success: false,
      message: "Failed to load equipment listings.",
      data: [],
    }
  }
}

// Admin: Get All Platform Bookings
export const getAllBookingsAdminApi = async (): Promise<ApiResponse<BookingRecord[]>> => {
  try {
    const res = await authFetch("/api/admin/bookings")
    return await res.json()
  } catch (error) {
    console.error("Error fetching all admin bookings:", error)
    return {
      success: false,
      message: "Failed to load platform bookings.",
      data: [],
    }
  }
}

// Admin: Get All Platform Stripe Payments
export const getAllPaymentsAdminApi = async (): Promise<ApiResponse<PaymentRecord[]>> => {
  try {
    const res = await authFetch("/api/admin/payments")
    return await res.json()
  } catch (error) {
    console.error("Error fetching all admin payments:", error)
    return {
      success: false,
      message: "Failed to load payment transactions.",
      data: [],
    }
  }
}

