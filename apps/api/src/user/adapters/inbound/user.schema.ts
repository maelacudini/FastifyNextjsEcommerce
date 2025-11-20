 
export const notFoundSchema = {
	description: "No resource found.",
	type: "object",
	properties: {
		error: { type: "string" },
	},
	required: ["error"],
} as const;

export const unauthorizedSchema = {
	description: "Unauthorized.",
	type: "object",
	properties: {
		message: { type: "string" },
	},
	required: ["message"],
} as const;

export const serverErrorSchema = {
	description: "Server error.",
	type: "object",
	properties: {
		message: { type: "string" },
	},
	required: ["message"],
} as const;

export const userWithoutPasswordSuccessReturnSchema = {
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
		username: {
			type: "string"
		}
	},
	required: [
		"email",
		"id",
		"role"
	],
	type: "object"
} as const;

export const findAllUsersSuccessReturnSchema = {
	description: "Find all users success response.",
	type: "array",
	items: userWithoutPasswordSuccessReturnSchema
} as const;

export const findUserByIdParamsSchema = {
	description: "Find user by id params.",
	type: "object",
	properties: {
		id: {
			type: "string"
		}
	},
	required: ["id"]
} as const;

export const findUserByIdSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema;

export const findUserByEmailParamsSchema = {
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
} as const;

export const findUserByEmailSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema;

export const createUserBodySchema = {
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
			type: "string", enum: ["admin", "customer"]
		}
	},
	required: [
		"email",
		"password",
		"role"
	]
} as const;

export const createUserSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema;

export const deleteUserParamsSchema = {
	description: "Delete user params.",
	properties: {
		id: {
			type: "string"
		}
	},
	required: [
		"id"
	],
	type: "object"
} as const;

export const deleteUserSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema;

export const updateUserBodySchema = {
	description: "Update user params.",
	properties: {
		user: {
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
				favorites: {
					items: {
						type: "string"
					},
					type: "array"
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
				username: {
					type: "string"
				}
			},
			required: [
				"email",
				"role"
			],
			type: "object"
		}
	},
	required: [
		"user"
	],
	type: "object"
} as const;

export const updateUserParamsSchema = {
	description: "Update user body.",
	type: "object",
	properties: {
		id: {
			type: "string"
		}
	},
	required: ["id"]
} as const;

export const updateUserSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema;

export const updateUserPasswordParamsSchema = {
	description: "Update user password params.",
	properties: {
		id: {
			type: "string"
		},
	},
	required: [
		"id",
	],
	type: "object"
} as const;

export const updateUserPasswordBodySchema = {
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
} as const;

export const updateUserPasswordSuccessReturnSchema = userWithoutPasswordSuccessReturnSchema;