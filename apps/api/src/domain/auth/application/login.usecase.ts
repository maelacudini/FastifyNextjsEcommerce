import type { AuthRepositoryPort } from "../domain/auth.repository.port.js"
import type { LoginParamsType } from "../types.js"

export class LoginUseCase {
	constructor( private readonly authRepo: AuthRepositoryPort ) {}

	async execute( data: LoginParamsType ) {

		// TODO: HERE CALL ALL AuthRepositoryPort METHODS TO ACTUALLY LOG IN
		// LOOK FOR THE USER, CHECK IF PASSWORDS MATCH, UPDATE LASTLOGINAT, ETC...

		if ( !data.username || !data.password ) {
			throw new Error( "Email and password are required" )
		}

		const userExists = await this.authRepo.findByUsername( { username: data.username } )
		const passwordsMatch = true

		if ( userExists && passwordsMatch ) {
			return userExists
		}

		return null
	}
}
