/* eslint-disable max-lines-per-function */
import schemas from "./user.schema.js"
import type { FastifyInstance } from "fastify"
import type { FromSchema } from "json-schema-to-ts"
import type {
	CreateUserReturnType,
	DeleteUserReturnType,
	FindAllUsersReturnType,
	FindUserByEmailReturnType,
	FindUserByIdReturnType,
	UpdateUserFavoritesReturnType,
	UpdateUserIsDisabledReturnType,
	UpdateUserMarketingOptInReturnType,
	UpdateUserReturnType,
	UpdateUserRoleReturnType,
	UpdateUserCartReturnType
} from "@/user/types.js"
import { errorSchemas } from "@/const.js"
import createUserUsecases from "./user.usecase.factory.js"
import type { ReplyType } from "@/types.js"

// The controller wires the inbound and outbound sides
export async function userController( fastify: FastifyInstance ) {
	const usecasesFactory = createUserUsecases( fastify )

	// PUBLIC - FIND ALL USERS
	fastify.get<{
		Reply: ReplyType<FindAllUsersReturnType>
	}>( "/user", {
		schema: {
			tags: ["User"],
			response: {
				200: schemas.findAllUsersSuccessReturnSchema,
				...errorSchemas
			}
		} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllUsersUseCase.execute()

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - FIND USER BY ID
	fastify.get<{
		Params: FromSchema<typeof schemas.findUserByIdParamsSchema>,
		Reply: ReplyType<FindUserByIdReturnType>
	}>( "/user/:id", {
		schema: {
			tags: ["User"],
			params: schemas.findUserByIdParamsSchema,
			response: {
				200: schemas.findUserByIdSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { id } = req.params

		const user = await usecasesFactory.findUserByIdUseCase.execute( { id: id } )

		if ( !user ) {
			return reply.code( 404 ).send( { error: "User not found" } )
		}

		return reply.code( 200 ).send( user )
	} )

	// PUBLIC - FIND USER BY EMAIL
	fastify.get<{
		Params: FromSchema<typeof schemas.findUserByEmailParamsSchema>,
		Reply: ReplyType<FindUserByEmailReturnType>
	}>( "/user/:email/email", {
		schema: {
			tags: ["User"],
			params: schemas.findUserByEmailParamsSchema,
			response: {
				200: schemas.findUserByEmailSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { email } = req.params

		const user = await usecasesFactory.findUserByEmailUseCase.execute( { email: email } )

		if ( !user ) {
			return reply.code( 404 ).send( { error: "User not found" } )
		}

		return reply.code( 200 ).send( user )
	} )

	// PUBLIC - CREATE USER
	fastify.post<{
		Body: FromSchema<typeof schemas.createUserBodySchema>,
		Reply: ReplyType<CreateUserReturnType>
	}>( "/user", {
		schema: {
			tags: ["User"],
			body: schemas.createUserBodySchema,
			response: {
				200: schemas.createUserSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const data = req.body

		try {
			const newUser = await usecasesFactory.createUserUseCase.execute( data )

			return reply.code( 200 ).send( newUser )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - DELETE USER
	fastify.delete<{
		Params: FromSchema<typeof schemas.deleteUserParamsSchema>,
		Reply: ReplyType<DeleteUserReturnType>
	}>( "/user/:id", {
		schema: {
			tags: ["User"],
			params: schemas.deleteUserParamsSchema,
			response: {
				200: schemas.deleteUserSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { id } = req.params

		try {
			const user = await usecasesFactory.deleteUserUseCase.execute( { id: id } )
			if ( !user ) {
				return reply.code( 404 ).send( { error: "User not found" } )
			}

			return reply.code( 200 ).send( user )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - UPDATE USER
	fastify.put<{
		Params: FromSchema<typeof schemas.updateUserParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserBodySchema>,
		Reply: ReplyType<UpdateUserReturnType>
	}>( "/user/:id",{
		schema: {
			tags: ["User"],
			params: schemas.updateUserParamsSchema,
			body: schemas.updateUserBodySchema,
			response: {
				200: schemas.updateUserSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { id } = req.params
		const user = req.body

		try {
			const updatedUser = await usecasesFactory.updateUserUseCase.execute( { id: id, user: user } )

			return reply.code( 200 ).send( updatedUser )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - UPDATE USER ISDISABLED
	fastify.put<{
		Params: FromSchema<typeof schemas.updateUserIsDisabledParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserIsDisabledBodySchema>,
		Reply: ReplyType<UpdateUserIsDisabledReturnType>
	}>( "/user/:id/isDisabled", {
		schema: {
			tags: ["User"],
			params: schemas.updateUserIsDisabledParamsSchema,
			body: schemas.updateUserIsDisabledBodySchema,
			response: {
				200: schemas.updateUserIsDisabledSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { id } = req.params
		const { isDisabled } = req.body

		try {
			const user = await usecasesFactory.updateUserIsDisabledUseCase.execute( { id, isDisabled } )

			return reply.code( 200 ).send( user )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - UPDATE USER ROLE
	fastify.put<{
		Params: FromSchema<typeof schemas.updateUserRoleParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserRoleBodySchema>,
		Reply: ReplyType<UpdateUserRoleReturnType>
	}>( "/user/:id/role", {
		schema: {
			tags: ["User"],
			params: schemas.updateUserRoleParamsSchema,
			body: schemas.updateUserRoleBodySchema,
			response: {
				200: schemas.updateUserRoleSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { id } = req.params
		const { role } = req.body

		try {
			const user = await usecasesFactory.updateUserRoleUseCase.execute( { id, role } )

			return reply.code( 200 ).send( user )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - UPDATE USER MARKETINGOPTIN
	fastify.put<{
		Params: FromSchema<typeof schemas.updateUserMarketingOptInParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserMarketingOptInBodySchema>,
		Reply: ReplyType<UpdateUserMarketingOptInReturnType>
	}>( "/user/:id/marketingOptIn", {
		schema: {
			tags: ["User"],
			params: schemas.updateUserMarketingOptInParamsSchema,
			body: schemas.updateUserMarketingOptInBodySchema,
			response: {
				200: schemas.updateUserMarketingOptInSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { id } = req.params
		const { marketingOptIn } = req.body

		try {
			const user = await usecasesFactory.updateUserMarketingOptInUseCase.execute( { id, marketingOptIn } )

			return reply.code( 200 ).send( user )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - UPDATE USER FAVORITES
	fastify.put<{
		Params: FromSchema<typeof schemas.updateUserFavoritesParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserFavoritesBodySchema>,
		Reply: ReplyType<UpdateUserFavoritesReturnType>
	}>( "/user/:id/favorites", {
		schema: {
			tags: ["User"],
			params: schemas.updateUserFavoritesParamsSchema,
			body: schemas.updateUserFavoritesBodySchema,
			response: {
				200: schemas.updateUserFavoritesSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { id } = req.params
		const { favorites } = req.body

		try {
			const user = await usecasesFactory.updateUserFavoritesUseCase.execute( { id, favorites } )

			return reply.code( 200 ).send( user )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - UPDATE USER CART
	fastify.put<{
		Params: FromSchema<typeof schemas.updateUserCartParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserCartBodySchema>,
		Reply: ReplyType<UpdateUserCartReturnType>
	}>( "/user/:id/cart", {
		schema: {
			tags: ["User"],
			params: schemas.updateUserCartParamsSchema,
			body: schemas.updateUserCartBodySchema,
			response: {
				200: schemas.updateUserCartSuccessReturnSchema,
				...errorSchemas
			}
		}
	}, async ( req, reply ) => {
		const { id } = req.params
		const { cart } = req.body

		try {
			const user = await usecasesFactory.updateUserCartUseCase.execute( { id, cart } )

			return reply.code( 200 ).send( user )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )
}
