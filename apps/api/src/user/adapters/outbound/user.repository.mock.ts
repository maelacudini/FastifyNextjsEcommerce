import { randomUUID } from "crypto";
import type { User } from "@/user/domain/user.entity.js";
import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js";
import type { 
	CreateUserParamsType,
	DeleteUserParamsType,
	FindUserByEmailParamsType,
	FindUserByIdParamsType,
	UpdateUserParamsType,
	UpdateUserPasswordParamsType,
	UserRole
} from "@/user/types.js";

const mockUsers: User[] = [
	{ id: "1", email: "john@example.com", password: "123", role: "admin" },
	{ id: "2", email: "jane@example.com", password: "123", role: "admin" },
];

export class MockUserRepository implements UserRepositoryPort {

	async findAllUsers() {
		return mockUsers;
	}

	async findUserById( data: FindUserByIdParamsType ) {
		return mockUsers.find( user => user.id === data.id );
	}

	async createUser( data: CreateUserParamsType ) {
		const newUser: User = { id: randomUUID(), ...data };
		mockUsers.push( newUser );
		
		return newUser;
	}

	async deleteUser( data: DeleteUserParamsType ) {
		const idx = mockUsers.findIndex( ( u ) => u.id === data.id );
		if ( idx === -1 ) {
			return undefined;
		}
		const [deleted] = mockUsers.splice( idx, 1 );
		return deleted;
	}

	async findUserByEmail( data: FindUserByEmailParamsType ) {
		return mockUsers.find( user => user.email === data.email );
	}

	async updateUser( data: UpdateUserParamsType ) {
		return { id: data.id, email: data.user.email, role: data.user.role };
	}

	async updateUserPassword( data: UpdateUserPasswordParamsType ) {
		return { id: data.id, email: "test@gmail.com", role: "customer" as UserRole };
	}
}