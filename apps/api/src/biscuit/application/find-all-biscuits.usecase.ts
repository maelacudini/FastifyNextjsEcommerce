import type { BiscuitRepositoryPort } from "../domain/buiscuit.repository.ports.js"

export class FindAllBiscuitsUseCase {
	constructor( private readonly biscuitRepo: BiscuitRepositoryPort ) {}

	async execute() {
		const biscuits = await this.biscuitRepo.findAllBiscuits()

		return biscuits
	}
}
