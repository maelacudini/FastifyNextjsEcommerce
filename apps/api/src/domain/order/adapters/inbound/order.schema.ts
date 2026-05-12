import { paginationMetaSchema } from "@/const.js"
import { supportedCurrencyCodes } from "@/lib/pricing/currency.js"

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
		lineTotalMinor: {
			minimum: 0,
			type: "integer"
		},
		name: {
			type: "string"
		},
		productId: {
			type: "string"
		},
		quantity: {
			minimum: 1,
			type: "integer"
		},
		unitPriceMinor: {
			minimum: 0,
			type: "integer"
		}
	},
	required: [
		"lineTotalMinor",
		"name",
		"productId",
		"quantity",
		"unitPriceMinor"
	],
	type: "object"
} as const

const createOrderItemSchema = {
	properties: {
		productId: {
			type: "string"
		},
		quantity: {
			minimum: 1,
			type: "integer"
		}
	},
	required: [
		"productId",
		"quantity"
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
		baseCurrency: {
			enum: supportedCurrencyCodes,
			type: "string"
		},
		discountTotalMinor: {
			minimum: 0,
			type: "integer"
		},
		currency: {
			enum: supportedCurrencyCodes,
			type: "string"
		},
		exchangeRate: {
			exclusiveMinimum: 0,
			type: "number"
		},
		exchangeRateCapturedAt: {
			type: "string"
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
		shippingCostMinor: {
			minimum: 0,
			type: "integer"
		},
		subtotalMinor: {
			minimum: 0,
			type: "integer"
		},
		totalMinor: {
			minimum: 0,
			type: "integer"
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
		"currency",
		"baseCurrency",
		"fulfillmentStatus",
		"id",
		"items",
		"paymentStatus",
		"shippingAddress",
		"shippingCostMinor",
		"subtotalMinor",
		"totalMinor",
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
		items: {
			items: createOrderItemSchema,
			type: "array"
		},
		currency: {
			enum: supportedCurrencyCodes,
			type: "string"
		},
		shippingAddress: shippingAddressSchema,
		userId: {
			type: "string"
		}
	},
	required: [
		"createdAt",
		"currency",
		"items",
		"shippingAddress",
		"userId"
	],
	type: "object"
} as const

const createOrderSuccessReturnSchema = orderSchema

const updateOrderPayloadSchema = {
	properties: {
		baseCurrency: {
			enum: supportedCurrencyCodes,
			type: "string"
		},
		currency: {
			enum: supportedCurrencyCodes,
			type: "string"
		},
		discountTotalMinor: {
			minimum: 0,
			type: "integer"
		},
		exchangeRate: {
			exclusiveMinimum: 0,
			type: "number"
		},
		exchangeRateCapturedAt: {
			type: "string"
		},
		fulfillmentStatus: fulfillmentStatusSchema,
		items: {
			items: orderItemSchema,
			type: "array"
		},
		paymentStatus: paymentStatusSchema,
		shippingAddress: shippingAddressSchema,
		shippingCostMinor: {
			minimum: 0,
			type: "integer"
		},
		subtotalMinor: {
			minimum: 0,
			type: "integer"
		},
		totalMinor: {
			minimum: 0,
			type: "integer"
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
