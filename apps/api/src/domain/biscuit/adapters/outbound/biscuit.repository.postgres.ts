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
import { biscuitSelectFields } from "@/domain/biscuit/const.js"
import { buildPaginatedResult, getPaginationMeta, normalizePagination } from "@/lib/utils/pagination.js"

export class PostgresBiscuitRepository implements BiscuitRepositoryPort {

	constructor( private fastify: FastifyInstance ) {}

	async findAllActiveBiscuits( data: FindAllActiveBiscuitsParamsType ): Promise<FindAllActiveBiscuitsReturnType> {
		const client = await this.fastify.pg.connect()

		try {
			const { requestedPage, limit } = normalizePagination( data )
			const { rows: countRows } = await client.query<{ total: number }>( `
				SELECT COUNT(*)::int AS total
				FROM biscuits
				WHERE COALESCE(is_disabled, FALSE) = FALSE
			` )
			const total = countRows[0]?.total ?? 0
			const { page, offset, totalPages } = getPaginationMeta( requestedPage, limit, total )

			const { rows } = await client.query<Biscuit>( `
				SELECT ${biscuitSelectFields}
				FROM biscuits
				WHERE COALESCE(is_disabled, FALSE) = FALSE
				ORDER BY created_at DESC
				LIMIT $1
				OFFSET $2
			`, [limit, offset] )

			return buildPaginatedResult( rows, { page, limit, total, totalPages } )
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
			const { requestedPage, limit } = normalizePagination( data )
			const { rows: countRows } = await client.query<{ total: number }>( `
				SELECT COUNT(*)::int AS total
				FROM biscuits
			` )
			const total = countRows[0]?.total ?? 0
			const { page, offset, totalPages } = getPaginationMeta( requestedPage, limit, total )

			const { rows } = await client.query<Biscuit>( `
				SELECT ${biscuitSelectFields}
				FROM biscuits
				ORDER BY created_at DESC
				LIMIT $1
				OFFSET $2
			`, [limit, offset] )

			return buildPaginatedResult( rows, { page, limit, total, totalPages } )
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
					base_price_minor,
					base_currency,
					ingredients,
					description,
					nutritional_values,
					images,
					created_at
				)
				VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::text[], NOW())
				RETURNING ${biscuitSelectFields}
			`, [
				data.name,
				data.basePriceMinor,
				data.baseCurrency,
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
					base_price_minor = $3,
					base_currency = $4,
					ingredients = $5,
					description = $6,
					nutritional_values = $7::jsonb,
					images = $8::text[],
					tags = COALESCE($9::text[], tags),
					is_disabled = COALESCE($10::boolean, is_disabled),
					updated_at = COALESCE($11::timestamptz, NOW())
				WHERE id = $1
				RETURNING ${biscuitSelectFields}
			`, [
				id,
				biscuit.name,
				biscuit.basePriceMinor,
				biscuit.baseCurrency,
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

}
