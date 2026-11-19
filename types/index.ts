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

export type BookingStatus = "pending" | "approved" | "rejected" | "completed" | "cancelled"

export type PaymentStatus = "unpaid" | "paid"

export interface CreateBookingPayload {
  equipmentId: string
  startDate: string
  endDate: string
  requiredQuantity: number
  contactNumber: string
  deliveryAddress: string
  additionalNotes: string
}

export interface BookingRecord extends CreateBookingPayload {
  _id: string
  equipmentName: string
  equipmentImage: string
  rentalType: RentalType
  unitPrice: number
  ownerId: string
  ownerName: string
  ownerEmail: string
  customerId: string
  customerName: string
  customerEmail: string
  durationDays: number
  billingUnits: number
  totalAmount: number
  bookingStatus: BookingStatus
  paymentStatus: PaymentStatus
  createdAt: string
  updatedAt?: string
}

export interface FavoriteToggleResponse {
  success: boolean
  isFavorite: boolean
  message: string
}

export interface BookingRecord extends CreateBookingPayload {
  _id: string
  equipmentName: string
  equipmentImage: string
  rentalType: RentalType
  unitPrice: number
  ownerId: string
  ownerName: string
  ownerEmail: string
  customerId: string
  customerName: string
  customerEmail: string
  durationDays: number
  billingUnits: number
  totalAmount: number
  bookingStatus: BookingStatus
  paymentStatus: PaymentStatus
  transactionId?: string
  paidAt?: string
  createdAt: string
  updatedAt?: string
}

export interface PaymentRecord {
  _id: string
  bookingId: string
  equipmentId: string
  equipmentName: string
  customerId: string
  customerName: string
  customerEmail: string
  ownerId: string
  ownerName: string
  amount: number
  currency: string
  transactionId: string
  stripeSessionId: string
  status: "succeeded" | "pending" | "failed"
  createdAt: string
}

export interface CheckoutSessionResponse {
  success: boolean
  url?: string
  sessionId?: string
  message?: string
}