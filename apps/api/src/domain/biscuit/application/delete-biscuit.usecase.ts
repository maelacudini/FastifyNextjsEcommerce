import type { BiscuitRepositoryPort } from "../domain/biscuit.repository.ports.js"
import type { DeleteBiscuitParamsType } from "../types.js"

export class DeleteBiscuitUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute( data: DeleteBiscuitParamsType ) {
		const { id } = data

		const biscuits = await this.biscuitRepo.deleteBiscuit( { id } )

		return biscuits
	}
}
