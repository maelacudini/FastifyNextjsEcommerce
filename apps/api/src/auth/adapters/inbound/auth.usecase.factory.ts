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

export default function createAuthUsecases( fastify: FastifyInstance ) {
	const authRepo = new PostgresAuthRepository( fastify )

	const findByIdUseCase = new FindByIdUseCase( authRepo )
	const findByUserIdUseCase = new FindByUserIdUseCase( authRepo )
	const incrementRefreshTokenVersionUseCase = new IncrementRefreshTokenVersionUseCase( authRepo )
	const findByUsernameUseCase = new FindByUsernameUseCase( authRepo )
	const updateUsernameUseCase = new UpdateUsernameUseCase( authRepo )
	const updatePasswordUseCase = new UpdatePasswordUseCase( authRepo )
	const updateUserEmailVerifiedAtUseCase = new UpdateUserEmailVerifiedAtUseCase( authRepo )
	const updateLastLoginAtUseCase = new UpdateLastLoginAtUseCase( authRepo )
	const loginUseCase = new LoginUseCase( authRepo )
	const logoutUseCase = new LogoutUseCase( authRepo )

	return {
		findByIdUseCase,
		findByUserIdUseCase,
		incrementRefreshTokenVersionUseCase,
		findByUsernameUseCase,
		updateUsernameUseCase,
		updatePasswordUseCase,
		updateUserEmailVerifiedAtUseCase,
		updateLastLoginAtUseCase,
		loginUseCase,
		logoutUseCase
	}
}