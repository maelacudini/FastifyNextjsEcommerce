export interface User {
  id: string
  email: string
  password: string
  role: "admin" | "customer"
  isVerified: boolean
  isDisabled: boolean
  refreshTokenVersion: number
  createdAt: string
  updatedAt?: string
  username?: string
  address?: {
    country: string
    city: string
    street: string
    postalCode: string
  }
  phone?: string
  favorites?: string[]
  cart?: string[]
  marketingOptIn?: boolean
  lastLoginAt?: string
  lastPasswordChangeAt?: string
}