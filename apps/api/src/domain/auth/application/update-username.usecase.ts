import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { UpdateUsernameParamsType } from "../types.js"

export class UpdateUsernameUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: UpdateUsernameParamsType ) {
		return this.authRepo.updateUsername( { id: data.id, username: data.username } )
	}
}