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
	description: "Biscuit ID schema.",
	type: "object",
	properties: {
		id: { type: "string" }
	},
	required: ["id"]
} as const
const findByIdSuccessReturnSchema = authSchema

export default {
	findByIdParamsSchema,
	findByIdSuccessReturnSchema
}