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

const userSchema = {
	properties: {
		createdAt: {
			type: "string"
		},
		email: {
			type: "string"
		},
		id: {
			type: "string"
		},
		isDisabled: {
			type: "boolean"
		},
		role: {
			enum: [
				"admin",
				"customer"
			],
			type: "string"
		},
		updatedAt: {
			type: "string"
		}
	},
	required: [
		"createdAt",
		"email",
		"id",
		"isDisabled",
		"role"
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

const registerBodySchema = {
	description: "Create user + auth body.",
	type: "object",
	properties: {
		email: {
			type: "string"
		},
		role: {
			type: "string",
			enum: [
				"admin",
				"customer"
			]
		},
		provider: {
			type: "string",
			enum: [
				"local",
				"google"
			]
		},
		password: {
			type: "string"
		}
	},
	required: [
		"email",
		"provider"
	]
} as const

const registerSuccessReturnSchema = {
	type: "object",
	properties: {
		user: userSchema,
		auth: authSchema
	},
	required: [
		"user",
		"auth"
	]
} as const

const findByIdSuccessReturnSchema = authSchema

export default {
	findByIdParamsSchema,
	findByIdSuccessReturnSchema,
	registerBodySchema,
	registerSuccessReturnSchema
}
