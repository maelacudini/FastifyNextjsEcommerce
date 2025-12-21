import Fastify from "fastify"
import { registerRoutes } from "./routes.js"
import { registerPlugins } from "./plugins.js"

async function main() {
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
	process.on( "SIGINT", async () => {
		fastify.log.info( "Received SIGINT. Shutting down..." )
		await fastify.close()
		process.exit( 0 )
	} )

	process.on( "SIGTERM", async () => {
		fastify.log.info( "Received SIGTERM. Shutting down..." )
		await fastify.close()
		process.exit( 0 )
	} )
}

main()