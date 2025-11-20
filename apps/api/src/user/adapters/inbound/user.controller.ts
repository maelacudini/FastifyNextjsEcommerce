/* eslint-disable max-lines-per-function */
import type { FastifyInstance } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import { MockUserRepository } from "@/user/adapters/outbound/user.repository.mock.js";
import { FindUserByIdUseCase } from "@/user/application/find-user-by-id.usecase.js";
import { FindAllUsersUseCase } from "@/user/application/find-all-users.usecase.js";
import { CreateUserUseCase } from "@/user/application/create-user.usecase.js";
import { DeleteUserUseCase } from "@/user/application/delete-user.usecase.js";
import { FindUserByEmailUseCase } from "@/user/application/find-user-by-email.usecase.js";
import { UpdateUserUseCase } from "@/user/application/update-user.usecase.js";
import { UpdateUserPasswordUseCase } from "@/user/application/update-user-password.usecase.js";
import { 
	createUserBodySchema,
	createUserSuccessReturnSchema,
	deleteUserParamsSchema,
	deleteUserSuccessReturnSchema,
	findAllUsersSuccessReturnSchema,
	findUserByEmailParamsSchema,
	findUserByEmailSuccessReturnSchema,
	findUserByIdParamsSchema,
	findUserByIdSuccessReturnSchema,
	notFoundSchema,
	serverErrorSchema,
	unauthorizedSchema,
	updateUserBodySchema,
	updateUserParamsSchema,
	updateUserPasswordBodySchema,
	updateUserPasswordParamsSchema,
	updateUserPasswordSuccessReturnSchema,
	updateUserSuccessReturnSchema,
} from "./user.schema.js";

