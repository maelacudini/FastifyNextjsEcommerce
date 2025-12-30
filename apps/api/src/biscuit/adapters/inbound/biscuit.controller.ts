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

	// PUBLIC - FIND ALL BISCUITS
	app.get<{ Reply: FindAllBiscuitsReplyType }>( "/biscuit/all", { schema: {
		response: {
			200: schemas.findAllBiscuitsSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllBiscuits.execute()

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - FIND BISCUIT BY ID
	app.get<{
		Params: FromSchema<typeof schemas.findBiscuitByIdParamsSchema>,
		Reply: FindBiscuitByIdReplyType
	}>( "/biscuit/:id", { schema: {
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
		Body: FromSchema<typeof schemas.updateBiscuitParamsSchema>,
		Reply: UpdateBiscuitReplyType
	}>( "/biscuit", { schema: {
		body: schemas.updateBiscuitParamsSchema,
		response: {
			200: schemas.updateBiscuitSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id, biscuit } = req.body

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
		Body: FromSchema<typeof schemas.setDisableBiscuitParamsSchema>,
		Reply: SetBiscuitDisabledReplyType
	}>( "/biscuit/disabled", { schema: {
		body: schemas.setDisableBiscuitParamsSchema,
		response: {
			200: schemas.setBiscuitDisabledSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id, isDisabled } = req.body

		try {
			const biscuit = await usecasesFactory.setBiscuitDisabled.execute( { id, isDisabled } )

			return reply.code( 200 ).send( biscuit )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )
}
