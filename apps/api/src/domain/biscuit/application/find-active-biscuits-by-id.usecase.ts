import type { BiscuitRepositoryPort } from "../domain/biscuit.repository.ports.js"
import type { FindActiveBiscuitByIdParamsType } from "../types.js"

export class FindActiveBiscuitsByIdUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( data: FindActiveBiscuitByIdParamsType ) {
		const { id } = data

		const biscuits = await this.biscuitRepo.findActiveBiscuitById( { id } )

		return biscuits
	}
}
