import type { OrderRepositoryPort } from "../domain/order.repository.ports.js"
import type { UpdateOrderFulfillmentParamsType } from "../types.js"

export class UpdateOrderFulfillmentStatusUseCase {
	constructor( private readonly orderRepo: OrderRepositoryPort ) {}

	async execute( data: UpdateOrderFulfillmentParamsType ) {
		const updated = await this.orderRepo.updateOrderFulfillmentStatus( data )

		return updated
	}
}
