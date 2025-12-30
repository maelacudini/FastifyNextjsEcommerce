import { randomUUID } from "crypto"
import type { User } from "@/user/domain/user.entity.js"
import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type {
	CreateUserParamsType,
	DeleteUserParamsType,
	FindUserByEmailParamsType,
	FindUserByIdParamsType,
	UpdateUserCartParamsType,
	UpdateUserFavoritesParamsType,
	UpdateUserIsDisabledParamsType,
	UpdateUserIsVerifiedParamsType,
	UpdateUserMarketingOptInParamsType,
	UpdateUserParamsType,
	UpdateUserPasswordParamsType,
	UpdateUserRoleParamsType,
	UserRole
} from "@/user/types.js"
import { paginationDefaultLimit } from "@/const.js"


const mockUsers: User[] = [
	{ id: "1", email: "john@example.com", password: "123", role: "admin", createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 },
	{ id: "2", email: "jane@example.com", password: "123", role: "admin", createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 },
]

export class MockUserRepository implements UserRepositoryPort {

	async findAllUsers() {
		return {
			items: mockUsers,
			page: 1,
			limit: paginationDefaultLimit,
			total: mockUsers.length,
			totalPages: Math.round( paginationDefaultLimit / mockUsers.length )
		}
	}

	async findUserById( data: FindUserByIdParamsType ) {
		return mockUsers.find( user => user.id === data.id )
	}

	async createUser( data: CreateUserParamsType ) {
		const newUser: User = { ...data, id: randomUUID(), createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
		mockUsers.push( newUser )

		return newUser
	}

	async deleteUser( data: DeleteUserParamsType ) {
		const idx = mockUsers.findIndex( ( u ) => u.id === data.id )
		if ( idx === -1 ) {
			return undefined
		}
		const [deleted] = mockUsers.splice( idx, 1 )
		return deleted
	}

	async findUserByEmail( data: FindUserByEmailParamsType ) {
		return mockUsers.find( user => user.email === data.email )
	}

	async updateUser( data: UpdateUserParamsType ) {
		return { id: data.id, email: data.user.email, role: "admin" as UserRole, createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
	}

	async updateUserPassword( data: UpdateUserPasswordParamsType ) {
		return { id: data.id, email: "test@gmail.com", role: "customer" as UserRole, createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
	}

	async updateUserFavorites( data: UpdateUserFavoritesParamsType ) {
		return { id: data.id, email: "test@gmail.com", role: "admin" as UserRole, createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
	}

	async updateUserIsDisabled( data: UpdateUserIsDisabledParamsType ) {
		return { id: data.id, email: "test@gmail.com", role: "admin" as UserRole, createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
	}

	async updateUserIsVerified( data: UpdateUserIsVerifiedParamsType ) {
		return { id: data.id, email: "test@gmail.com", role: "admin" as UserRole, createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
	}

	async updateUserMarketingOptIn( data: UpdateUserMarketingOptInParamsType ) {
		return { id: data.id, email: "test@gmail.com", role: "admin" as UserRole, createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
	}

	async updateUserRole( data: UpdateUserRoleParamsType ) {
		return { id: data.id, email: "test@gmail.com", role: "admin" as UserRole, createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
	}

	async updateUserCart( data: UpdateUserCartParamsType ) {
		return { id: data.id, email: "test@gmail.com", role: "admin" as UserRole, createdAt: new Date().toString(), updatedAt: new Date().toString(), isDisabled: false, isVerified: false, refreshTokenVersion: 123 }
	}
}