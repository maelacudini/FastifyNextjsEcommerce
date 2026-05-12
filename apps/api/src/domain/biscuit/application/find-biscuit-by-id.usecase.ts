import type { BiscuitRepositoryPort } from "../domain/biscuit.repository.ports.js"
import type { FindBiscuitByIdParamsType } from "../types.js"

export class FindBiscuitByIdUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( data: FindBiscuitByIdParamsType ) {
		const { id } = data

		const biscuits = await this.biscuitRepo.findBiscuitById( { id } )

		return biscuits
	}
}
