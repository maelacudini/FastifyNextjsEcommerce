import type { OrderRepositoryPort } from "../domain/order.repository.ports.js"
import type { CreateOrderParamsType } from "../types.js"

export class CreateOrderUseCase {
	constructor( private readonly orderRepo: OrderRepositoryPort ) {}

	async execute( data: CreateOrderParamsType ) {
		const order = await this.orderRepo.createOrder( data )

		return order
	}
}
