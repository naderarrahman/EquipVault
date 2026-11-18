export type UserRole = "customer" | "owner" | "admin"
export type SignupRole = "customer" | "owner"

export type EquipmentCategory =
  | "Construction Equipment"
  | "Photography Equipment"
  | "Vehicles & Transportation"
  | "Agriculture Equipment"
  | "Electronics"
  | "Event Equipment"

export type RentalType = "Daily" | "Weekly" | "Monthly"

export type EquipmentStatus = "pending" | "approved" | "rejected"

export interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  role: UserRole
  phone?: string
  address?: string
  createdAt?: string
}

export interface SignUpFormValues {
  name: string
  email: string
  password: string
  photoUrl: string
  role: SignupRole
}

export interface SignInFormValues {
  email: string
  password: string
}

export interface EquipmentFormValues {
  name: string
  description: string
  category: EquipmentCategory
  location: string
  rentalPrice: string
  rentalType: RentalType
  availableQuantity: string
  condition: string
  brand: string
  model: string
  imageUrl: string
  terms: string
}

export interface CreateEquipmentPayload {
  name: string
  description: string
  category: EquipmentCategory
  location: string
  rentalPrice: number
  rentalType: RentalType
  availableQuantity: number
  condition: string
  brand: string
  model: string
  image: string
  terms: string
}

export interface Equipment extends CreateEquipmentPayload {
  _id: string
  status: EquipmentStatus | string
  ownerId: string
  ownerName?: string
  ownerEmail?: string
  createdAt?: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  count?: number
  data?: T
}

export type EquipmentSortOption = "recent" | "price-asc" | "price-desc"

export type EquipmentAvailabilityFilter = "all" | "available" | "unavailable"

export interface EquipmentFilterParams {
  search?: string
  category?: string
  rentalType?: string
  minPrice?: string
  maxPrice?: string
  availability?: EquipmentAvailabilityFilter
  sort?: EquipmentSortOption
  status?: string
}