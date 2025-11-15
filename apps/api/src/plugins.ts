import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export async function registerPlugins( fastify: FastifyInstance ) {
	
	await fastify.register( fastifyCors, {
		origin: "http://localhost:3000"
	} );

	await fastify.register( fastifyRateLimit, {
		max: 400,
		timeWindow: "1 minute"
	} );

	await fastify.register( fastifySwagger, {
		  openapi: {
			info: {
				title: "openAPI",
				version: "3.0.0"
			}
		}
	} );
	
	await fastify.register( fastifySwaggerUi, {
		routePrefix: "/docs",
		uiConfig: {
			docExpansion: "list",
			deepLinking: false
		},
		uiHooks: {
			onRequest: function ( request, reply, next ) { next(); },
			preHandler: function ( request, reply, next ) { next(); }
		},
		// TODO: fix issue with logo after build and start
		// logo: undefined,
		staticCSP: true,
		transformStaticCSP: ( header ) => header,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		transformSpecification: ( swaggerObject, request, reply ) => { return swaggerObject; },
		transformSpecificationClone: true,
	} );
}