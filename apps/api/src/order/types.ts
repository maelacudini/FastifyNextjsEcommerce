import type { PaginatedResultType } from "@/types.js"
import type { FulfillmentStatusType, Order, PaymentStatusType } from "./domain/order.entity.js"

// Generic types
export type OrderId = Order["id"]

// Request params types
export type FindOrderByIdParamsType = { id: OrderId }
export type CreateOrderParamsType = Omit<Order, "id" | "updatedAt">
export type UpdateOrderParams = { id: OrderId; order: Partial<Omit<Order, "id" | "createdAt">> }
export type DeleteOrderParamsType = { id: OrderId }
export type UpdateOrderPaymentParamsType = { id: OrderId; paymentStatus: PaymentStatusType }
export type UpdateOrderFulfillmentParamsType = { id: OrderId; fulfillmentStatus: FulfillmentStatusType }

// Return types
export type FindAllOrdersReturnType = PaginatedResultType<Order>
export type FindOrderByIdReturnType = Order | undefined
export type CreateOrderReturnType = Order
export type UpdateOrderReturnType = Order
export type DeleteOrderReturnType = Order | undefined
export type UpdateOrderPaymentReturnType = Order
export type UpdateOrderFulfillmentReturnType = Order