
import type { FastifyInstance } from "fastify"
import createAuthUsecases from "./auth.usecase.factory.js"
import type { ReplyType } from "@/types.js"
import type { CreateUserWithAuthReturnType, FindByIdReturnType } from "@/auth/types.js"
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
	}>( "/auth/:id", {
		schema: {
			tags: ["Auth"],
			params: schemas.findByIdParamsSchema,
			response: {
				200: schemas.findByIdSuccessReturnSchema,
				...errorSchemas
			}
		},
		onRequest: [fastify.jwtAuth, fastify.hasRole( "admin" )]
	}, async ( req, reply ) => {
		const { id } = req.params

		const data = await usecasesFactory.findByIdUseCase.execute( { id } )

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - REGISTER USER WITH AUTH
	fastify.post<{
		Body: FromSchema<typeof schemas.createUserWithAuthBodySchema>,
		Reply: ReplyType<CreateUserWithAuthReturnType>
	}>( "/signup", {
		schema: {
			tags: ["Auth"],
			body: schemas.createUserWithAuthBodySchema,
			response: {
				200: schemas.createUserWithAuthSuccessReturnSchema,
				...errorSchemas,
			}
		}
	}, async ( req, reply ) => {
		try {
			const data = await usecasesFactory.createUserWithAuthUseCase.execute( req.body )
			return reply.code( 200 ).send( data )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"
			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - FIND BY USER ID
	// PRIVATE - FIND BY USERNAME
	// PRIVATE - INCREMENT REFRESH TOKEN VERSION
	// PRIVATE - LOGIN
	fastify.post(
		"/login",
		async ( req, reply ) => {
			// TODO: IMPLEMENT METHOD

			const token = fastify.jwt.sign( {
				payload: {
					firstName: "Mario",
					lastName: "Rossi",
					email: "mariorossi@gmail.com",
					role: "admin"
				}
			} )

			reply.send( token )
		}
	)
	// PRIVATE - LOGOUT
	// PRIVATE - UPDATE EMAIL VERIFIED
	// PRIVATE - UPDATE LAST LOGIN
	// PRIVATE - UPDATE PASSWORD
	// PRIVATE - UPDATE USERNAME
}
