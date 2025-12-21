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

export type Order = {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  shippingAddress: ShippingAddress
  paymentStatus: "pending" | "paid" | "failed"
  fulfillmentStatus: "unfulfilled" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  updatedAt?: string
  discountTotal?: number
}
