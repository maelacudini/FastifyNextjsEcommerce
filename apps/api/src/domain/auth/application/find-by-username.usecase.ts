import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { FindByUsernameParamsType } from "../types.js"

export class FindByUsernameUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: FindByUsernameParamsType ) {
		return this.authRepo.findByUsername( { username: data.username } )
	}
}