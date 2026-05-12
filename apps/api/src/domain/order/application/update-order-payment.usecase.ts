import type { OrderRepositoryPort } from "../domain/order.repository.ports.js"
import type { UpdateOrderPaymentParamsType } from "../types.js"

export class UpdateOrderPaymentStatusUseCase {
	constructor( private readonly orderRepo: OrderRepositoryPort ) {}

	async execute( data: UpdateOrderPaymentParamsType ) {
		const updated = await this.orderRepo.updateOrderPaymentStatus( data )

		return updated
	}
}
