/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { AuthRepositoryPort } from "@/auth/domain/auth.repository.port.js"
import type { FindByIdParamsType, FindByIdReturnType, FindByUserIdParamsType, FindByUserIdReturnType, FindByUsernameParamsType, FindByUsernameReturnType, IncrementRefreshTokenVersionParamsType, IncrementRefreshTokenVersionReturnType, LoginParamsType, LoginReturnType, LogoutReturnType, UpdateEmailVerifiedAtParamsType, UpdateEmailVerifiedAtReturnType, UpdateLastLoginAtParamsType, UpdateLastLoginAtReturnType, UpdatePasswordParamsType, UpdatePasswordReturnType, UpdateUsernameParamsType, UpdateUsernameReturnType } from "@/auth/types.js"
import type { FastifyInstance } from "fastify"

export class PostgresAuthRepository implements AuthRepositoryPort {
	constructor( private fastify: FastifyInstance ) {}

	async findById( data: FindByIdParamsType ): Promise<FindByIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findByUserId( data: FindByUserIdParamsType ): Promise<FindByUserIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async incrementRefreshTokenVersion( data: IncrementRefreshTokenVersionParamsType ): Promise<IncrementRefreshTokenVersionReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findByUsername( data: FindByUsernameParamsType ): Promise<FindByUsernameReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateUsername( data: UpdateUsernameParamsType ): Promise<UpdateUsernameReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updatePassword( data: UpdatePasswordParamsType ): Promise<UpdatePasswordReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateUserEmailVerifiedAt( data: UpdateEmailVerifiedAtParamsType ): Promise<UpdateEmailVerifiedAtReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateLastLoginAt( data: UpdateLastLoginAtParamsType ): Promise<UpdateLastLoginAtReturnType> {
		throw new Error( "Method not implemented." )
	}

	async login( data: LoginParamsType ): Promise<LoginReturnType> {
		throw new Error( "Method not implemented." )
	}

	async logout(): Promise<LogoutReturnType> {
		throw new Error( "Method not implemented." )
	}
}