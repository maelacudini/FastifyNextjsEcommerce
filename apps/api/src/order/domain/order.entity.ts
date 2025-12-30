export type OrderItem = {
  productId: string
  name: string
  quantity: number
  totalPrice: number
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
  subtotal: number
  shippingCost: number
  total: number
  shippingAddress: ShippingAddress
  paymentStatus: PaymentStatusType
  fulfillmentStatus: FulfillmentStatusType
  createdAt: string
  updatedAt?: string
  discountTotal?: number
}
