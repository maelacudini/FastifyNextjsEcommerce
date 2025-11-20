import type { User } from "@/user/domain/user.entity.js";

// Generic types
export type UserId = User["id"]
export type UserWithoutPassword = Omit<User, "password">
export type UserRole = "admin" | "customer"

// Request params types
export type FindUserByIdParamsType = {
  id: UserId
};
export type CreateUserParamsType = {
  email: User["email"],
  password: User["password"]
  role: User["role"]
};
export type DeleteUserParamsType = {
  id: UserId
};
export type UpdateUserParamsType = {
  id: UserId,
  user: Omit<User, "id" | "password">
};
export type FindUserByEmailParamsType = {
  email: User["email"]
}
export type UpdateUserPasswordParamsType = {
  id: UserId,
  newPassword: string
}

// Return types
export type FindUserByIdReturnType = Promise<UserWithoutPassword | undefined>;
export type FindAllUsersReturnType = Promise<UserWithoutPassword[]>;
export type CreateUserReturnType = Promise<UserWithoutPassword>;
export type DeleteUserReturnType = Promise<UserWithoutPassword | undefined>;
export type UpdateUserReturnType = Promise<UserWithoutPassword>
export type FindUserByEmailReturnType = Promise<UserWithoutPassword | undefined>
export type UpdateUserPasswordReturnType = Promise<UserWithoutPassword>