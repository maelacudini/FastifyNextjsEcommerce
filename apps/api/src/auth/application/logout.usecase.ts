import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"

export class LogoutUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( ) {
		// TODO: IMPLEMENT USECASE

		return "method to be implemented"
	}
}
