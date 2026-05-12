import { CreateOrderUseCase } from "@/domain/order/application/create-order.usecase.js"
import { DeleteOrderUseCase } from "@/domain/order/application/delete-order.usecase.js"
import { UpdateOrderUseCase } from "@/domain/order/application/update-order.usecase.js"
import { UpdateOrderPaymentStatusUseCase } from "@/domain/order/application/update-order-payment.usecase.js"
import { UpdateOrderFulfillmentStatusUseCase } from "@/domain/order/application/update-order-fulfillment.usecase.js"
import { FindOrderByIdUseCase } from "@/domain/order/application/find-order-by-id.usecase.js"
import { FindAllOrdersUseCase } from "@/domain/order/application/find-all-orders.usecase.js"
import { PostgresOrderRepository } from "../outbound/order.repository.postgres.js"
import type { FastifyInstance } from "fastify"

export default function createOrderUsecases( fastify: FastifyInstance ) {
	const orderRepo = new PostgresOrderRepository( fastify )

	const createOrder = new CreateOrderUseCase( orderRepo )
	const deleteOrder = new DeleteOrderUseCase( orderRepo )
	const updateOrder = new UpdateOrderUseCase( orderRepo )
	const updateOrderPaymentStatus = new UpdateOrderPaymentStatusUseCase( orderRepo )
	const updateOrderFulfillmentStatus = new UpdateOrderFulfillmentStatusUseCase( orderRepo )
	const findOrderById = new FindOrderByIdUseCase( orderRepo )
	const findAllOrders = new FindAllOrdersUseCase( orderRepo )

	return {
		createOrder,
		deleteOrder,
		updateOrder,
		updateOrderPaymentStatus,
		updateOrderFulfillmentStatus,
		findOrderById,
		findAllOrders
	}
}
