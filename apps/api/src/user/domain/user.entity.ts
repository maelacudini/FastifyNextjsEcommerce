import type { UserRole } from "../types.js";

export interface User {
  id: string
  email: string
  password: string
  role: UserRole
  username?: string
  address?: {
    country: string
    city: string
    street: string
    postalCode: string
  }
  phone?: string
  favorites?: string[]
  marketingOptIn?: boolean
}