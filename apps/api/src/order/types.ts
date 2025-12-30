import type { ErrorSchemasTypes, PaginatedResultType } from "@/types.js"
import type { FulfillmentStatusType, Order, PaymentStatusType } from "./domain/order.entity.js"
import type { FromSchema } from "json-schema-to-ts"
import schemas from "./adapters/inbound/order.schema.js"

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
export type FindAllOrdersReturnType = Promise<PaginatedResultType<Order>>
export type FindOrderByIdReturnType = Promise<Order | undefined>
export type CreateOrderReturnType = Promise<Order>
export type UpdateOrderReturnType = Promise<Order>
export type DeleteOrderReturnType = Promise<Order | undefined>
export type UpdateOrderPaymentReturnType = Promise<Order>
export type UpdateOrderFulfillmentReturnType = Promise<Order>

// Schemas types
export type FindAllOrdersReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findAllOrdersSuccessReturnSchema>
}

export type FindOrderByIdReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findOrderByIdSuccessReturnSchema>
}

export type CreateOrderReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.createOrderSuccessReturnSchema>
}

export type UpdateOrderReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.updateOrderSuccessReturnSchema>
}

export type DeleteOrderReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.deleteOrderSuccessReturnSchema>
}

export type UpdateOrderPaymentReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.updateOrderPaymentSuccessReturnSchema>
}

export type UpdateOrderFulfillmentReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.updateOrderFulfillmentSuccessReturnSchema>
}