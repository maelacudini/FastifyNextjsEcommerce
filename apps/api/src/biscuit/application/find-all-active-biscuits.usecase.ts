import type { BiscuitRepositoryPort } from "../domain/biscuit.repository.ports.js"
import type { FindAllActiveBiscuitsParamsType } from "../types.js"

export class FindAllActiveBiscuitsUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( data: FindAllActiveBiscuitsParamsType ) {
		const biscuits = await this.biscuitRepo.findAllActiveBiscuits( data )

		return biscuits
	}
}
