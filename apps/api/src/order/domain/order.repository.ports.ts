import type {
	CreateOrderParamsType,
	CreateOrderReturnType,
	DeleteOrderParamsType,
	DeleteOrderReturnType,
	FindAllOrdersReturnType,
	FindOrderByIdParamsType,
	FindOrderByIdReturnType,
	UpdateOrderParams,
	UpdateOrderReturnType,
	UpdateOrderPaymentParamsType,
	UpdateOrderPaymentReturnType,
	UpdateOrderFulfillmentParamsType,
	UpdateOrderFulfillmentReturnType
} from "../types.js"

export interface OrderRepositoryPort {
	findAllOrders(): FindAllOrdersReturnType
	findOrderById( data: FindOrderByIdParamsType ): FindOrderByIdReturnType
	createOrder( data: CreateOrderParamsType ): CreateOrderReturnType
	updateOrder( data: UpdateOrderParams ): UpdateOrderReturnType
	updateOrderPaymentStatus( data: UpdateOrderPaymentParamsType ): UpdateOrderPaymentReturnType
	updateOrderFulfillmentStatus( data: UpdateOrderFulfillmentParamsType ): UpdateOrderFulfillmentReturnType
	deleteOrder( data: DeleteOrderParamsType ): DeleteOrderReturnType
}
