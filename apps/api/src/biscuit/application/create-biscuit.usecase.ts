import type { BiscuitRepositoryPort } from "../domain/buiscuit.repository.ports.js"
import type { CreateBiscuitParams } from "../types.js"

export class CreateBiscuitUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( biscuit: CreateBiscuitParams ) {
		const biscuits = await this.biscuitRepo.createBiscuit( biscuit )

		return biscuits
	}
}
