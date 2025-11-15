import { randomUUID } from "crypto";
import type { User } from "@/user/domain/user.entity.js";
import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js";
import type { 
	CreateUserParamsType,
	CreateUserReturnType,
	DeleteUserParamsType,
	DeleteUserReturnType,
	FindAllUsersReturnType,
	FindUserByEmailParamsType,
	FindUserByEmailReturnType,
	FindUserByIdParamsType,
	FindUserByIdReturnType,
	UpdateUserParamsType,
	UpdateUserPasswordParamsType,
	UpdateUserPasswordReturnType,
	UpdateUserReturnType
} from "@/user/types.js";

const mockUsers: User[] = [
	{ id: "1", email: "john@example.com", password: "123" },
	{ id: "2", email: "jane@example.com", password: "123" },
];

export class MockUserRepository implements UserRepositoryPort {
	async findUserById( data: FindUserByIdParamsType ): FindUserByIdReturnType {
		return mockUsers.find( user => user.id === data.id );
	}

	async findAllUsers(): FindAllUsersReturnType {
		return mockUsers || null;
	}

	async createUser( data: CreateUserParamsType ): CreateUserReturnType {
		const newUser: User = { id: randomUUID(), ...data };
		mockUsers.push( newUser );
		
		return newUser;
	}

	async deleteUser( data: DeleteUserParamsType ): DeleteUserReturnType {
		const idx = mockUsers.findIndex( ( u ) => u.id === data.id );
		if ( idx === -1 ) {
			return undefined;
		}
		const [deleted] = mockUsers.splice( idx, 1 );
		return deleted;
	}

	async findUserByEmail( data: FindUserByEmailParamsType ): FindUserByEmailReturnType {
		return mockUsers.find( user => user.email === data.email );
	}

	async updateUser( data: UpdateUserParamsType ): UpdateUserReturnType {
		return { id: data.id, email: data.user.email };
	}

	async updateUserPassword( data: UpdateUserPasswordParamsType ): UpdateUserPasswordReturnType {
		return { id: data.id, email: "This is a test" };
	}
}