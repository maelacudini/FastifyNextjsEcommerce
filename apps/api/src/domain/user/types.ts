import type { PaginatedResultType } from "@/types.js"
import type { User } from "./domain/user.entity.js"
import schemas from "@/domain/user/adapters/inbound/user.schema.js"
import type { FromSchema } from "json-schema-to-ts"

// Generic types
export type UserId = User["id"]
export type UserRole = User["role"]

// Request types
export type FindUserByIdRequestType = FromSchema<typeof schemas.findUserByIdParamsSchema>
export type FindAllUsersRequestType = FromSchema<typeof schemas.findAllUsersQuerySchema>
export type FindUserByEmailRequestType = FromSchema<typeof schemas.findUserByEmailParamsSchema>
export type CreateUserRequestType = FromSchema<typeof schemas.createUserBodySchema>
export type DeleteUserRequestType = FromSchema<typeof schemas.deleteUserParamsSchema>

export type UpdateUserParamsType = {
  id: UserId,
  user: Partial<Pick<User, "email" | "address" | "phone" | "firstName" | "lastName">>
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
export type FindAllUsersReturnType = PaginatedResultType<User>
export type FindUserByIdReturnType = User | undefined
export type FindUserByEmailReturnType = User | undefined
export type CreateUserReturnType = User
export type DeleteUserReturnType = User | undefined
export type UpdateUserReturnType = User
export type UpdateUserPasswordReturnType = User
export type UpdateUserFavoritesReturnType = User
export type UpdateUserMarketingOptInReturnType = User
export type UpdateUserIsDisabledReturnType = User
export type UpdateUserIsVerifiedReturnType = User
export type UpdateUserRoleReturnType = User
export type UpdateUserCartReturnType = User
