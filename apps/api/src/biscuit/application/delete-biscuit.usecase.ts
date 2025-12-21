import type { BiscuitRepositoryPort } from "../domain/buiscuit.repository.ports.js"
import type { BiscuitId } from "../types.js"

export class DeleteBiscuitUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( id: BiscuitId ) {
		const biscuits = await this.biscuitRepo.deleteBiscuit( { id } )

		return biscuits
	}
}
