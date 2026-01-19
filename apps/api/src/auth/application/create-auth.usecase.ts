import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { CreateAuthParamsType } from "../types.js"

export class CreateAuthUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: CreateAuthParamsType ) {
		return this.authRepo.createAuth( data )
	}
}