/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { CreateUserParamsType, CreateUserReturnType, DeleteUserParamsType, DeleteUserReturnType, FindAllUsersReturnType, FindUserByEmailParamsType, FindUserByEmailReturnType, FindUserByIdParamsType, FindUserByIdReturnType, UpdateUserCartParamsType, UpdateUserCartReturnType, UpdateUserFavoritesParamsType, UpdateUserFavoritesReturnType, UpdateUserIsDisabledParamsType, UpdateUserIsDisabledReturnType, UpdateUserIsVerifiedParamsType, UpdateUserIsVerifiedReturnType, UpdateUserMarketingOptInParamsType, UpdateUserMarketingOptInReturnType, UpdateUserParamsType, UpdateUserPasswordParamsType, UpdateUserPasswordReturnType, UpdateUserReturnType, UpdateUserRoleParamsType, UpdateUserRoleReturnType } from "@/user/types.js"

export class MockUserRepository implements UserRepositoryPort {

	async findAllUsers(): FindAllUsersReturnType {
		throw new Error( "Method not implemented." )
	}

	async findUserById( data: FindUserByIdParamsType ): FindUserByIdReturnType {
		throw new Error( "Method not implemented." )
	}

	async findUserByEmail( data: FindUserByEmailParamsType ): FindUserByEmailReturnType {
		throw new Error( "Method not implemented." )
	}

	async createUser( data: CreateUserParamsType ): CreateUserReturnType {
		throw new Error( "Method not implemented." )
	}

	async deleteUser( data: DeleteUserParamsType ): DeleteUserReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateUser( data: UpdateUserParamsType ): UpdateUserReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateUserPassword( data: UpdateUserPasswordParamsType ): UpdateUserPasswordReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateUserFavorites( data: UpdateUserFavoritesParamsType ): UpdateUserFavoritesReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateUserIsDisabled( data: UpdateUserIsDisabledParamsType ): UpdateUserIsDisabledReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateUserIsVerified( data: UpdateUserIsVerifiedParamsType ): UpdateUserIsVerifiedReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateUserRole( data: UpdateUserRoleParamsType ): UpdateUserRoleReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateUserMarketingOptIn( data: UpdateUserMarketingOptInParamsType ): UpdateUserMarketingOptInReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateUserCart( data: UpdateUserCartParamsType ): UpdateUserCartReturnType {
		throw new Error( "Method not implemented." )
	}
}