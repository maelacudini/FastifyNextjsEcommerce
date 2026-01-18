import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { UpdatePasswordParamsType } from "../types.js"

export class UpdatePasswordUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: UpdatePasswordParamsType ) {
		return this.authRepo.updatePassword( { id: data.id, password: data.password } )
	}
}