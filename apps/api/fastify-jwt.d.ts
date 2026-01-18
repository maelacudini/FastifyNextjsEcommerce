import type { User } from '@/user/domain/user.entity.ts';
import '@fastify/jwt'

import "@fastify/jwt"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      role: User["role"]
    }
  }
}
