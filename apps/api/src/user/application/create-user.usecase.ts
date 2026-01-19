import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { CreateUserParamsType } from "@/user/types.js"

export class CreateUserUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: CreateUserParamsType ) {
		if ( !data ) {
			throw new Error( "Email and role are needed" )
		}

		const email = data.email.trim().toLowerCase()

		const existing = await this.userRepo.findUserByEmail( { email } )
		if ( existing ) {
			throw new Error( "User already exists" )
		}

		const user = await this.userRepo.createUser( {
			...data,
			email,
			role: data.role
		} )

		return user
	}
}
