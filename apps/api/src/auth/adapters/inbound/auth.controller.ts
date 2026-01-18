
import type { FastifyInstance } from "fastify"
import createAuthUsecases from "./auth.usecase.factory.js"
import type { ReplyType } from "@/types.js"
import type { FindByIdReturnType } from "@/auth/types.js"
import schemas from "./auth.schema.js"
import { errorSchemas } from "@/const.js"
import type { FromSchema } from "json-schema-to-ts"

// The controller wires the inbound and outbound sides, here you take care of stuff like validation and more.
// The repository takes care of the database.

export async function authController( fastify: FastifyInstance ) {
	const usecasesFactory = createAuthUsecases( fastify )

	// PRIVATE - FIND BY ID
	fastify.get<{
		Params: FromSchema<typeof schemas.findByIdParamsSchema>,
		Reply: ReplyType<FindByIdReturnType>
	}>( "/auth/:id", { schema: {
		tags: ["Auth"],
		params: schemas.findByIdParamsSchema,
		response: {
			200: schemas.findByIdSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params

		const data = await usecasesFactory.findByIdUseCase.execute( { id } )

		return reply.code( 200 ).send( data )
	} )

	// PRIVATE - FIND BY USER ID
	// PRIVATE - FIND BY USERNAME
	// PRIVATE - INCREMENT REFRESH TOKEN VERSION
	// PRIVATE - LOGIN
	// PRIVATE - LOGOUT
	// PRIVATE - UPDATE EMAIL VERIFIED
	// PRIVATE - UPDATE LAST LOGIN
	// PRIVATE - UPDATE PASSWORD
	// PRIVATE - UPDATE USERNAME
}
