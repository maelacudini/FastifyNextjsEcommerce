import type { AuthRepositoryPort } from "@/auth/domain/auth.repository.port.js"
import type { PasswordHasherPort } from "@/auth/domain/password-hasher.port.js"
import type { CreateUserWithAuthParamsType, CreateUserWithAuthReturnType } from "@/auth/types.js"
import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"

export class CreateUserWithAuthUseCase {
	constructor(
		private readonly userRepo: UserRepositoryPort,
		private readonly authRepo: AuthRepositoryPort,
		private readonly passwordHasher: PasswordHasherPort
	) {}

	async execute( data: CreateUserWithAuthParamsType ): Promise<CreateUserWithAuthReturnType> {
		const email = data.email.trim().toLowerCase()

		if ( await this.userRepo.findUserByEmail( { email } ) ) {
			throw new Error( "User already exists" )
		}

		if ( data.provider === "local" && !data.password ) {
			throw new Error( "Password is required for local auth" )
		}

		const user = await this.userRepo.createUser( {
			email,
			role: data.role,
		} )

		const authPayload: {
			userId: string
			provider: CreateUserWithAuthParamsType["provider"]
			passwordHash?: string
		} = {
			userId: user.id,
			provider: data.provider,
		}

		if ( data.provider === "local" ) {
			authPayload.passwordHash = await this.passwordHasher.hash( data.password )
		}

		const auth = await this.authRepo.createAuth( authPayload )

		return {
			user,
			auth,
		}
	}
}
