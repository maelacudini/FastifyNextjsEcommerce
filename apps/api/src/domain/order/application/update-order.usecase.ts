import type { OrderRepositoryPort } from "../domain/order.repository.ports.js"
import type { UpdateOrderParams } from "../types.js"

export class UpdateOrderUseCase {
	constructor( private readonly orderRepo: OrderRepositoryPort ) {}

	async execute( data: UpdateOrderParams ) {
		const order = await this.orderRepo.updateOrder( data )

		return order
	}
}
