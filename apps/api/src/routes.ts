import { type FastifyInstance } from "fastify"
import { userController } from "./user/adapters/inbound/user.controller.js"
import { biscuitController } from "./biscuit/adapters/inbound/biscuit.controller.js"
import { orderController } from "./order/adapters/inbound/order.controller.js"
import { packageController } from "./package/adapters/inbound/package.controller.js"

export async function registerRoutes( app: FastifyInstance ) {
	await biscuitController( app )
	await orderController( app )
	await packageController( app )
	await userController( app )
}
