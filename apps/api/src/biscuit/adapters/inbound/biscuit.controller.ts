import { errorSchemas } from "@/const.js"
import type { FastifyInstance } from "fastify"
import type { FromSchema } from "json-schema-to-ts"
import usecasesFactory from "./biscuit.usecase.factory.js"
import schemas from "./biscuit.schema.js"
import type {
	FindAllActiveBiscuitsReplyType,
	FindActiveBiscuitByIdReplyType,
	FindAllBiscuitsReplyType,
	FindBiscuitByIdReplyType,
	CreateBiscuitReplyType,
	UpdateBiscuitReplyType,
	DeleteBiscuitReplyType,
	SetBiscuitDisabledReplyType
} from "@/biscuit/types.js"

export async function biscuitController( app: FastifyInstance ) {

	// PUBLIC - FIND ALL ACTIVE BISCUITS
	app.get<{ Reply: FindAllActiveBiscuitsReplyType }>( "/biscuit", { schema: {
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
	app.get<{
		Params: FromSchema<typeof schemas.findActiveBiscuitByIdParamsSchema>,
		Reply: FindActiveBiscuitByIdReplyType
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
	app.get<{ Reply: FindAllBiscuitsReplyType }>( "/biscuit/all", { schema: {
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
	app.get<{
		Params: FromSchema<typeof schemas.findBiscuitByIdParamsSchema>,
		Reply: FindBiscuitByIdReplyType
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
	app.post<{
		Body: FromSchema<typeof schemas.createBiscuitParamsSchema>,
		Reply: CreateBiscuitReplyType
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
	app.put<{
		Params: FromSchema<typeof schemas.updateBiscuParamsSchema>,
		Body: FromSchema<typeof schemas.updateBiscuitBodySchema>,
		Reply: UpdateBiscuitReplyType
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
	app.delete<{
		Params: FromSchema<typeof schemas.deleteBiscuitParamsSchema>,
		Reply: DeleteBiscuitReplyType
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
	app.put<{
		Params: FromSchema<typeof schemas.setDisableBiscuitParamsSchema>,
		Body: FromSchema<typeof schemas.setDisableBiscuitBodySchema>,
		Reply: SetBiscuitDisabledReplyType
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
