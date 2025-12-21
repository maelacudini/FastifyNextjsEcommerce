import type { BiscuitRepositoryPort } from "../domain/buiscuit.repository.ports.js"

export class FindAllActiveBiscuitsUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute() {
		const biscuits = await this.biscuitRepo.findAllActiveBiscuits()

		return biscuits
	}
}
