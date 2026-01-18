import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { FindByIdParamsType } from "../types.js"

export class FindByIdUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: FindByIdParamsType ) {
		return this.authRepo.findById( { id: data.id } )
	}
}