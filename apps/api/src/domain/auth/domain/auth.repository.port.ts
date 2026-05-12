import type { CreateAuthParamsType, CreateAuthReturnType, FindByIdParamsType, FindByIdReturnType, FindByUserIdParamsType, FindByUserIdReturnType, FindByUsernameParamsType, FindByUsernameReturnType, IncrementRefreshTokenVersionParamsType, IncrementRefreshTokenVersionReturnType, UpdateEmailVerifiedAtParamsType, UpdateEmailVerifiedAtReturnType, UpdateLastLoginAtParamsType, UpdateLastLoginAtReturnType, UpdatePasswordParamsType, UpdatePasswordReturnType, UpdateUsernameParamsType, UpdateUsernameReturnType } from "../types.js"

// Login is a use case! Repositories only provide the Lego bricks.
// You don’t add login() to the repo... You add the methods needed to build login.

export interface AuthRepositoryPort {
	findById( data: FindByIdParamsType ): Promise<FindByIdReturnType>
	findByUserId( data: FindByUserIdParamsType ): Promise<FindByUserIdReturnType>
	createAuth( data: CreateAuthParamsType ): Promise<CreateAuthReturnType>
	incrementRefreshTokenVersion( data: IncrementRefreshTokenVersionParamsType ): Promise<IncrementRefreshTokenVersionReturnType>
	findByUsername( data: FindByUsernameParamsType ): Promise<FindByUsernameReturnType>
	updateUsername( data: UpdateUsernameParamsType ): Promise<UpdateUsernameReturnType>
	updatePassword( data: UpdatePasswordParamsType ): Promise<UpdatePasswordReturnType>
	updateUserEmailVerifiedAt( data: UpdateEmailVerifiedAtParamsType ): Promise<UpdateEmailVerifiedAtReturnType>
	updateLastLoginAt( data: UpdateLastLoginAtParamsType ): Promise<UpdateLastLoginAtReturnType>
}