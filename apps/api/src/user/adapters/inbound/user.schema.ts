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

const userWithoutPasswordSuccessReturnSchema = {
	description: "Successful response.",
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
		isVerified: {
			type: "boolean"
		},
		lastLoginAt: {
			type: "string"
		},
		lastPasswordChangeAt: {
			type: "string"
		},
		marketingOptIn: {
			type: "boolean"
		},
		phone: {
			type: "string"
		},
		refreshTokenVersion: {
			type: "number"
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
		},
		username: {
			type: "string"
		}
	},
	required: [
		"createdAt",
		"email",
		"id",
		"isDisabled",
		"isVerified",
		"refreshTokenVersion",
		"role"
	],
	type: "object"
} as const

const findAllUsersSuccessReturnSchema = {
	description: "Find all users success response.",
	type: "array",
	items: userWithoutPasswordSuccessReturnSchema
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

const findUserByIdSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

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

const findUserByEmailSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

const createUserBodySchema = {
	description: "Create user body.",
	type: "object",
	properties: {
		email: {
			type: "string"
		},
		password: {
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
		"password",
		"role"
	]
} as const

const createUserSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

const deleteUserParamsSchema = findUserByIdParamsSchema

const deleteUserSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

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
		},
		username: {
			type: "string"
		}
	},
	required: [
		"email"
	],
	type: "object"
} as const

const updateUserParamsSchema = findUserByIdParamsSchema

const updateUserSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

const updateUserPasswordParamsSchema = userIdSchema

const updateUserPasswordBodySchema = {
	description: "Update user password body.",
	properties: {
		newPassword: {
			type: "string"
		}
	},
	required: [
		"newPassword"
	],
	type: "object"
} as const

const updateUserPasswordSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

const updateUserIsVerifiedParamsSchema = userIdSchema

const updateUserIsVerifiedBodySchema = {
	description: "Update user is verified body.",
	properties: {
		isVerified: {
			type: "boolean"
		}
	},
	required: [
		"isVerified"
	],
	type: "object"
} as const

const updateUserIsVerifiedSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

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

const updateUserIsDisabledSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

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

const updateUserRoleSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

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

const updateUserMarketingOptInSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

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

const updateUserFavoritesSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

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

const updateUserCartSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema

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
	updateUserIsVerifiedBodySchema,
	updateUserIsVerifiedParamsSchema,
	updateUserIsVerifiedSuccessReturnSchema,
	updateUserMarketingOptInBodySchema,
	updateUserMarketingOptInParamsSchema,
	updateUserMarketingOptInSuccessReturnSchema,
	updateUserParamsSchema,
	updateUserPasswordBodySchema,
	updateUserPasswordParamsSchema,
	updateUserPasswordSuccessReturnSchema,
	updateUserRoleBodySchema,
	updateUserRoleParamsSchema,
	updateUserRoleSuccessReturnSchema,
	updateUserSuccessReturnSchema
}