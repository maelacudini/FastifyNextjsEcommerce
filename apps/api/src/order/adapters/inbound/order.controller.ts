import { errorSchemas } from "@/const.js"
import type { FastifyInstance } from "fastify"
import type { FromSchema } from "json-schema-to-ts"
import schemas from "./order.schema.js"
import type {
	FindAllOrdersReturnType,
	FindOrderByIdReturnType,
	CreateOrderReturnType,
	UpdateOrderReturnType,
	UpdateOrderPaymentReturnType,
	UpdateOrderFulfillmentReturnType,
	DeleteOrderReturnType
} from "../../types.js"
import createOrderUsecases from "./order.usecase.factory.js"
import type { ReplyType } from "@/types.js"

export async function orderController( fastify: FastifyInstance ) {
	const usecasesFactory = createOrderUsecases( fastify )

	// PUBLIC - FIND ALL ORDERS
	fastify.get<{ Reply: ReplyType<FindAllOrdersReturnType> }>( "/order", { schema: {
		tags: ["Order"],
		response: {
			200: schemas.findAllOrdersSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllOrders.execute()

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - FIND ORDER BY ID
	fastify.get<{
    Params: FromSchema<typeof schemas.findOrderByIdParamsSchema>,
    Reply: ReplyType<FindOrderByIdReturnType>
  }>( "/order/:id", { schema: {
  	tags: ["Order"],
  	params: schemas.findOrderByIdParamsSchema,
  	response: {
  		200: schemas.findOrderByIdSuccessReturnSchema,
  		...errorSchemas
  	}
  } }, async ( req, reply ) => {
  	const { id } = req.params

  	const order = await usecasesFactory.findOrderById.execute( { id } )

  	if ( !order ) {return reply.code( 404 ).send( { error: "Order not found" } )}

  	return reply.code( 200 ).send( order )
  } )

	// PRIVATE - CREATE ORDER
	fastify.post<{
    Body: FromSchema<typeof schemas.createOrderBodySchema>,
    Reply: ReplyType<CreateOrderReturnType>
  }>( "/order", { schema: {
  	tags: ["Order"],
  	body: schemas.createOrderBodySchema,
  	response: {
  		200: schemas.createOrderSuccessReturnSchema,
  		...errorSchemas
  	}
  } }, async ( req, reply ) => {
  	const data = req.body

  	try {
  		const newOrder = await usecasesFactory.createOrder.execute( data )

  		return reply.code( 200 ).send( newOrder )
  	} catch ( err: unknown ) {
  		const message = err instanceof Error ? err.message : "Unknown error"
  		return reply.code( 500 ).send( { message } )
  	}
  } )

	// PRIVATE - UPDATE ORDER
	fastify.put<{
		Params: FromSchema<typeof schemas.updateOrderParamsSchema>,
    Body: FromSchema<typeof schemas.updateOrderBodySchema>,
    Reply: ReplyType<UpdateOrderReturnType>
  }>( "/order/:id", { schema: {
  	tags: ["Order"],
  	params: schemas.updateOrderParamsSchema,
  	body: schemas.updateOrderBodySchema,
  	response: {
  		200: schemas.updateOrderSuccessReturnSchema,
  		...errorSchemas
  	}
  } }, async ( req, reply ) => {
  	const { id } = req.params
  	const { order } = req.body

  	try {
  		const updated = await usecasesFactory.updateOrder.execute( { id, order } )

  		return reply.code( 200 ).send( updated )
  	} catch ( err: unknown ) {
  		const message = err instanceof Error ? err.message : "Unknown error"
  		return reply.code( 500 ).send( { message } )
  	}
  } )

	// PRIVATE - UPDATE PAYMENT STATUS
	fastify.put<{
		Params: FromSchema<typeof schemas.updateOrderPaymentStatusParamsSchema>,
		Body: FromSchema<typeof schemas.updateOrderPaymentStatusBodySchema>,
		Reply: ReplyType<UpdateOrderPaymentReturnType>
	}>( "/order/:id/payment-status", { schema: {
		tags: ["Order"],
		params: schemas.updateOrderPaymentStatusParamsSchema,
		body: schemas.updateOrderPaymentStatusBodySchema,
		response: {
			200: schemas.updateOrderPaymentSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params
		const { paymentStatus } = req.body

		try {
			const updated = await usecasesFactory.updateOrderPaymentStatus.execute( { id, paymentStatus } )

			return reply.code( 200 ).send( updated )
		} catch ( err: unknown ) {
			const message = err instanceof Error ? err.message : "Unknown error"
			return reply.code( 500 ).send( { message } )
		}
	} )

	// PRIVATE - UPDATE FULFILLMENT STATUS
	fastify.put<{
		Params: FromSchema<typeof schemas.updateOrderFulfillmentParamsSchema>,
		Body: FromSchema<typeof schemas.updateOrderFulfillmentBodySchema>,
		Reply: ReplyType<UpdateOrderFulfillmentReturnType>
	}>( "/order/:id/fulfillment-status", { schema: {
		tags: ["Order"],
		params: schemas.updateOrderFulfillmentParamsSchema,
		body: schemas.updateOrderFulfillmentBodySchema,
		response: {
			200: schemas.updateOrderFulfillmentSuccessReturnSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const { id } = req.params
		const { fulfillmentStatus } = req.body

		try {
			const updated = await usecasesFactory.updateOrderFulfillmentStatus.execute( { id, fulfillmentStatus } )

			return reply.code( 200 ).send( updated )
		} catch ( err: unknown ) {
			const message = err instanceof Error ? err.message : "Unknown error"
			return reply.code( 500 ).send( { message } )
		}
	} )

	// PRIVATE - DELETE ORDER
	fastify.delete<{
    Params: FromSchema<typeof schemas.deleteOrderParamsSchema>,
    Reply: ReplyType<DeleteOrderReturnType>
  }>( "/order/:id", { schema: {
  	tags: ["Order"],
  	params: schemas.deleteOrderParamsSchema,
  	response: {
  		200: schemas.deleteOrderSuccessReturnSchema,
  		...errorSchemas
  	}
  } }, async ( req, reply ) => {
  	const { id } = req.params

  	try {
  		const order = await usecasesFactory.deleteOrder.execute( { id } )

  		if ( !order ) {return reply.code( 404 ).send( { error: "Order not found" } )}

  		return reply.code( 200 ).send( order )
  	} catch ( err: unknown ) {
  		const message = err instanceof Error ? err.message : "Unknown error"
  		return reply.code( 500 ).send( { message } )
  	}
  } )
}
