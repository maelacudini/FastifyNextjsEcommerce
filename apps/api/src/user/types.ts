import type { User } from "@/user/domain/user.entity.js";

// Geneic types
export type UserId = User["id"]
export type UserWithoutPassword = Omit<User, "password">
export enum UserRole {
  Admin = "admin",
  Customer = "customer"
}

// Request params types
export type FindUserByIdParamsType = {
  id: UserId
};
export type CreateUserParamsType = {
  email: User["email"],
  password: User["password"]
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