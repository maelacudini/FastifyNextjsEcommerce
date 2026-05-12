import type { BiscuitRepositoryPort } from "../domain/biscuit.repository.ports.js"
import type { UpdateBiscuitParamsType } from "../types.js"

export class UpdateBiscuitUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( data: UpdateBiscuitParamsType ) {
		const biscuits = await this.biscuitRepo.updateBiscuit( data )

		return biscuits
	}
}
