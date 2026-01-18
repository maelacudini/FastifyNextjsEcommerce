import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { UpdateLastLoginAtParamsType } from "../types.js"

export class UpdateLastLoginAtUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: UpdateLastLoginAtParamsType ) {
		return this.authRepo.updateLastLoginAt( { id: data.id, lastPasswordChangeAt: data.lastPasswordChangeAt } )
	}
}