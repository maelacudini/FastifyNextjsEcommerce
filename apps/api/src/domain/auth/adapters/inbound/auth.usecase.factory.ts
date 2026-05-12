import type { FastifyInstance } from "fastify"
import { PostgresAuthRepository } from "../outbound/auth.repository.postgres.js"
import { LoginUseCase } from "@/domain/auth/application/login.usecase.js"
import { LogoutUseCase } from "@/domain/auth/application/logout.usecase.js"
import { FindByIdUseCase } from "@/domain/auth/application/find-by-id.usecase.js"
import { FindByUserIdUseCase } from "@/domain/auth/application/find-by-user-id.usecase.js"
import { IncrementRefreshTokenVersionUseCase } from "@/domain/auth/application/increment-refresh-token-version.usecase.js"
import { FindByUsernameUseCase } from "@/domain/auth/application/find-by-username.usecase.js"
import { UpdateUsernameUseCase } from "@/domain/auth/application/update-username.usecase.js"
import { UpdatePasswordUseCase } from "@/domain/auth/application/update-password.usecase.js"
import { UpdateUserEmailVerifiedAtUseCase } from "@/domain/auth/application/update-email-verified-at.usecase.js"
import { UpdateLastLoginAtUseCase } from "@/domain/auth/application/update-last-login-at.usecase.js"
import { CreateAuthUseCase } from "@/domain/auth/application/create-auth.usecase.js"
import { PostgresUserRepository } from "@/domain/user/adapters/outbound/user.repository.postgres.js"
import { BcryptPasswordHasher } from "@/domain/auth/adapters/outbound/bcrypt-password-hasher.adapter.js"
import { CreateUserWithAuthUseCase } from "@/domain/auth/application/create-user-with-auth.usecase.js"

export default function createAuthUsecases( fastify: FastifyInstance ) {
	const authRepo = new PostgresAuthRepository( fastify )
	const userRepo = new PostgresUserRepository( fastify )
	const passwordHasher = new BcryptPasswordHasher()

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
		createUserWithAuthUseCase,
	}
}
