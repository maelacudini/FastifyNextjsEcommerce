import Fastify from "fastify"
import { registerRoutes } from "./routes.js"
import { registerPlugins } from "./plugins.js"
import dotenv from "dotenv"

async function main() {
	dotenv.config()

	const fastify = Fastify( { logger: true } )

	await registerPlugins( fastify )
	await registerRoutes( fastify )

	const PORT = Number( process.env.PORT ) || 80

	try {
		await fastify.listen( { port: PORT, host: "0.0.0.0" } )
		fastify.log.info( `Server running on http://localhost:${PORT}` )
	} catch ( err ) {
		fastify.log.error( err )
		process.exit( 1 )
	}

	// Graceful shutdown handlers
	const listeners = ["SIGINT", "SIGTERM"]

	listeners.forEach( ( signal ) => {
		process.on( signal, async () => {
			fastify.log.info( `Received ${signal}. Shutting down...` )
			await fastify.close()
			process.exit( 0 )
		} )
	} )
}

main()