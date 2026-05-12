import type { User } from "@/domain/user/domain/user.entity.js"
import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { CreateUserRequestType, CreateUserReturnType, DeleteUserRequestType, DeleteUserReturnType, FindAllUsersRequestType, FindAllUsersReturnType, FindUserByEmailRequestType, FindUserByEmailReturnType, FindUserByIdRequestType, FindUserByIdReturnType, UpdateUserCartParamsType, UpdateUserCartReturnType, UpdateUserFavoritesParamsType, UpdateUserFavoritesReturnType, UpdateUserIsDisabledParamsType, UpdateUserIsDisabledReturnType, UpdateUserMarketingOptInParamsType, UpdateUserMarketingOptInReturnType, UpdateUserParamsType, UpdateUserReturnType, UpdateUserRoleParamsType, UpdateUserRoleReturnType } from "@/domain/user/types.js"
import type { FastifyInstance } from "fastify"
import { userSelectFields } from "./const.js"
import { buildPaginatedResult, getPaginationMeta, normalizePagination } from "@/lib/utils/pagination.js"

export class PostgresUserRepository implements UserRepositoryPort {
	constructor( private fastify: FastifyInstance ) {}

	async findAllUsers( data: FindAllUsersRequestType ): Promise<FindAllUsersReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { limit, requestedPage } = normalizePagination( data )
			const { rows: countRows } = await client.query<{ total: number }>( `
				SELECT COUNT(*)::int AS total
				FROM users
			` )

			const total = countRows[0]?.total ?? 0
			const { page, offset, totalPages } = getPaginationMeta( requestedPage, limit, total )

			const { rows } = await client.query<User>( `
				SELECT
					${userSelectFields}
				FROM users
				ORDER BY created_at DESC
				LIMIT $1
				OFFSET $2
			`, [limit, offset] )

			return buildPaginatedResult( rows, { page, limit, total, totalPages } )
		} finally {
			client.release()
		}
	}

	async findUserById( data: FindUserByIdRequestType ): Promise<FindUserByIdReturnType> {
		return this.findOneById( data.id )
	}

	async findUserByEmail( data: FindUserByEmailRequestType ): Promise<FindUserByEmailReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<User>( `
					SELECT 
						${userSelectFields}
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

	async createUser( data: CreateUserRequestType ): Promise<CreateUserReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<CreateUserReturnType>( `
					INSERT INTO users (email, role, is_disabled, created_at)
					VALUES ($1, $2, $3, NOW())
					RETURNING
						${userSelectFields}
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


	async deleteUser( data: DeleteUserRequestType ): Promise<DeleteUserReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<User>( `
				DELETE FROM users
				WHERE id = $1
				RETURNING ${userSelectFields}
			`, [data.id] )

			return rows[0] ?? undefined
		} finally {
			client.release()
		}
	}

	// eslint-disable-next-line max-statements
	async updateUser( data: UpdateUserParamsType ): Promise<UpdateUserReturnType> {
		const updates: string[] = []
		const values: unknown[] = [data.id]

		if ( data.user.email !== undefined ) {
			values.push( data.user.email )
			updates.push( `email = $${values.length}` )
		}

		if ( data.user.address !== undefined ) {
			values.push( data.user.address ? JSON.stringify( data.user.address ) : null )
			updates.push( `address = $${values.length}::jsonb` )
		}

		if ( data.user.phone !== undefined ) {
			values.push( data.user.phone )
			updates.push( `phone = $${values.length}` )
		}

		if ( data.user.firstName !== undefined ) {
			values.push( data.user.firstName )
			updates.push( `first_name = $${values.length}` )
		}

		if ( data.user.lastName !== undefined ) {
			values.push( data.user.lastName )
			updates.push( `last_name = $${values.length}` )
		}

		if ( updates.length === 0 ) {
			throw new Error( "No user fields provided for update" )
		}

		updates.push( "updated_at = NOW()" )

		return this.updateAndReturn( `
			UPDATE users
			SET
				${updates.join( ",\n\t\t\t\t" )}
			WHERE id = $1
			RETURNING ${userSelectFields}
		`, values )
	}

	async updateUserFavorites( data: UpdateUserFavoritesParamsType ): Promise<UpdateUserFavoritesReturnType> {
		return this.updateAndReturn( `
			UPDATE users
			SET
				favorites = $2::text[],
				updated_at = NOW()
			WHERE id = $1
			RETURNING ${userSelectFields}
		`, [data.id, data.favorites] )
	}

	async updateUserIsDisabled( data: UpdateUserIsDisabledParamsType ): Promise<UpdateUserIsDisabledReturnType> {
		return this.updateAndReturn( `
			UPDATE users
			SET
				is_disabled = $2,
				updated_at = NOW()
			WHERE id = $1
			RETURNING ${userSelectFields}
		`, [data.id, data.isDisabled] )
	}

	async updateUserRole( data: UpdateUserRoleParamsType ): Promise<UpdateUserRoleReturnType> {
		return this.updateAndReturn( `
			UPDATE users
			SET
				role = $2,
				updated_at = NOW()
			WHERE id = $1
			RETURNING ${userSelectFields}
		`, [data.id, data.role] )
	}

	async updateUserMarketingOptIn( data: UpdateUserMarketingOptInParamsType ): Promise<UpdateUserMarketingOptInReturnType> {
		return this.updateAndReturn( `
			UPDATE users
			SET
				marketing_opt_in = $2,
				updated_at = NOW()
			WHERE id = $1
			RETURNING ${userSelectFields}
		`, [data.id, data.marketingOptIn] )
	}

	async updateUserCart( data: UpdateUserCartParamsType ): Promise<UpdateUserCartReturnType> {
		return this.updateAndReturn( `
			UPDATE users
			SET
				cart = $2::text[],
				updated_at = NOW()
			WHERE id = $1
			RETURNING ${userSelectFields}
		`, [data.id, data.cart] )
	}

	private async findOneById( id: User["id"] ): Promise<User | undefined> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<User>( `
				SELECT ${userSelectFields}
				FROM users
				WHERE id = $1
				LIMIT 1
			`, [id] )

			return rows[0] ?? undefined
		} finally {
			client.release()
		}
	}

	private async updateAndReturn<T extends User>( query: string, values: unknown[] ): Promise<T> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<T>( query, values )

			if ( !rows[0] ) {
				throw new Error( "User not found" )
			}

			return rows[0]
		} finally {
			client.release()
		}
	}
}
