import type { CurrencyCode } from "@/lib/pricing/types.js"

export type OrderItem = {
  productId: string
  name: string
  quantity: number
  unitPriceMinor: number
  lineTotalMinor: number
}

export type ShippingAddress = {
  country: string
  city: string
  street: string
  postalCode: string
}

export type PaymentStatusType = "pending" | "paid" | "failed"

export type FulfillmentStatusType = "unfulfilled" | "processing" | "shipped" | "delivered" | "cancelled"

export type Order = {
  id: string
  userId: string
  items: OrderItem[]
  currency: CurrencyCode
  baseCurrency: CurrencyCode
  subtotalMinor: number
  shippingCostMinor: number
  totalMinor: number
  shippingAddress: ShippingAddress
  paymentStatus: PaymentStatusType
  fulfillmentStatus: FulfillmentStatusType
  createdAt: string
  updatedAt?: string
  discountTotalMinor?: number
  exchangeRate?: number
  exchangeRateCapturedAt?: string
}
