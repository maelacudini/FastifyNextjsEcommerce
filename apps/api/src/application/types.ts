import type { Auth } from "@/auth/domain/auth.entity.js"
import type { CreateUserParamsType } from "@/user/types.js"

export type CreateUserWithAuthParamsType = CreateUserParamsType & {
  password: Auth["passwordHash"]
  provider: Auth["provider"]
}
