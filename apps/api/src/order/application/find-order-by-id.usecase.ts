import type { OrderRepositoryPort } from "../domain/order.repository.ports.js"
import type { FindOrderByIdParamsType } from "../types.js"

export class FindOrderByIdUseCase {
	constructor( private readonly orderRepo: OrderRepositoryPort ) {}

	async execute( data: FindOrderByIdParamsType ) {
		const { id } = data

		const order = await this.orderRepo.findOrderById( { id } )

		return order
	}
}
