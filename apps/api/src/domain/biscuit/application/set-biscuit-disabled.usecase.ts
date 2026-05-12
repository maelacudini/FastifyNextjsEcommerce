import type { BiscuitRepositoryPort } from "../domain/biscuit.repository.ports.js"
import type { DisableBiscuitParamsType } from "../types.js"

export class SetBiscuitDisabledUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( data: DisableBiscuitParamsType ) {
		const biscuits = await this.biscuitRepo.setBiscuitDisabled( data )

		return biscuits
	}
}
