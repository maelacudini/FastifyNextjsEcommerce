import { paginationMetaSchema } from "@/const.js"

const userIdSchema = {
	description: "User id schema.",
	type: "object",
	properties: {
		id: {
			type: "string"
		}
	},
	required: ["id"]
} as const

const userSchema = {
	description: "Base user schema.",
	properties: {
		address: {
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
		},
		cart: {
			items: {
				type: "string"
			},
			type: "array"
		},
		createdAt: {
			type: "string"
		},
		email: {
			type: "string"
		},
		favorites: {
			items: {
				type: "string"
			},
			type: "array"
		},
		id: {
			type: "string"
		},
		isDisabled: {
			type: "boolean"
		},
		marketingOptIn: {
			type: "boolean"
		},
		phone: {
			type: "string"
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

export const findAllUsersSuccessReturnSchema = {
	description: "Find all users paginated response.",
	type: "object",
	properties: {
		items: {
			type: "array",
			items: userSchema,
		},
		...paginationMetaSchema.properties
	},
	required: [
		"items",
		...paginationMetaSchema.required
	]
} as const

const findUserByIdParamsSchema = {
	description: "Find user by id params.",
	type: "object",
	properties: {
		id: {
			type: "string"
		}
	},
	required: ["id"]
} as const
const findUserByIdSuccessReturnSchema = userSchema

const findUserByEmailParamsSchema = {
	description: "Find user by email params.",
	type: "object",
	properties: {
		email: {
			type: "string"
		}
	},
	required: [
		"email"
	],
} as const
const findUserByEmailSuccessReturnSchema = userSchema

const createUserBodySchema = {
	description: "Create user body.",
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
		}
	},
	required: [
		"email",
		"role"
	]
} as const
const createUserSuccessReturnSchema = userSchema

const deleteUserParamsSchema = findUserByIdParamsSchema
const deleteUserSuccessReturnSchema = userSchema

const updateUserBodySchema = {
	description: "Update user body.",
	properties: {
		address: {
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
		},
		email: {
			type: "string"
		},
		phone: {
			type: "string"
		}
	},
	required: [
		"email"
	],
	type: "object"
} as const
const updateUserParamsSchema = findUserByIdParamsSchema
const updateUserSuccessReturnSchema = userSchema

const updateUserIsDisabledParamsSchema = userIdSchema
const updateUserIsDisabledBodySchema = {
	description: "Update user is disabled body.",
	properties: {
		isDisabled: {
			type: "boolean"
		}
	},
	required: [
		"isDisabled"
	],
	type: "object"
} as const
const updateUserIsDisabledSuccessReturnSchema = userSchema

const updateUserRoleParamsSchema = userIdSchema
const updateUserRoleBodySchema = {
	description: "Update user role body.",
	properties: {
		role: {
			enum: [
				"admin",
				"customer"
			],
			type: "string"
		},
	},
	required: [
		"role"
	],
	type: "object"
} as const
const updateUserRoleSuccessReturnSchema = userSchema

const updateUserMarketingOptInParamsSchema = userIdSchema
const updateUserMarketingOptInBodySchema = {
	description: "Update user marketingOptIn body.",
	properties: {
		marketingOptIn: {
			type: "boolean"
		},
	},
	required: [
		"marketingOptIn"
	],
	type: "object"
} as const
const updateUserMarketingOptInSuccessReturnSchema = userSchema

const updateUserFavoritesParamsSchema = userIdSchema
const updateUserFavoritesBodySchema = {
	description: "Update user favorites body.",
	properties: {
		favorites: {
			items: {
				type: "string"
			},
			type: "array"
		},
	},
	required: [
		"favorites"
	],
	type: "object"
} as const
const updateUserFavoritesSuccessReturnSchema = userSchema

const updateUserCartParamsSchema = userIdSchema
const updateUserCartBodySchema = {
	description: "Update user cart body.",
	properties: {
		cart: {
			items: {
				type: "string"
			},
			type: "array"
		},
	},
	required: [
		"cart"
	],
	type: "object"
} as const
const updateUserCartSuccessReturnSchema = userSchema

export default {
	createUserBodySchema,
	createUserSuccessReturnSchema,
	deleteUserParamsSchema,
	deleteUserSuccessReturnSchema,
	findAllUsersSuccessReturnSchema,
	findUserByEmailParamsSchema,
	findUserByEmailSuccessReturnSchema,
	findUserByIdParamsSchema,
	findUserByIdSuccessReturnSchema,
	updateUserBodySchema,
	updateUserCartBodySchema,
	updateUserCartParamsSchema,
	updateUserCartSuccessReturnSchema,
	updateUserFavoritesBodySchema,
	updateUserFavoritesParamsSchema,
	updateUserFavoritesSuccessReturnSchema,
	updateUserIsDisabledBodySchema,
	updateUserIsDisabledParamsSchema,
	updateUserIsDisabledSuccessReturnSchema,
	updateUserMarketingOptInBodySchema,
	updateUserMarketingOptInParamsSchema,
	updateUserMarketingOptInSuccessReturnSchema,
	updateUserParamsSchema,
	updateUserRoleBodySchema,
	updateUserRoleParamsSchema,
	updateUserRoleSuccessReturnSchema,
	updateUserSuccessReturnSchema
}