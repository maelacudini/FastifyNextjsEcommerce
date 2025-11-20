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
  findAllUsers(): FindAllUsersReturnType;
	findUserById( data: FindUserByIdParamsType ): FindUserByIdReturnType;
	findUserByEmail( data: FindUserByEmailParamsType ): FindUserByEmailReturnType;
  createUser( data: CreateUserParamsType ): CreateUserReturnType;
  deleteUser( data: DeleteUserParamsType ): DeleteUserReturnType;
	updateUser( data: UpdateUserParamsType ): UpdateUserReturnType;
	updateUserPassword( data: UpdateUserPasswordParamsType ): UpdateUserPasswordReturnType;
}