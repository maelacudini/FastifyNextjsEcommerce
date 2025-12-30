import type { OrderRepositoryPort } from "../domain/order.repository.ports.js"
import type { DeleteOrderParamsType } from "../types.js"

export class DeleteOrderUseCase {
	constructor( private readonly orderRepo: OrderRepositoryPort ) {}

	async execute( data: DeleteOrderParamsType ) {
		const { id } = data

		const order = await this.orderRepo.deleteOrder( { id } )

		return order
	}
}
