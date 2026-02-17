import { errorSchemas } from "@/const.js"
import type { FastifyInstance } from "fastify"
import type { FromSchema } from "json-schema-to-ts"
import schemas from "./biscuit.schema.js"
import createBiscuitUsecases from "./biscuit.usecase.factory.js"
import type { ReplyType } from "@/types.js"

export async function biscuitController( fastify: FastifyInstance ) {

	const usecasesFactory = createBiscuitUsecases( fastify )

	// TODO: CONSIDER USING SCHEMAS IN Reply TYPES DEFINITIONS INSTEAD OF DEFINING THEM HERE, TO AVOID DUPLICATION AND INCONSISTENCIES
	// E.G. Reply: ReplyType<FromSchema<typeof schemas.findAllActiveBiscuitsSuccessReturnSchema>>

	// TODO: FIND AND FIX INCONSISTENCIES IN PARAMS AND BODY SCHEMAS, SOME OF THEM HAVE ID IN PARAMS, OTHERS IN BODY, SOME IN BOTH, ETC...
	// E.G. SHOULD I PASS ID THROUGH PARAMS OR BODY? CURRENTLY IT'S IN PARAMS FOR UPDATE AND DELETE, BUT IN BODY FOR DISABLE, SHOULD BE CONSISTENT, PREFERABLY IN PARAMS FOR ALL OF THEM.

	// PUBLIC - FIND ALL ACTIVE BISCUITS
	fastify.get<{ Reply: ReplyType<FromSchema<typeof schemas.findAllActiveBiscuitsSuccessReturnSchema>> }>( "/biscuit", { schema: {
		tags: ["Biscuit"],
		response: {
			200: schemas.findAllActiveBiscuitsSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllActiveBiscuits.execute()

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - FIND ACTIVE BISCUIT BY ID
	fastify.get<{
		Params: FromSchema<typeof schemas.findActiveBiscuitByIdParamsSchema>,
		Reply: ReplyType<FromSchema<typeof schemas.findActiveBiscuitByIdSuccessReturnSchema>>
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
	fastify.get<{ Reply: ReplyType<FromSchema<typeof schemas.findAllBiscuitsSuccessReturnSchema>> }>( "/biscuit/all", { schema: {
		tags: ["Biscuit"],
		response: {
			200: schemas.findAllBiscuitsSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllBiscuits.execute()

		return reply.code( 200 ).send( data )
	} )

	// PRIVATE - FIND BISCUIT BY ID (ACTIVE AND NON ACTIVE)
	fastify.get<{
		Params: FromSchema<typeof schemas.findBiscuitByIdParamsSchema>,
		Reply: ReplyType<FromSchema<typeof schemas.findBiscuitByIdSuccessReturnSchema>>
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
		Body: FromSchema<typeof schemas.createBiscuitParamsSchema>,
		Reply: ReplyType<FromSchema<typeof schemas.createBiscuitSuccessReturnSchema>>
	}>( "/biscuit", { schema: {
		tags: ["Biscuit"],
		body: schemas.createBiscuitParamsSchema,
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
		Reply: ReplyType<FromSchema<typeof schemas.updateBiscuitSuccessReturnSchema>>
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

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - DELETE BISCUIT
	fastify.delete<{
		Params: FromSchema<typeof schemas.deleteBiscuitParamsSchema>,
		Reply: ReplyType<FromSchema<typeof schemas.deleteBiscuitSuccessReturnSchema>>
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
		Reply: ReplyType<FromSchema<typeof schemas.setBiscuitDisabledSuccessReturnSchema>>
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

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )
}
