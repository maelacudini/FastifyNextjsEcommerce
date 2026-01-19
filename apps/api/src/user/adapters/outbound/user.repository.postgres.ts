/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { User } from "@/user/domain/user.entity.js"
import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { CreateUserParamsType, CreateUserReturnType, CreateUserWithAuthParamsType, DeleteUserParamsType, DeleteUserReturnType, FindAllUsersReturnType, FindUserByEmailParamsType, FindUserByEmailReturnType, FindUserByIdParamsType, FindUserByIdReturnType, UpdateUserCartParamsType, UpdateUserCartReturnType, UpdateUserFavoritesParamsType, UpdateUserFavoritesReturnType, UpdateUserIsDisabledParamsType, UpdateUserIsDisabledReturnType, UpdateUserMarketingOptInParamsType, UpdateUserMarketingOptInReturnType, UpdateUserParamsType, UpdateUserReturnType, UpdateUserRoleParamsType, UpdateUserRoleReturnType } from "@/user/types.js"
import type { FastifyInstance } from "fastify"

export class PostgresUserRepository implements UserRepositoryPort {
	constructor( private fastify: FastifyInstance ) {}

	async findAllUsers(): Promise<FindAllUsersReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<User>( `
					SELECT *
					FROM users
				` )

			return {
				items: rows,
				limit: 1,
				page: 1,
				total: 1,
				totalPages: 1
			}
		} finally {
			client.release()
		}
	}

	async findUserById( data: FindUserByIdParamsType ): Promise<FindUserByIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findUserByEmail( data: FindUserByEmailParamsType ): Promise<FindUserByEmailReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<User>( `
					SELECT *
					FROM users
					WHERE email = $1
					LIMIT 1
				`, [data.email]
			)

			return rows[0] || undefined
		} finally {
			client.release()
		}
	}

	async createUser( data: CreateUserParamsType ): Promise<CreateUserReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<CreateUserReturnType>( `
					INSERT INTO users (email, role, is_disabled, created_at)
					VALUES ($1, $2, $3, NOW())
					RETURNING *
				`, [data.email, data.role, false]
			)

			if ( !rows[0] ) {
				throw new Error( "Failed to create user" )
			}

			return rows[0]
		} finally {
			client.release()
		}
	}

	async createUserWithAuth( data: CreateUserWithAuthParamsType ): Promise<CreateUserReturnType> {
		throw new Error( "Method not implemented." )
	}

	async deleteUser( data: DeleteUserParamsType ): Promise<DeleteUserReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateUser( data: UpdateUserParamsType ): Promise<UpdateUserReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateUserFavorites( data: UpdateUserFavoritesParamsType ): Promise<UpdateUserFavoritesReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateUserIsDisabled( data: UpdateUserIsDisabledParamsType ): Promise<UpdateUserIsDisabledReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateUserRole( data: UpdateUserRoleParamsType ): Promise<UpdateUserRoleReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateUserMarketingOptIn( data: UpdateUserMarketingOptInParamsType ): Promise<UpdateUserMarketingOptInReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateUserCart( data: UpdateUserCartParamsType ): Promise<UpdateUserCartReturnType> {
		throw new Error( "Method not implemented." )
	}
}