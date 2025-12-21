import { type FastifyInstance } from "fastify"
import { userController } from "./user/adapters/inbound/user.controller.js"

export async function registerRoutes( app: FastifyInstance ) {
	await userController( app )
}
