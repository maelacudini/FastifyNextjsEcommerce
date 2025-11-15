import type { 
	CreateUserParamsType,
	CreateUserReturnType,
	DeleteUserParamsType,
	DeleteUserReturnType,
	FindUserByIdParamsType,
	FindUserByIdReturnType
} from "@/user/types.js";
import type { FastifyInstance } from "fastify";
import type { GetUsersResponse } from "@/packages/types/types.js";
import { MockUserRepository } from "@/user/adapters/outbound/user.repository.mock.js";
import { FindUserByIdUseCase } from "@/user/application/find-user-by-id.usecase.js";
import { FindAllUsersUseCase } from "@/user/application/find-all-users.usecase.js";
import { CreateUserUseCase } from "@/user/application/create-user.usecase.js";
import { DeleteUserUseCase } from "@/user/application/delete-user.usecase.js";
import { findAllUsersSchema } from "./user.schema.js";

export async function userController( app: FastifyInstance ) {
	// The controller wires the inbound and outbound sides
	const userRepo = new MockUserRepository();
	const findAllUsersUseCase = new FindAllUsersUseCase( userRepo );
	const findUserByIdUseCase = new FindUserByIdUseCase( userRepo );
	const createUserUseCase = new CreateUserUseCase( userRepo );
	const deleteUserUseCase = new DeleteUserUseCase( userRepo );

	// TODO: IMPLEMENT ALL USERS SCHEMAS

	// PUBLIC - GET ALL USERS, GET /users
	app.get( "/users", { schema: findAllUsersSchema } , async ( req, reply ): Promise<GetUsersResponse | null> => {
		const users = await findAllUsersUseCase.execute();
		
		return reply.code( 200 ).send( users );
	} );

	// PUBLIC - GET USER BY ID, GET /users/:id
	app.get( "/users/:id", async ( req, reply ) : FindUserByIdReturnType => {
		const { id } = req.params as { id: FindUserByIdParamsType };
		
		const user = await findUserByIdUseCase.execute( id );

		if ( !user ) {
			return reply.code( 404 ).send( { error: "User not found" } );
		}

		return reply.code( 200 ).send( user );
	} );

	// PUBLIC - CREATE USER, POST /users 
	app.post( "/users", async ( req, reply ) : CreateUserReturnType => {
		const data = req.body as CreateUserParamsType;
		
		try {
			const newUser = await createUserUseCase.execute( data );
			
			return reply.code( 201 ).send( newUser );
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error";
			
			return reply.code( 400 ).send( { error: errorMessage } );
		}
	} );

	// PRIVATE - DELETE USER BY ID, DELETE /user
	app.delete( "/users/:id", async ( req, reply ): DeleteUserReturnType => {
		const { id } = req.params as { id: DeleteUserParamsType };

		try {
			const user = await deleteUserUseCase.execute( id );
			if ( !user ) {
				return reply.code( 404 ).send( { error: "User not found" } );
			}

			return reply.code( 204 ).send( user );
		} catch ( err: unknown ) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error";
			
			return reply.code( 400 ).send( { error: errorMessage } );
		}
	} );
}