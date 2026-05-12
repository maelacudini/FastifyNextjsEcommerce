import "fastify"
import type { User } from "@/domain/user/domain/user.entity.js"
import type { FastifyReply, FastifyRequest } from "fastify"

declare module "fastify" {
  interface FastifyInstance {
    jwtAuth: ( request: FastifyRequest, reply: FastifyReply ) => Promise<void>
    hasRole: (role: User["role"]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}
