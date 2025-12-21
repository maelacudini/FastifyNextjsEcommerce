import type { User } from "@/user/domain/user.entity.js"
import type { FromSchema } from "json-schema-to-ts"
import schemas from "../user/adapters/inbound/user.schema.js"
import type { ErrorSchemasTypes } from "@/types.js"

// Generic types
export type UserId = User["id"]
export type UserWithoutPassword = Omit<User, "password">
export type UserRole = User["role"]

// Request params types
export type FindUserByIdParamsType = {
  id: UserId
}

export type CreateUserParamsType = {
  email: User["email"],
  password: User["password"]
  role: User["role"]
}

export type DeleteUserParamsType = {
  id: UserId
}

export type UpdateUserParamsType = {
  id: UserId,
  user: Pick<User, "email" | "address" | "username" | "phone">
}

export type FindUserByEmailParamsType = {
  email: User["email"]
}

export type UpdateUserPasswordParamsType = {
  id: UserId,
  newPassword: string
}

export type UpdateUserFavoritesParamsType = {
  id: UserId,
  favorites: string[]
}

export type UpdateUserMarketingOptInParamsType = {
  id: UserId,
  marketingOptIn: boolean
}

export type UpdateUserIsDisabledParamsType = {
  id: UserId,
  isDisabled: boolean
}

export type UpdateUserIsVerifiedParamsType = {
  id: UserId,
  isVerified: boolean
}

export type UpdateUserRoleParamsType = {
  id: UserId,
  role: UserRole
}

export type UpdateUserCartParamsType = {
  id: UserId,
  cart: string[]
}

// Return types
export type FindUserByIdReturnType = Promise<UserWithoutPassword | undefined>;
export type FindAllUsersReturnType = Promise<UserWithoutPassword[]>;
export type CreateUserReturnType = Promise<UserWithoutPassword>;
export type DeleteUserReturnType = Promise<UserWithoutPassword | undefined>;
export type UpdateUserReturnType = Promise<UserWithoutPassword>
export type FindUserByEmailReturnType = Promise<UserWithoutPassword | undefined>
export type UpdateUserPasswordReturnType = Promise<UserWithoutPassword>
export type UpdateUserFavoritesReturnType = Promise<UserWithoutPassword>
export type UpdateUserMarketingOptInReturnType = Promise<UserWithoutPassword>
export type UpdateUserIsDisabledReturnType = Promise<UserWithoutPassword>
export type UpdateUserIsVerifiedReturnType = Promise<UserWithoutPassword>
export type UpdateUserRoleReturnType = Promise<UserWithoutPassword>
export type UpdateUserCartReturnType = Promise<UserWithoutPassword>

// Schemas types
export type FindAllUsersReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.findAllUsersSuccessReturnSchema>
};

export type FindUserByIdReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.findUserByIdSuccessReturnSchema>
};

export type FindUserByEmailReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.findUserByEmailSuccessReturnSchema>
};

export type CreateUserReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.createUserSuccessReturnSchema>
};

export type DeleteUserReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.deleteUserSuccessReturnSchema>
};

export type UpdateUserReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.updateUserSuccessReturnSchema>
};

export type UpdateUserPasswordReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.updateUserPasswordSuccessReturnSchema>
};

export type UpdateUserIsVerifiedReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.updateUserIsVerifiedSuccessReturnSchema>
};

export type UpdateUserIsDisabledReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.updateUserIsDisabledSuccessReturnSchema>
};

export type UpdateUserRoleReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.updateUserRoleSuccessReturnSchema>
};

export type UpdateUserMarketingOptInReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.updateUserMarketingOptInSuccessReturnSchema>
};

export type UpdateUserFavoritesReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.updateUserFavoritesSuccessReturnSchema>
};

export type UpdateUserCartReplyType = ErrorSchemasTypes & {
	200: FromSchema<typeof schemas.updateUserCartSuccessReturnSchema>
};