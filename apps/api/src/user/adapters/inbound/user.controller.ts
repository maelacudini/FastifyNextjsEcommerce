/* eslint-disable max-lines-per-function */
import schemas from "./user.schema.js"
import type { FastifyInstance } from "fastify"
import type { FromSchema } from "json-schema-to-ts"
import usecasesFactory from "./user.usecase.factory.js"
import type {
	CreateUserReplyType,
	DeleteUserReplyType,
	FindAllUsersReplyType,
	FindUserByEmailReplyType,
	FindUserByIdReplyType,
	UpdateUserCartReplyType,
	UpdateUserFavoritesReplyType,
	UpdateUserIsDisabledReplyType,
	UpdateUserIsVerifiedReplyType,
	UpdateUserMarketingOptInReplyType,
	UpdateUserPasswordReplyType,
	UpdateUserReplyType,
	UpdateUserRoleReplyType
} from "@/user/types.js"
import { errorSchemas } from "@/const.js"

export async function userController( app: FastifyInstance ) {
	// The controller wires the inbound and outbound sides

	// PUBLIC - FIND ALL USERS
	app.get<{ Reply: FindAllUsersReplyType }>( "/user", { schema: {
		response: {
			200: schemas.findAllUsersSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllUsersUseCase.execute()

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - FIND USER BY ID
	app.get<{
		Params: FromSchema<typeof schemas.findUserByIdParamsSchema>,
		Reply: FindUserByIdReplyType
	}>( "/user/:id", { schema: {
		params: schemas.findUserByIdParamsSchema,
		response: {
			200: schemas.findUserByIdSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params

		const user = await usecasesFactory.findUserByIdUseCase.execute( { id: id } )

		if ( !user ) {
			return reply.code( 404 ).send( { error: "User not found" } )
		}

		return reply.code( 200 ).send( user )
	} )

	// PUBLIC - FIND USER BY EMAIL
	app.get<{
		Params: FromSchema<typeof schemas.findUserByEmailParamsSchema>,
		Reply: FindUserByEmailReplyType
	}>( "/user/email/:email", { schema: {
		params: schemas.findUserByEmailParamsSchema,
		response: {
			200: schemas.findUserByEmailSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { email } = req.params

		const user = await usecasesFactory.findUserByEmailUseCase.execute( { email: email } )

		if ( !user ) {
			return reply.code( 404 ).send( { error: "User not found" } )
		}

		return reply.code( 200 ).send( user )
	} )

	// PUBLIC - CREATE USER
	app.post<{
		Body: FromSchema<typeof schemas.createUserBodySchema>,
		Reply: CreateUserReplyType
	}>( "/user", { schema: {
		body: schemas.createUserBodySchema,
		response: {
			200: schemas.createUserSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
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
	app.delete<{
		Params: FromSchema<typeof schemas.deleteUserParamsSchema>,
		Reply: DeleteUserReplyType
	}>( "/user/:id", { schema: {
		params: schemas.deleteUserParamsSchema,
		response: {
			200: schemas.deleteUserSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
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
	app.put<{
		Params: FromSchema<typeof schemas.updateUserParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserBodySchema>,
		Reply: UpdateUserReplyType
	}>( "/user/:id",{ schema: {
		params: schemas.updateUserParamsSchema,
		body: schemas.updateUserBodySchema,
		response: {
			200: schemas.updateUserSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
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

	// PRIVATE - UPDATE USER PASSWORD
	app.put<{
		Params: FromSchema<typeof schemas.updateUserPasswordParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserPasswordBodySchema>,
		Reply: UpdateUserPasswordReplyType
	 }>( "/user/:id/password", { schema: {
	 	params: schemas.updateUserPasswordParamsSchema,
	 	body: schemas.updateUserPasswordBodySchema,
	 	response: {
	 		200: schemas.updateUserPasswordSuccessReturnSchema,
	 		...errorSchemas
	 	}
	 } }, async ( req, reply ) => {
	 	const { id } = req.params
	 	const { newPassword } = req.body

	 	try {
	 		const user = await usecasesFactory.updateUserPasswordUseCase.execute( { id, newPassword } )

	 		return reply.code( 200 ).send( user )
	 	} catch ( err: unknown ) {
	 		const errorMessage = err instanceof Error ? err.message : "Unknown error"

	 		return reply.code( 500 ).send( { message: errorMessage } )
	 	}
	 } )

	// PRIVATE - UPDATE USER ISVERIFIED
	app.put<{
		Params: FromSchema<typeof schemas.updateUserIsVerifiedParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserIsVerifiedBodySchema>,
		Reply: UpdateUserIsVerifiedReplyType
	}>( "/user/:id/isVerified", { schema: {
		params: schemas.updateUserIsVerifiedParamsSchema,
		body: schemas.updateUserIsVerifiedBodySchema,
		response: {
			200: schemas.updateUserIsVerifiedSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params
		const { isVerified } = req.body

		try {
			const user = await usecasesFactory.updateUserIsVerifiedUseCase.execute( { id, isVerified } )

			return reply.code( 200 ).send( user )
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error"

			return reply.code( 500 ).send( { message: errorMessage } )
		}
	} )

	// PRIVATE - UPDATE USER ISDISABLED
	app.put<{
		Params: FromSchema<typeof schemas.updateUserIsDisabledParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserIsDisabledBodySchema>,
		Reply: UpdateUserIsDisabledReplyType
	}>( "/user/:id/isDisabled", { schema: {
		params: schemas.updateUserIsDisabledParamsSchema,
		body: schemas.updateUserIsDisabledBodySchema,
		response: {
			200: schemas.updateUserIsDisabledSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
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
	app.put<{
		Params: FromSchema<typeof schemas.updateUserRoleParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserRoleBodySchema>,
		Reply: UpdateUserRoleReplyType
	}>( "/user/:id/role", { schema: {
		params: schemas.updateUserRoleParamsSchema,
		body: schemas.updateUserRoleBodySchema,
		response: {
			200: schemas.updateUserRoleSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
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
	app.put<{
		Params: FromSchema<typeof schemas.updateUserMarketingOptInParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserMarketingOptInBodySchema>,
		Reply: UpdateUserMarketingOptInReplyType
	}>( "/user/:id/marketingOptIn", { schema: {
		params: schemas.updateUserMarketingOptInParamsSchema,
		body: schemas.updateUserMarketingOptInBodySchema,
		response: {
			200: schemas.updateUserMarketingOptInSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
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
	app.put<{
		Params: FromSchema<typeof schemas.updateUserFavoritesParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserFavoritesBodySchema>,
		Reply: UpdateUserFavoritesReplyType
	}>( "/user/:id/favorites", { schema: {
		params: schemas.updateUserFavoritesParamsSchema,
		body: schemas.updateUserFavoritesBodySchema,
		response: {
			200: schemas.updateUserFavoritesSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
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
	app.put<{
		Params: FromSchema<typeof schemas.updateUserCartParamsSchema>,
		Body: FromSchema<typeof schemas.updateUserCartBodySchema>,
		Reply: UpdateUserCartReplyType
	}>( "/user/:id/cart", { schema: {
		params: schemas.updateUserCartParamsSchema,
		body: schemas.updateUserCartBodySchema,
		response: {
			200: schemas.updateUserCartSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
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
