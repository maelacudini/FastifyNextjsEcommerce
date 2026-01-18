/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { User } from "@/user/domain/user.entity.js"
import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { CreateUserParamsType, CreateUserReturnType, DeleteUserParamsType, DeleteUserReturnType, FindAllUsersReturnType, FindUserByEmailParamsType, FindUserByEmailReturnType, FindUserByIdParamsType, FindUserByIdReturnType, UpdateUserCartParamsType, UpdateUserCartReturnType, UpdateUserFavoritesParamsType, UpdateUserFavoritesReturnType, UpdateUserIsDisabledParamsType, UpdateUserIsDisabledReturnType, UpdateUserMarketingOptInParamsType, UpdateUserMarketingOptInReturnType, UpdateUserParamsType, UpdateUserReturnType, UpdateUserRoleParamsType, UpdateUserRoleReturnType } from "@/user/types.js"
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
		throw new Error( "Method not implemented." )
	}

	async createUser( data: CreateUserParamsType ): Promise<CreateUserReturnType> {
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