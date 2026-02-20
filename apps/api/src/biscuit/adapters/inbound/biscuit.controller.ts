import { errorSchemas } from "@/const.js"
import type { FastifyInstance } from "fastify"
import type { FromSchema } from "json-schema-to-ts"
import schemas from "./biscuit.schema.js"
import createBiscuitUsecases from "./biscuit.usecase.factory.js"
import type { ReplyType } from "@/types.js"
import type {
	CreateBiscuitReturnType,
	DeleteBiscuitReturnType,
	UpdateBiscuitReturnType,
	FindAllBiscuitsReturnType,
	FindBiscuitByIdReturnType,
	SetBiscuitDisabledReturnType,
	FindActiveBiscuitByIdReturnType,
	FindAllActiveBiscuitsReturnType,
} from "@/biscuit/types.js"

export async function biscuitController( fastify: FastifyInstance ) {

	const usecasesFactory = createBiscuitUsecases( fastify )

	// PUBLIC - FIND ALL ACTIVE BISCUITS
	fastify.get<{
		Querystring: FromSchema<typeof schemas.findAllActiveBiscuitsQuerySchema>,
		Reply: ReplyType<FindAllActiveBiscuitsReturnType>
	}>( "/biscuit/active", { schema: {
		tags: ["Biscuit"],
		querystring: schemas.findAllActiveBiscuitsQuerySchema,
		response: {
			200: schemas.findAllActiveBiscuitsSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllActiveBiscuits.execute( req.query )

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - FIND ACTIVE BISCUIT BY ID
	fastify.get<{
		Params: FromSchema<typeof schemas.findActiveBiscuitByIdParamsSchema>,
		Reply: ReplyType<FindActiveBiscuitByIdReturnType>
	}>( "/biscuit/active/:id", { schema: {
		tags: ["Biscuit"],
		params: schemas.findActiveBiscuitByIdParamsSchema,
		response: {
			200: schemas.findActiveBiscuitByIdSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params

		const biscuit = await usecasesFactory.findActiveBiscuitsById.execute( { id } )

		if ( !biscuit ) {
			return reply.code( 404 ).send( { error: "Biscuit not found" } )
		}

		return reply.code( 200 ).send( biscuit )
	} )

	// PRIVATE - FIND ALL BISCUITS (ACTIVE AND NON ACTIVE)
	fastify.get<{
		Querystring: FromSchema<typeof schemas.findAllBiscuitsQuerySchema>,
		Reply: ReplyType<FindAllBiscuitsReturnType>
	}>( "/biscuit", { schema: {
		tags: ["Biscuit"],
		querystring: schemas.findAllBiscuitsQuerySchema,
		response: {
			200: schemas.findAllBiscuitsSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllBiscuits.execute( req.query )

		return reply.code( 200 ).send( data )
	} )

	// PRIVATE - FIND BISCUIT BY ID (ACTIVE AND NON ACTIVE)
	fastify.get<{
		Params: FromSchema<typeof schemas.findBiscuitByIdParamsSchema>,
		Reply: ReplyType<FindBiscuitByIdReturnType>
	}>( "/biscuit/:id", { schema: {
		tags: ["Biscuit"],
		params: schemas.findBiscuitByIdParamsSchema,
		response: {
			200: schemas.findBiscuitByIdSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params

		const biscuit = await usecasesFactory.findBiscuitById.execute( { id } )

		if ( !biscuit ) {
			return reply.code( 404 ).send( { error: "Biscuit not found" } )
		}

		return reply.code( 200 ).send( biscuit )
	} )

	// PRIVATE - CREATE BISCUIT
	fastify.post<{
		Body: FromSchema<typeof schemas.createBiscuitBodySchema>,
		Reply: ReplyType<CreateBiscuitReturnType>
	}>( "/biscuit", { schema: {
		tags: ["Biscuit"],
		body: schemas.createBiscuitBodySchema,
		response: {
			200: schemas.createBiscuitSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = req.body

		try {
			const newBiscuit = await usecasesFactory.createBiscuit.execute( data )

			return reply.code( 200 ).send( newBiscuit )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - UPDATE BISCUIT
	fastify.put<{
		Params: FromSchema<typeof schemas.updateBiscuParamsSchema>,
		Body: FromSchema<typeof schemas.updateBiscuitBodySchema>,
		Reply: ReplyType<UpdateBiscuitReturnType>
	}>( "/biscuit/:id", { schema: {
		tags: ["Biscuit"],
		params: schemas.updateBiscuParamsSchema,
		body: schemas.updateBiscuitBodySchema,
		response: {
			200: schemas.updateBiscuitSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params
		const { biscuit } = req.body

		try {
			const updated = await usecasesFactory.updateBiscuit.execute( { id, biscuit } )

			return reply.code( 200 ).send( updated )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			if ( errorMessage === "Biscuit not found" ) {
				return reply.code( 404 ).send( { error: errorMessage } )
			}

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - DELETE BISCUIT
	fastify.delete<{
		Params: FromSchema<typeof schemas.deleteBiscuitParamsSchema>,
		Reply: ReplyType<DeleteBiscuitReturnType>
	}>( "/biscuit/:id", { schema: {
		tags: ["Biscuit"],
		params: schemas.deleteBiscuitParamsSchema,
		response: {
			200: schemas.deleteBiscuitSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params

		try {
			const biscuit = await usecasesFactory.deleteBiscuit.execute( { id } )

			if ( !biscuit ) {
				return reply.code( 404 ).send( { error: "Biscuit not found" } )
			}

			return reply.code( 200 ).send( biscuit )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - SET BISCUIT DISABLED
	fastify.put<{
		Params: FromSchema<typeof schemas.setDisableBiscuitParamsSchema>,
		Body: FromSchema<typeof schemas.setDisableBiscuitBodySchema>,
		Reply: ReplyType<SetBiscuitDisabledReturnType>
	}>( "/biscuit/:id/disabled", { schema: {
		tags: ["Biscuit"],
		params: schemas.setDisableBiscuitParamsSchema,
		body: schemas.setDisableBiscuitBodySchema,
		response: {
			200: schemas.setBiscuitDisabledSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params
		const { isDisabled } = req.body

		try {
			const biscuit = await usecasesFactory.setBiscuitDisabled.execute( { id, isDisabled } )

			return reply.code( 200 ).send( biscuit )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			if ( errorMessage === "Biscuit not found" ) {
				return reply.code( 404 ).send( { error: errorMessage } )
			}

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )
}
