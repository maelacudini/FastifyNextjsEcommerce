import type { BiscuitRepositoryPort } from "../domain/biscuit.repository.ports.js"
import type { CreateBiscuitParamsType } from "../types.js"

export class CreateBiscuitUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( data: CreateBiscuitParamsType ) {
		const biscuits = await this.biscuitRepo.createBiscuit( data )

		return biscuits
	}
}
