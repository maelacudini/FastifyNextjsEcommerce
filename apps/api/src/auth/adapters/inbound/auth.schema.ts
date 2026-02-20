import userSchema from "@/user/adapters/inbound/user.schema.js"

const authSchema = {
	properties: {
		createdAt: {
			format: "date-time",
			type: "string"
		},
		emailVerifiedAt: {
			format: "date-time",
			type: "string"
		},
		id: {
			type: "string"
		},
		lastLoginAt: {
			format: "date-time",
			type: "string"
		},
		lastPasswordChangeAt: {
			format: "date-time",
			type: "string"
		},
		passwordHash: {
			type: "string"
		},
		provider: {
			enum: [
				"google",
				"local"
			],
			type: "string"
		},
		refreshTokenVersion: {
			type: "number"
		},
		userId: {
			type: "string"
		},
		username: {
			type: "string"
		}
	},
	required: [
		"createdAt",
		"id",
		"provider",
		"refreshTokenVersion",
		"userId"
	],
	type: "object"
} as const

const findByIdParamsSchema = {
	description: "Auth ID schema.",
	type: "object",
	properties: {
		id: { type: "string" }
	},
	required: ["id"]
} as const
const findByIdSuccessReturnSchema = authSchema

const createUserWithAuthBodySchema = {
	description: "Create user with auth body.",
	type: "object",
	properties: {
		...userSchema.createUserBodySchema.properties,
		password: {
			type: "string"
		},
		provider: {
			type: "string",
			enum: [
				"local",
				"google"
			]
		},
	},
	required: [
		"email",
		"provider",
		"role"
	],
	allOf: [
		{
			if: {
				properties: { provider: { const: "local" } },
				required: ["provider"]
			},
			then: {
				required: ["password"]
			}
		}
	]
} as const

const createUserWithAuthSuccessReturnSchema = {
	type: "object",
	properties: {
		user: userSchema.findUserByIdSuccessReturnSchema,
		auth: authSchema.properties
	},
	required: ["user", "auth"]
} as const

export default {
	findByIdParamsSchema,
	findByIdSuccessReturnSchema,
	createUserWithAuthBodySchema,
	createUserWithAuthSuccessReturnSchema,
}
