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

export interface UserRepositoryPort {
  findUserById( id: FindUserByIdParamsType ): FindUserByIdReturnType;
	findUserByEmail( id: FindUserByEmailParamsType ): FindUserByEmailReturnType;
  findAllUsers(): FindAllUsersReturnType;
  createUser( data: CreateUserParamsType ): CreateUserReturnType;
  deleteUser( id: DeleteUserParamsType ): DeleteUserReturnType;
	updateUser( data: UpdateUserParamsType ): UpdateUserReturnType;
	updateUserPassword( data: UpdateUserPasswordParamsType ): UpdateUserPasswordReturnType;
}