export type UserRole = "customer" | "owner" | "admin"
export type SignupRole = "customer" | "owner"

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