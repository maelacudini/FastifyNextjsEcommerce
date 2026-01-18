import type { Auth } from "./domain/auth.entity.js"

// Request params types
export type FindByIdParamsType = {
  id: string
}

export type FindByUserIdParamsType = {
  userId: string
}

export type IncrementRefreshTokenVersionParamsType = {
  refreshTokenVersion: number
  id: string
}

export type FindByUsernameParamsType = {
  username: string
}

export type UpdateUsernameParamsType = {
  username: string
  id: string
}

export type UpdatePasswordParamsType = {
  password: string
  id: string
}

export type UpdateEmailVerifiedAtParamsType = {
  emailVerifiedAt: Date
  id: string
}

export type UpdateLastLoginAtParamsType = {
  lastPasswordChangeAt: Date
  id: string
}

export type LoginParamsType = {
  username: string
  password: string
}

// Return types
export type FindByIdReturnType = Auth
export type FindByUserIdReturnType = Auth
export type IncrementRefreshTokenVersionReturnType = Auth
export type FindByUsernameReturnType = Auth
export type UpdateUsernameReturnType = Auth
export type UpdatePasswordReturnType = Auth
export type UpdateEmailVerifiedAtReturnType = Auth
export type UpdateLastLoginAtReturnType = Auth
export type LoginReturnType = Auth
export type LogoutReturnType = boolean