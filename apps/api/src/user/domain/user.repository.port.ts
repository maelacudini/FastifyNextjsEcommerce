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
	UpdateUserCartParamsType,
	UpdateUserCartReturnType,
	UpdateUserFavoritesParamsType,
	UpdateUserFavoritesReturnType,
	UpdateUserIsDisabledParamsType,
	UpdateUserIsDisabledReturnType,
	UpdateUserIsVerifiedParamsType,
	UpdateUserIsVerifiedReturnType,
	UpdateUserMarketingOptInParamsType,
	UpdateUserMarketingOptInReturnType,
	UpdateUserParamsType,
	UpdateUserPasswordParamsType,
	UpdateUserPasswordReturnType,
	UpdateUserReturnType,
	UpdateUserRoleParamsType,
	UpdateUserRoleReturnType
} from "@/user/types.js"

export interface UserRepositoryPort {
  findAllUsers(): FindAllUsersReturnType;
	findUserById( data: FindUserByIdParamsType ): FindUserByIdReturnType;
	findUserByEmail( data: FindUserByEmailParamsType ): FindUserByEmailReturnType;
  createUser( data: CreateUserParamsType ): CreateUserReturnType;
  deleteUser( data: DeleteUserParamsType ): DeleteUserReturnType;
	updateUser( data: UpdateUserParamsType ): UpdateUserReturnType;
	updateUserPassword( data: UpdateUserPasswordParamsType ): UpdateUserPasswordReturnType;
	updateUserFavorites( data: UpdateUserFavoritesParamsType ): UpdateUserFavoritesReturnType;
	updateUserIsDisabled( data: UpdateUserIsDisabledParamsType ): UpdateUserIsDisabledReturnType;
	updateUserIsVerified( data: UpdateUserIsVerifiedParamsType ): UpdateUserIsVerifiedReturnType;
	updateUserRole( data: UpdateUserRoleParamsType ): UpdateUserRoleReturnType;
	updateUserMarketingOptIn( data: UpdateUserMarketingOptInParamsType ): UpdateUserMarketingOptInReturnType;
	updateUserCart( data: UpdateUserCartParamsType ): UpdateUserCartReturnType;
}