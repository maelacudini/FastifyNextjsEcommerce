import type { BiscuitRepositoryPort } from "../domain/biscuit.repository.ports.js"
import type { FindAllBiscuitsParamsType } from "../types.js"

export class FindAllBiscuitsUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( data: FindAllBiscuitsParamsType ) {
		const biscuits = await this.biscuitRepo.findAllBiscuits( data )

		return biscuits
	}
}
