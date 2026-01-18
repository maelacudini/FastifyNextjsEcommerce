export interface User {
  id: string
  email: string
  role: "admin" | "customer"
  isDisabled: boolean
  createdAt: string
  updatedAt?: string
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
}
