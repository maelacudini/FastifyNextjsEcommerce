import type { BiscuitRepositoryPort } from "../domain/buiscuit.repository.ports.js"
import type { BiscuitId } from "../types.js"

export class FindBiscuitByIdUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( id: BiscuitId ) {
		const biscuits = await this.biscuitRepo.findBiscuitById( { id } )

		return biscuits
	}
}
