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
	findAllOrders(): Promise<FindAllOrdersReturnType>
	findOrderById( data: FindOrderByIdParamsType ): Promise<FindOrderByIdReturnType>
	createOrder( data: CreateOrderParamsType ): Promise<CreateOrderReturnType>
	updateOrder( data: UpdateOrderParams ): Promise<UpdateOrderReturnType>
	updateOrderPaymentStatus( data: UpdateOrderPaymentParamsType ): Promise<UpdateOrderPaymentReturnType>
	updateOrderFulfillmentStatus( data: UpdateOrderFulfillmentParamsType ): Promise<UpdateOrderFulfillmentReturnType>
	deleteOrder( data: DeleteOrderParamsType ): Promise<DeleteOrderReturnType>
}
