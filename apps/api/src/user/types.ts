import type { User } from "@/user/domain/user.entity.js"
import type { PaginatedResultType } from "@/types.js"

// Generic types
export type UserId = User["id"]
export type UserRole = User["role"]

// Request params types
export type FindUserByIdParamsType = {
  id: UserId
}

export type CreateUserParamsType = {
  email: User["email"],
  role: User["role"]
}

export type DeleteUserParamsType = {
  id: UserId
}

export type UpdateUserParamsType = {
  id: UserId,
  user: Pick<User, "email" | "address" | "phone">
}

export type FindUserByEmailParamsType = {
  email: User["email"]
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