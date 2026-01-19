import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { CreateUserWithAuthParamsType } from "@/user/types.js"

export class CreateUserWithAuthUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: CreateUserWithAuthParamsType ) {
		if ( !data ) {
			throw new Error( "Email, role, password and provider are needed" )
		}

		const email = data.email.trim().toLowerCase()

		const existing = await this.userRepo.findUserByEmail( { email } )
		if ( existing ) {
			throw new Error( "User already exists" )
		}

		const user = await this.userRepo.createUserWithAuth( {
			email: data.email,
			password: data.password,
			role: data.role || "user",
			provider: data.provider || "local",
		} )

		return user
	}
}
