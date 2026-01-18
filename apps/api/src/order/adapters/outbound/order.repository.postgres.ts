/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { OrderRepositoryPort } from "@/order/domain/order.repository.ports.js"
import type { CreateOrderParamsType, CreateOrderReturnType, DeleteOrderParamsType, DeleteOrderReturnType, FindAllOrdersReturnType, FindOrderByIdParamsType, FindOrderByIdReturnType, UpdateOrderParams, UpdateOrderReturnType, UpdateOrderPaymentParamsType, UpdateOrderPaymentReturnType, UpdateOrderFulfillmentParamsType, UpdateOrderFulfillmentReturnType } from "@/order/types.js"
import type { FastifyInstance } from "fastify"

export class MockOrderRepository implements OrderRepositoryPort {
	constructor( private fastify: FastifyInstance ) {}

	async findAllOrders(): Promise<FindAllOrdersReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findOrderById( data: FindOrderByIdParamsType ): Promise<FindOrderByIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async createOrder( data: CreateOrderParamsType ): Promise<CreateOrderReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateOrder( data: UpdateOrderParams ): Promise<UpdateOrderReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateOrderPaymentStatus( data: UpdateOrderPaymentParamsType ): Promise<UpdateOrderPaymentReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateOrderFulfillmentStatus( data: UpdateOrderFulfillmentParamsType ): Promise<UpdateOrderFulfillmentReturnType> {
		throw new Error( "Method not implemented." )
	}

	async deleteOrder( data: DeleteOrderParamsType ): Promise<DeleteOrderReturnType> {
		throw new Error( "Method not implemented." )
	}
}
