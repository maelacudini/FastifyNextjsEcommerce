import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { IncrementRefreshTokenVersionParamsType } from "../types.js"

export class IncrementRefreshTokenVersionUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: IncrementRefreshTokenVersionParamsType ) {
		return this.authRepo.incrementRefreshTokenVersion( { id: data.id, refreshTokenVersion: data.refreshTokenVersion } )
	}
}