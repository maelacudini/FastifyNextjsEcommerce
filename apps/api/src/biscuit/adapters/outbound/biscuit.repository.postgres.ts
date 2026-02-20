import type { FastifyInstance } from "fastify"
import type { BiscuitRepositoryPort } from "../../domain/biscuit.repository.ports.js"
import type {
	BiscuitId,
	CreateBiscuitParamsType,
	CreateBiscuitReturnType,
	DeleteBiscuitParamsType,
	DeleteBiscuitReturnType,
	DisableBiscuitParamsType,
	FindAllActiveBiscuitsParamsType,
	FindActiveBiscuitByIdParamsType,
	FindActiveBiscuitByIdReturnType,
	FindAllActiveBiscuitsReturnType,
	FindAllBiscuitsParamsType,
	FindAllBiscuitsReturnType,
	FindBiscuitByIdParamsType,
	FindBiscuitByIdReturnType,
	SetBiscuitDisabledReturnType,
	UpdateBiscuitParamsType,
	UpdateBiscuitReturnType
} from "../../types.js"
import type { Biscuit } from "../../domain/biscuit.entity.js"
import { paginationDefaultLimit } from "@/const.js"
import { biscuitSelectFields } from "@/biscuit/const.js"

export class PostgresBiscuitRepository implements BiscuitRepositoryPort {

	constructor( private fastify: FastifyInstance ) {}

	async findAllActiveBiscuits( data: FindAllActiveBiscuitsParamsType ): Promise<FindAllActiveBiscuitsReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { page, limit, offset } = this.normalizePagination( data )
			const { rows: countRows } = await client.query<{ total: number }>( `
				SELECT COUNT(*)::int AS total
				FROM biscuits
				WHERE COALESCE(is_disabled, FALSE) = FALSE
			` )

			const { rows } = await client.query<Biscuit>( `
				SELECT ${biscuitSelectFields}
				FROM biscuits
				WHERE COALESCE(is_disabled, FALSE) = FALSE
				ORDER BY created_at DESC
				LIMIT $1
				OFFSET $2
			`, [limit, offset] )

			const total = countRows[0]?.total ?? 0
			return {
				items: rows,
				page,
				limit,
				total,
				totalPages: total === 0 ? 0 : Math.ceil( total / limit )
			}
		} finally {
			client.release()
		}
	}

	async findActiveBiscuitById( data: FindActiveBiscuitByIdParamsType ): Promise<FindActiveBiscuitByIdReturnType> {
		return this.findOneById( data.id, true )
	}

	async findAllBiscuits( data: FindAllBiscuitsParamsType ): Promise<FindAllBiscuitsReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { page, limit, offset } = this.normalizePagination( data )
			const { rows: countRows } = await client.query<{ total: number }>( `
				SELECT COUNT(*)::int AS total
				FROM biscuits
			` )

			const { rows } = await client.query<Biscuit>( `
				SELECT ${biscuitSelectFields}
				FROM biscuits
				ORDER BY created_at DESC
				LIMIT $1
				OFFSET $2
			`, [limit, offset] )

			const total = countRows[0]?.total ?? 0
			return {
				items: rows,
				page,
				limit,
				total,
				totalPages: total === 0 ? 0 : Math.ceil( total / limit )
			}
		} finally {
			client.release()
		}
	}

	async findBiscuitById( data: FindBiscuitByIdParamsType ): Promise<FindBiscuitByIdReturnType> {
		return this.findOneById( data.id )
	}

	async createBiscuit( data: CreateBiscuitParamsType ): Promise<CreateBiscuitReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<CreateBiscuitReturnType>( `
				INSERT INTO biscuits (
					name,
					price,
					ingredients,
					description,
					nutritional_values,
					images,
					created_at
				)
				VALUES ($1, $2, $3, $4, $5::jsonb, $6::text[], NOW())
				RETURNING ${biscuitSelectFields}
			`, [
				data.name,
				data.price,
				data.ingredients,
				data.description,
				JSON.stringify( data.nutritionalValues ),
				data.images,
			] )

			if ( !rows[0] ) {
				throw new Error( "Failed to create biscuit" )
			}

			return rows[0]
		} finally {
			client.release()
		}
	}

	async updateBiscuit( data: UpdateBiscuitParamsType ): Promise<UpdateBiscuitReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { id, biscuit } = data
			const { rows } = await client.query<UpdateBiscuitReturnType>( `
				UPDATE biscuits
				SET
					name = $2,
					price = $3,
					ingredients = $4,
					description = $5,
					nutritional_values = $6::jsonb,
					images = $7::text[],
					tags = COALESCE($8::text[], tags),
					is_disabled = COALESCE($9::boolean, is_disabled),
					updated_at = COALESCE($10::timestamptz, NOW())
				WHERE id = $1
				RETURNING ${biscuitSelectFields}
			`, [
				id,
				biscuit.name,
				biscuit.price,
				biscuit.ingredients,
				biscuit.description,
				JSON.stringify( biscuit.nutritionalValues ),
				biscuit.images,
				biscuit.tags ?? null,
				biscuit.isDisabled ?? null,
				biscuit.updatedAt ?? null
			] )

			if ( !rows[0] ) {
				throw new Error( "Biscuit not found" )
			}

			return rows[0]
		} finally {
			client.release()
		}
	}

	async deleteBiscuit( data: DeleteBiscuitParamsType ): Promise<DeleteBiscuitReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<Biscuit>( `
				DELETE FROM biscuits
				WHERE id = $1
				RETURNING ${biscuitSelectFields}
			`, [data.id] )

			return rows[0] ?? undefined
		} finally {
			client.release()
		}
	}

	async setBiscuitDisabled( data: DisableBiscuitParamsType ): Promise<SetBiscuitDisabledReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { rows } = await client.query<SetBiscuitDisabledReturnType>( `
				UPDATE biscuits
				SET
					is_disabled = $2,
					updated_at = NOW()
				WHERE id = $1
				RETURNING ${biscuitSelectFields}
			`, [data.id, data.isDisabled] )

			if ( !rows[0] ) {
				throw new Error( "Biscuit not found" )
			}

			return rows[0]
		} finally {
			client.release()
		}
	}

	private async findOneById( id: BiscuitId, onlyActive = false ): Promise<Biscuit | undefined> {
		const client = await this.fastify.pg.connect()

		try {
			const activeClause = onlyActive ? "AND COALESCE(is_disabled, FALSE) = FALSE" : ""
			const { rows } = await client.query<Biscuit>( `
				SELECT ${biscuitSelectFields}
				FROM biscuits
				WHERE id = $1
				${activeClause}
				LIMIT 1
			`, [id] )

			return rows[0] ?? undefined
		} finally {
			client.release()
		}
	}

	private normalizePagination( data: { page?: number, limit?: number } ) {
		const page = data.page && data.page > 0 ? Math.floor( data.page ) : 1
		const limit = data.limit && data.limit > 0 ? Math.floor( data.limit ) : paginationDefaultLimit
		const offset = ( page - 1 ) * limit

		return { page, limit, offset }
	}
}
