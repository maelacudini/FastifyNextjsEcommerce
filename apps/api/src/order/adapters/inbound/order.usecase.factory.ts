import { CreateOrderUseCase } from "@/order/application/create-order.usecase.js"
import { DeleteOrderUseCase } from "@/order/application/delete-order.usecase.js"
import { UpdateOrderUseCase } from "@/order/application/update-order.usecase.js"
import { UpdateOrderPaymentStatusUseCase } from "@/order/application/update-order-payment.usecase.js"
import { UpdateOrderFulfillmentStatusUseCase } from "@/order/application/update-order-fulfillment.usecase.js"
import { FindOrderByIdUseCase } from "@/order/application/find-order-by-id.usecase.js"
import { FindAllOrdersUseCase } from "@/order/application/find-all-orders.usecase.js"
import { MockOrderRepository } from "../outbound/order.repository.mock.js"

const orderRepo = new MockOrderRepository()

const createOrder = new CreateOrderUseCase( orderRepo )
const deleteOrder = new DeleteOrderUseCase( orderRepo )
const updateOrder = new UpdateOrderUseCase( orderRepo )
const updateOrderPaymentStatus = new UpdateOrderPaymentStatusUseCase( orderRepo )
const updateOrderFulfillmentStatus = new UpdateOrderFulfillmentStatusUseCase( orderRepo )
const findOrderById = new FindOrderByIdUseCase( orderRepo )
const findAllOrders = new FindAllOrdersUseCase( orderRepo )

export default {
	createOrder,
	deleteOrder,
	updateOrder,
	updateOrderPaymentStatus,
	updateOrderFulfillmentStatus,
	findOrderById,
	findAllOrders
}
