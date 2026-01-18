import type { User } from "@/user/domain/user.entity.js"
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fastifyPlugin from "fastify-plugin"

export default fastifyPlugin( async function ( fastify: FastifyInstance ) {

	fastify.decorate( "jwtAuth", async function ( request, reply ) {
		try {
			await request.jwtVerify()
		} catch {
			return reply.code( 401 ).send( { message: "Unauthorized lol." } )
		}
	} )

	fastify.decorate( "hasRole", function ( role: User["role"] ) {
		return async function ( request: FastifyRequest, reply: FastifyReply ) {
			const userRole = request.user.role
			if ( userRole !== role ) {
				return reply.code( 403 ).send( { message: "Forbidden: role is not valid." } )
			}
		}
	} )

} )