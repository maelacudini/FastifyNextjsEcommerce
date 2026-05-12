import type {
	CreateUserRequestType,
	CreateUserReturnType,
	DeleteUserRequestType,
	DeleteUserReturnType,
	FindAllUsersRequestType,
	FindAllUsersReturnType,
	FindUserByEmailRequestType,
	FindUserByEmailReturnType,
	FindUserByIdRequestType,
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
} from "../types.js"

export interface UserRepositoryPort {
  findAllUsers( data: FindAllUsersRequestType ): Promise<FindAllUsersReturnType>;
	findUserById( data: FindUserByIdRequestType ): Promise<FindUserByIdReturnType>;
	findUserByEmail( data: FindUserByEmailRequestType ): Promise<FindUserByEmailReturnType>;
  createUser( data: CreateUserRequestType ): Promise<CreateUserReturnType>;
  deleteUser( data: DeleteUserRequestType ): Promise<DeleteUserReturnType>;
	updateUser( data: UpdateUserParamsType ): Promise<UpdateUserReturnType>;
	updateUserFavorites( data: UpdateUserFavoritesParamsType ): Promise<UpdateUserFavoritesReturnType>;
	updateUserIsDisabled( data: UpdateUserIsDisabledParamsType ): Promise<UpdateUserIsDisabledReturnType>;
	updateUserRole( data: UpdateUserRoleParamsType ): Promise<UpdateUserRoleReturnType>;
	updateUserMarketingOptIn( data: UpdateUserMarketingOptInParamsType ): Promise<UpdateUserMarketingOptInReturnType>;
	updateUserCart( data: UpdateUserCartParamsType ): Promise<UpdateUserCartReturnType>;
}
