import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { FindByUserIdParamsType } from "../types.js"

export class FindByUserIdUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: FindByUserIdParamsType ) {
		return this.authRepo.findByUserId( { userId: data.userId } )
	}
}