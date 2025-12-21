import type { BiscuitRepositoryPort } from "../domain/buiscuit.repository.ports.js"
import type { UpdateBiscuitParams } from "../types.js"

export class UpdateBiscuitUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( biscuit: UpdateBiscuitParams ) {
		const biscuits = await this.biscuitRepo.updateBiscuit( biscuit )

		return biscuits
	}
}
