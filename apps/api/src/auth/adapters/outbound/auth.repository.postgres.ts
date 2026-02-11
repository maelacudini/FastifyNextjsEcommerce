/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { AuthRepositoryPort } from "@/auth/domain/auth.repository.port.js"
import type { CreateAuthParamsType, CreateAuthReturnType, FindByIdParamsType, FindByIdReturnType, FindByUserIdParamsType, FindByUserIdReturnType, FindByUsernameParamsType, FindByUsernameReturnType, IncrementRefreshTokenVersionParamsType, IncrementRefreshTokenVersionReturnType, LoginParamsType, LoginReturnType, LogoutReturnType, UpdateEmailVerifiedAtParamsType, UpdateEmailVerifiedAtReturnType, UpdateLastLoginAtParamsType, UpdateLastLoginAtReturnType, UpdatePasswordParamsType, UpdatePasswordReturnType, UpdateUsernameParamsType, UpdateUsernameReturnType } from "@/auth/types.js"
import type { FastifyInstance } from "fastify"

export class PostgresAuthRepository implements AuthRepositoryPort {
	constructor( private fastify: FastifyInstance ) {}

	async findById( data: FindByIdParamsType ): Promise<FindByIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findByUserId( data: FindByUserIdParamsType ): Promise<FindByUserIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async createAuth( data: CreateAuthParamsType ): Promise<CreateAuthReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<CreateAuthReturnType>( `
					INSERT INTO auth (user_id, provider, password_hash, refresh_token_version, created_at)
					VALUES ($1, $2, $3, $4, NOW())
					RETURNING
						id,
						user_id AS "userId",
						provider,
						refresh_token_version AS "refreshTokenVersion",
						username,
						password_hash AS "passwordHash",
						email_verified_at AS "emailVerifiedAt",
						last_login_at AS "lastLoginAt",
						last_password_change_at AS "lastPasswordChangeAt",
						created_at AS "createdAt"
				`, [data.userId, data.provider, data.passwordHash ?? null, 0]
			)

			if ( !rows[0] ) {
				throw new Error( "Failed to create auth" )
			}

			return rows[0]
		} finally {
			client.release()
		}
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