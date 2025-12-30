/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { OrderRepositoryPort } from "@/order/domain/order.repository.ports.js"
import type { CreateOrderParamsType, CreateOrderReturnType, DeleteOrderParamsType, DeleteOrderReturnType, FindAllOrdersReturnType, FindOrderByIdParamsType, FindOrderByIdReturnType, UpdateOrderParams, UpdateOrderReturnType, UpdateOrderPaymentParamsType, UpdateOrderPaymentReturnType, UpdateOrderFulfillmentParamsType, UpdateOrderFulfillmentReturnType } from "@/order/types.js"

export class MockOrderRepository implements OrderRepositoryPort {
	async findAllOrders(): FindAllOrdersReturnType {
		throw new Error( "Method not implemented." )
	}

	async findOrderById( data: FindOrderByIdParamsType ): FindOrderByIdReturnType {
		throw new Error( "Method not implemented." )
	}

	async createOrder( data: CreateOrderParamsType ): CreateOrderReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateOrder( data: UpdateOrderParams ): UpdateOrderReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateOrderPaymentStatus( data: UpdateOrderPaymentParamsType ): UpdateOrderPaymentReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateOrderFulfillmentStatus( data: UpdateOrderFulfillmentParamsType ): UpdateOrderFulfillmentReturnType {
		throw new Error( "Method not implemented." )
	}

	async deleteOrder( data: DeleteOrderParamsType ): DeleteOrderReturnType {
		throw new Error( "Method not implemented." )
	}
}
