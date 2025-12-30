import type { OrderRepositoryPort } from "../domain/order.repository.ports.js"

export class FindAllOrdersUseCase {
	constructor( private readonly orderRepo: OrderRepositoryPort ) {}

	async execute() {
		const orders = await this.orderRepo.findAllOrders()

		return orders
	}
}
