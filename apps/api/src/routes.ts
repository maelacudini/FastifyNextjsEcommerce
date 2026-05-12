import { type FastifyInstance } from "fastify"
import { userController } from "@/domain/user/adapters/inbound/user.controller.js"
import { biscuitController } from "@/domain/biscuit/adapters/inbound/biscuit.controller.js"
import { orderController } from "@/domain/order/adapters/inbound/order.controller.js"
import { packageController } from "@/domain/package/adapters/inbound/package.controller.js"
import { authController } from "@/domain/auth/adapters/inbound/auth.controller.js"

export async function registerRoutes( app: FastifyInstance ) {
	await authController( app )
	await biscuitController( app )
	await orderController( app )
	await packageController( app )
	await userController( app )
}
