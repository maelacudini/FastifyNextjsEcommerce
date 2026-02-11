import type { FastifyInstance } from "fastify"
import { PostgresAuthRepository } from "../outbound/auth.repository.postgres.js"
import { LoginUseCase } from "@/auth/application/login.usecase.js"
import { LogoutUseCase } from "@/auth/application/logout.usecase.js"
import { FindByIdUseCase } from "@/auth/application/find-by-id.usecase.js"
import { FindByUserIdUseCase } from "@/auth/application/find-by-user-id.usecase.js"
import { IncrementRefreshTokenVersionUseCase } from "@/auth/application/increment-refresh-token-version.usecase.js"
import { FindByUsernameUseCase } from "@/auth/application/find-by-username.usecase.js"
import { UpdateUsernameUseCase } from "@/auth/application/update-username.usecase.js"
import { UpdatePasswordUseCase } from "@/auth/application/update-password.usecase.js"
import { UpdateUserEmailVerifiedAtUseCase } from "@/auth/application/update-email-verified-at.usecase.js"
import { UpdateLastLoginAtUseCase } from "@/auth/application/update-last-login-at.usecase.js"
import { CreateAuthUseCase } from "@/auth/application/create-auth.usecase.js"
import { CreateUserWithAuthUseCase } from "@/auth/application/create-user-with-auth.usecase.js"
import { BcryptPasswordHasherUseCase } from "@/auth/application/bcrypt-password-hasher.usecase.js"
import { PostgresUserRepository } from "@/user/adapters/outbound/user.repository.postgres.js"

export default function createAuthUsecases( fastify: FastifyInstance ) {
	const authRepo = new PostgresAuthRepository( fastify )
	const userRepo = new PostgresUserRepository( fastify )
	const passwordHasher = new BcryptPasswordHasherUseCase( 10 )

	const findByIdUseCase = new FindByIdUseCase( authRepo )
	const findByUserIdUseCase = new FindByUserIdUseCase( authRepo )
	const createAuthUseCase = new CreateAuthUseCase( authRepo )
	const incrementRefreshTokenVersionUseCase = new IncrementRefreshTokenVersionUseCase( authRepo )
	const findByUsernameUseCase = new FindByUsernameUseCase( authRepo )
	const updateUsernameUseCase = new UpdateUsernameUseCase( authRepo )
	const updatePasswordUseCase = new UpdatePasswordUseCase( authRepo )
	const updateUserEmailVerifiedAtUseCase = new UpdateUserEmailVerifiedAtUseCase( authRepo )
	const updateLastLoginAtUseCase = new UpdateLastLoginAtUseCase( authRepo )
	const loginUseCase = new LoginUseCase( authRepo )
	const logoutUseCase = new LogoutUseCase( authRepo )
	const createUserWithAuthUseCase = new CreateUserWithAuthUseCase( userRepo, authRepo, passwordHasher )

	return {
		findByIdUseCase,
		findByUserIdUseCase,
		createAuthUseCase,
		incrementRefreshTokenVersionUseCase,
		findByUsernameUseCase,
		updateUsernameUseCase,
		updatePasswordUseCase,
		updateUserEmailVerifiedAtUseCase,
		updateLastLoginAtUseCase,
		loginUseCase,
		logoutUseCase,
		createUserWithAuthUseCase
	}
}
