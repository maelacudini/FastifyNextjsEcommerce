import "@fastify/jwt"
import type { User } from "@/domain/user/domain/user.entity.js"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      sub: User["id"]
      role: User["role"]
    }
  }
}
