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
	UpdateUserMarketingOptInParamsType,
	UpdateUserMarketingOptInReturnType,
	UpdateUserParamsType,
	UpdateUserReturnType,
	UpdateUserRoleParamsType,
	UpdateUserRoleReturnType,
} from "@/user/types.js"

export interface UserRepositoryPort {
  findAllUsers(): Promise<FindAllUsersReturnType>;
	findUserById( data: FindUserByIdParamsType ): Promise<FindUserByIdReturnType>;
	findUserByEmail( data: FindUserByEmailParamsType ): Promise<FindUserByEmailReturnType>;
  createUser( data: CreateUserParamsType ): Promise<CreateUserReturnType>;
  deleteUser( data: DeleteUserParamsType ): Promise<DeleteUserReturnType>;
	updateUser( data: UpdateUserParamsType ): Promise<UpdateUserReturnType>;
	updateUserFavorites( data: UpdateUserFavoritesParamsType ): Promise<UpdateUserFavoritesReturnType>;
	updateUserIsDisabled( data: UpdateUserIsDisabledParamsType ): Promise<UpdateUserIsDisabledReturnType>;
	updateUserRole( data: UpdateUserRoleParamsType ): Promise<UpdateUserRoleReturnType>;
	updateUserMarketingOptIn( data: UpdateUserMarketingOptInParamsType ): Promise<UpdateUserMarketingOptInReturnType>;
	updateUserCart( data: UpdateUserCartParamsType ): Promise<UpdateUserCartReturnType>;
}