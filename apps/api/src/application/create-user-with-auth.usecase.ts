import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { CreateUserWithAuthParamsType } from "./types.js"
import type { AuthRepositoryPort } from "@/auth/domain/auth.repository.port.js"
import type { PasswordHasherPort } from "@/auth/domain/password-hasher.port.js"

export class CreateUserWithAuthUseCase {
	constructor(
		private readonly userRepo: UserRepositoryPort,
		private readonly authRepo: AuthRepositoryPort,
		private readonly passwordHasher: PasswordHasherPort
	) {}

	async execute( data: CreateUserWithAuthParamsType ) {
		const email = data.email.trim().toLowerCase()

		if ( await this.userRepo.findUserByEmail( { email } ) ) {
			throw new Error( "User already exists" )
		}

		const user = await this.userRepo.createUser( {
			email,
			role: data.role || "user",
		} )

		if ( data.provider === "local" ) {
			if ( !data.password ) {
				throw new Error( "Password is required for local auth" )
			}

			const hash = await this.passwordHasher.hash( data.password )

			await this.authRepo.createAuth( {
				userId: user.id,
				provider: "local",
				passwordHash: hash,
			} )
		} else {
			await this.authRepo.createAuth( {
				userId: user.id,
				provider: data.provider,
			} )
		}

		return user
	}
}
