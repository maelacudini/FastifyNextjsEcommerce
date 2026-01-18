import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { UpdateEmailVerifiedAtParamsType } from "../types.js"

// The usecase has one responsibility: orchestrate the update (in this case).
// It doesn’t do validation, hashing, or DB connections — that’s handled either in the controller (validation) or the repository (DB).

export class UpdateUserEmailVerifiedAtUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: UpdateEmailVerifiedAtParamsType ) {
		return this.authRepo.updateUserEmailVerifiedAt( { id: data.id, emailVerifiedAt: data.emailVerifiedAt } )
	}
}