export async function userController( app: FastifyInstance ) {
	// The controller wires the inbound and outbound sides
	const userRepo = new MockUserRepository();
	const findAllUsersUseCase = new FindAllUsersUseCase( userRepo );
	const findUserByIdUseCase = new FindUserByIdUseCase( userRepo );
	const findUserByEmailUseCase = new FindUserByEmailUseCase( userRepo );
	const createUserUseCase = new CreateUserUseCase( userRepo );
	const deleteUserUseCase = new DeleteUserUseCase( userRepo );
	const updateUserUseCase = new UpdateUserUseCase( userRepo );
	const updateUserPasswordUseCase = new UpdateUserPasswordUseCase( userRepo );

	// PUBLIC - FIND ALL USERS
	app.get<{ Reply: {
		200: FromSchema<typeof findAllUsersSuccessReturnSchema>,
		404: FromSchema<typeof notFoundSchema>,
		401: FromSchema<typeof unauthorizedSchema>,
		500: FromSchema<typeof serverErrorSchema>,
	} }>( "/users", { schema: {
		response: {
			200: findAllUsersSuccessReturnSchema,
			404: notFoundSchema,
			401: unauthorizedSchema,
			500: serverErrorSchema,
		}
	} }, async ( req, reply ) => {
		const users = await findAllUsersUseCase.execute();

		return reply.code( 200 ).send( users );
	} );

	// PUBLIC - FIND USER BY ID
	app.get<{ 
		Params: FromSchema<typeof findUserByIdParamsSchema>, 
		Reply: {
			200: FromSchema<typeof findUserByIdSuccessReturnSchema>,
			404: FromSchema<typeof notFoundSchema>,
			401: FromSchema<typeof unauthorizedSchema>,
			500: FromSchema<typeof serverErrorSchema>,
		} }>( "/users/:id", { schema: {
			params: findUserByIdParamsSchema,
			response: {
				200: findUserByIdSuccessReturnSchema,
				404: notFoundSchema,
				401: unauthorizedSchema,
				500: serverErrorSchema,
			}
		} }, async ( req, reply ) => {
			const { id } = req.params;

			const user = await findUserByIdUseCase.execute( { id: id } );

			if ( !user ) {
				return reply.code( 404 ).send( { error: "User not found" } );
			}

			return reply.code( 200 ).send( user );
		} );

	// PUBLIC - FIND USER BY EMAIL
	app.get<{ 
		Params: FromSchema<typeof findUserByEmailParamsSchema>, 
		Reply: {
			200: FromSchema<typeof findUserByEmailSuccessReturnSchema>,
			404: FromSchema<typeof notFoundSchema>,
			401: FromSchema<typeof unauthorizedSchema>,
			500: FromSchema<typeof serverErrorSchema>,
		} }>( "/users/email/:email", { schema: {
			params: findUserByEmailParamsSchema,
			response: {
				200: findUserByEmailSuccessReturnSchema,
				404: notFoundSchema,
				401: unauthorizedSchema,
				500: serverErrorSchema,
			}
		} }, async ( req, reply ) => {
			const { email } = req.params;

			const user = await findUserByEmailUseCase.execute( { email: email } );

			if ( !user ) {
				return reply.code( 404 ).send( { error: "User not found" } );
			}

			return reply.code( 200 ).send( user );
		} );

	// PUBLIC - CREATE USER
	app.post<{ 
		Body: FromSchema<typeof createUserBodySchema>, 
		Reply: {
			200: FromSchema<typeof createUserSuccessReturnSchema>,
			404: FromSchema<typeof notFoundSchema>,
			401: FromSchema<typeof unauthorizedSchema>,
			500: FromSchema<typeof serverErrorSchema>,
		} }>( "/users", { schema: {
			body: createUserBodySchema,
			response: {
				200: createUserSuccessReturnSchema,
				404: notFoundSchema,
				401: unauthorizedSchema,
				500: serverErrorSchema,
			}
		} }, async ( req, reply ) => {
			const data = req.body;

			try {
				const newUser = await createUserUseCase.execute( data );

				return reply.code( 200 ).send( newUser );
			} catch ( err: unknown ) {
				const errorMessage = err instanceof Error ? err.message : "Unknown error";

				return reply.code( 500 ).send( { message: errorMessage } );
			}
		} );

	// PRIVATE - DELETE USER
	app.delete<{ 
		Params: FromSchema<typeof deleteUserParamsSchema>, 
		Reply: {
			200: FromSchema<typeof deleteUserSuccessReturnSchema>,
			404: FromSchema<typeof notFoundSchema>,
			401: FromSchema<typeof unauthorizedSchema>,
			500: FromSchema<typeof serverErrorSchema>,
		} }>( "/users/:id", { schema: {
			params: deleteUserParamsSchema,
			response: {
				200: deleteUserSuccessReturnSchema,
				404: notFoundSchema,
				401: unauthorizedSchema,
				500: serverErrorSchema,
			}
		} }, async ( req, reply ) => {
			const { id } = req.params;

			try {
				const user = await deleteUserUseCase.execute( { id: id } );
				if ( !user ) {
					return reply.code( 404 ).send( { error: "User not found" } );
				}

				return reply.code( 200 ).send( user );
			} catch ( err: unknown ) {
				const errorMessage = err instanceof Error ? err.message : "Unknown error";
			
				return reply.code( 500 ).send( { message: errorMessage } );
			}
		} );

	// PRIVATE - UPDATE USER
	app.put<{ 
		Params: FromSchema<typeof updateUserParamsSchema>,
		Body: FromSchema<typeof updateUserBodySchema>,
		Reply: {
			200: FromSchema<typeof updateUserSuccessReturnSchema>,
			404: FromSchema<typeof notFoundSchema>,
			401: FromSchema<typeof unauthorizedSchema>,
			500: FromSchema<typeof serverErrorSchema>,
		} }>( "/users/:id",{ schema: {
			params: updateUserParamsSchema,
			body: updateUserBodySchema,
			response: {
				200: updateUserSuccessReturnSchema,
				404: notFoundSchema,
				401: unauthorizedSchema,
				500: serverErrorSchema,
			}
		} }, async ( req, reply ) => {
			const { id } = req.params;
			const data = req.body;

			try {
				const updatedUser = await updateUserUseCase.execute( { id: id, user: data.user } );
			
				return reply.code( 200 ).send( updatedUser );
			} catch ( err: unknown ) {
				const errorMessage = err instanceof Error ? err.message : "Unknown error";
			
				return reply.code( 500 ).send( { message: errorMessage } );
			}
		} );

	// PRIVATE - UPDATE USER PASSWORD
	app.put<{ 
		Params: FromSchema<typeof updateUserPasswordParamsSchema>,
		Body: FromSchema<typeof updateUserPasswordBodySchema>,
		Reply: {
			200: FromSchema<typeof updateUserPasswordSuccessReturnSchema>,
			404: FromSchema<typeof notFoundSchema>,
			401: FromSchema<typeof unauthorizedSchema>,
			500: FromSchema<typeof serverErrorSchema>,
		} }>( "/users/:id/password", { schema: {
			params: updateUserPasswordParamsSchema,
			body: updateUserPasswordBodySchema,
			response: {
				200: updateUserPasswordSuccessReturnSchema,
				404: notFoundSchema,
				401: unauthorizedSchema,
				500: serverErrorSchema,
			}
		} }, async ( req, reply ) => {
			const { id } = req.params;
			const { newPassword } = req.body;

			try {
				const user = await updateUserPasswordUseCase.execute( { id, newPassword } );
			
				return reply.code( 200 ).send( user );
			} catch ( err: unknown ) {
				const errorMessage = err instanceof Error ? err.message : "Unknown error";
			
				return reply.code( 500 ).send( { message: errorMessage } );
			}
		} );
}
