import type { BiscuitRepositoryPort } from "../domain/buiscuit.repository.ports.js"
import type { DisableBiscuitParams } from "../types.js"

export class SetBiscuitDisabledUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( params: DisableBiscuitParams ) {
		const biscuits = await this.biscuitRepo.setBiscuitDisabled( params )

		return biscuits
	}
}
