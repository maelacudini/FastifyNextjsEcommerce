import type { User } from "@/user/domain/user.entity.ts"
import "fastify"

declare module "fastify" {
  interface FastifyInstance {
    jwtAuth: ( request: FastifyRequest, reply: FastifyReply ) => Promise<void>
    hasRole: (role: User["role"]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}
