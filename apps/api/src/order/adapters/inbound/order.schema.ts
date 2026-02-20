import { paginationMetaSchema } from "@/const.js"

const orderIdSchema = {
	type: "object",
	properties: {
		id: {
			type: "string"
		}
	},
	required: ["id"]
} as const

const paymentStatusSchema = {
	enum: [
		"failed",
		"paid",
		"pending"
	],
	type: "string"
} as const

const fulfillmentStatusSchema = {
	enum: [
		"cancelled",
		"delivered",
		"processing",
		"shipped",
		"unfulfilled"
	],
	type: "string"
} as const

const orderItemSchema = {
	properties: {
		name: {
			type: "string"
		},
		productId: {
			type: "string"
		},
		quantity: {
			type: "number"
		},
		totalPrice: {
			type: "number"
		}
	},
	required: [
		"name",
		"productId",
		"quantity",
		"totalPrice"
	],
	type: "object"
} as const

const shippingAddressSchema = {
	properties: {
		city: {
			type: "string"
		},
		country: {
			type: "string"
		},
		postalCode: {
			type: "string"
		},
		street: {
			type: "string"
		}
	},
	required: [
		"city",
		"country",
		"postalCode",
		"street"
	],
	type: "object"
} as const

const orderSchema = {
	properties: {
		createdAt: {
			type: "string"
		},
		discountTotal: {
			type: "number"
		},
		fulfillmentStatus: fulfillmentStatusSchema,
		id: {
			type: "string"
		},
		items: {
			items: orderItemSchema,
			type: "array"
		},
		paymentStatus: paymentStatusSchema,
		shippingAddress: shippingAddressSchema,
		shippingCost: {
			type: "number"
		},
		subtotal: {
			type: "number"
		},
		total: {
			type: "number"
		},
		updatedAt: {
			type: "string"
		},
		userId: {
			type: "string"
		}
	},
	required: [
		"createdAt",
		"fulfillmentStatus",
		"id",
		"items",
		"paymentStatus",
		"shippingAddress",
		"shippingCost",
		"subtotal",
		"total",
		"userId"
	],
	type: "object"
} as const

const findAllOrdersSuccessReturnSchema = {
	description: "Find all orders (paginated)",
	type: "object",
	properties: {
		items: {
			items: orderSchema,
			type: "array"
		},
		...paginationMetaSchema.properties
	},
	required: ["items", ...paginationMetaSchema.required]
} as const

const findOrderByIdParamsSchema = {
	type: "object",
	properties: {
		id: {
			type: "string"
		}
	},
	required: ["id"] } as const
const findOrderByIdSuccessReturnSchema = orderSchema

const createOrderBodySchema = {
	properties: {
		createdAt: {
			type: "string"
		},
		discountTotal: {
			type: "number"
		},
		fulfillmentStatus: fulfillmentStatusSchema,
		items: {
			items: orderItemSchema,
			type: "array"
		},
		paymentStatus: paymentStatusSchema,
		shippingAddress: shippingAddressSchema,
		shippingCost: {
			type: "number"
		},
		subtotal: {
			type: "number"
		},
		total: {
			type: "number"
		},
		userId: {
			type: "string"
		}
	},
	required: [
		"createdAt",
		"fulfillmentStatus",
		"items",
		"paymentStatus",
		"shippingAddress",
		"shippingCost",
		"subtotal",
		"total",
		"userId"
	],
	type: "object"
} as const

const createOrderSuccessReturnSchema = orderSchema

const updateOrderPayloadSchema = {
	properties: {
		discountTotal: {
			type: "number"
		},
		fulfillmentStatus: fulfillmentStatusSchema,
		items: {
			items: orderItemSchema,
			type: "array"
		},
		paymentStatus: paymentStatusSchema,
		shippingAddress: shippingAddressSchema,
		shippingCost: {
			type: "number"
		},
		subtotal: {
			type: "number"
		},
		total: {
			type: "number"
		},
		updatedAt: {
			type: "string"
		},
		userId: {
			type: "string"
		}
	},
	type: "object"
} as const

const updateOrderBodySchema = {
	properties: {
		order: updateOrderPayloadSchema
	},
	required: [
		"order"
	],
	type: "object"
} as const

const updateOrderParamsSchema = orderIdSchema

const updateOrderSuccessReturnSchema = orderSchema

const updateOrderPaymentStatusBodySchema = {
	type: "object",
	properties: {
		paymentStatus: paymentStatusSchema
	},
	required: ["paymentStatus"]
} as const

const updateOrderPaymentStatusParamsSchema = orderIdSchema

const updateOrderPaymentSuccessReturnSchema = orderSchema

const updateOrderFulfillmentBodySchema = {
	type: "object",
	properties: {
		fulfillmentStatus: fulfillmentStatusSchema
	},
	required: ["fulfillmentStatus"]
} as const

const updateOrderFulfillmentParamsSchema = orderIdSchema

const updateOrderFulfillmentSuccessReturnSchema = orderSchema

const deleteOrderParamsSchema = findOrderByIdParamsSchema
const deleteOrderSuccessReturnSchema = orderSchema

export default {
	orderSchema,
	findAllOrdersSuccessReturnSchema,
	findOrderByIdParamsSchema,
	findOrderByIdSuccessReturnSchema,
	createOrderBodySchema,
	createOrderSuccessReturnSchema,
	updateOrderBodySchema,
	updateOrderParamsSchema,
	updateOrderSuccessReturnSchema,
	updateOrderFulfillmentParamsSchema,
	updateOrderPaymentStatusBodySchema,
	updateOrderPaymentStatusParamsSchema,
	updateOrderPaymentSuccessReturnSchema,
	updateOrderFulfillmentBodySchema,
	updateOrderFulfillmentSuccessReturnSchema,
	deleteOrderParamsSchema,
	deleteOrderSuccessReturnSchema
}
