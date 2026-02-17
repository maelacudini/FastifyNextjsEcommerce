import { paginationMetaSchema } from "@/const.js"

const biscuitIdSchema = {
	description: "Biscuit ID schema.",
	type: "object",
	properties: {
		id: { type: "string" }
	},
	required: ["id"]
} as const

const nutritionalValuesSchema = {
	type: "object",
	properties: {
		energy: { type: "number" },
		carbohydrates: { type: "number" },
		sugarCarbohydrates: { type: "number" },
		fats: { type: "number" },
		saturatedFats: { type: "number" },
		protein: { type: "number" },
		salt: { type: "number" }
	},
	required: [
		"energy",
		"carbohydrates",
		"sugarCarbohydrates",
		"fats",
		"saturatedFats",
		"protein",
		"salt"
	]
} as const

const biscuitSchema = {
	description: "Biscuit entity schema.",
	properties: {
		createdAt: {
			type: "string"
		},
		description: {
			type: "string"
		},
		id: {
			type: "string"
		},
		images: {
			items: {
				type: "string"
			},
			type: "array"
		},
		ingredients: {
			type: "string"
		},
		isDisabled: {
			type: "boolean"
		},
		name: {
			type: "string"
		},
		nutritionalValues: {
			properties: {
				carbohydrates: {
					type: "number"
				},
				energy: {
					type: "number"
				},
				fats: {
					type: "number"
				},
				protein: {
					type: "number"
				},
				salt: {
					type: "number"
				},
				saturatedFats: {
					type: "number"
				},
				sugarCarbohydrates: {
					type: "number"
				}
			},
			required: [
				"carbohydrates",
				"energy",
				"fats",
				"protein",
				"salt",
				"saturatedFats",
				"sugarCarbohydrates"
			],
			type: "object"
		},
		price: {
			type: "string"
		},
		tags: {
			items: {
				type: "string"
			},
			type: "array"
		},
		updatedAt: {
			type: "string"
		}
	},
	required: [
		"createdAt",
		"description",
		"id",
		"images",
		"ingredients",
		"name",
		"nutritionalValues",
		"price"
	],
	type: "object"
} as const

export const findAllActiveBiscuitsSuccessReturnSchema = {
	description: "Find all active biscuits, these are the available ones to the clients.",
	type: "object",
	properties: {
		items: {
			type: "array",
			items: biscuitSchema,
		},
		...paginationMetaSchema.properties
	},
	required: [
		"items",
		...paginationMetaSchema.required
	]
} as const

const findActiveBiscuitByIdParamsSchema = biscuitIdSchema

const findActiveBiscuitByIdSuccessReturnSchema = biscuitSchema

const findAllBiscuitsSuccessReturnSchema = {
	description: "Find all biscuits.",
	type: "object",
	properties: {
		items: {
			type: "array",
			items: biscuitSchema,
		},
		...paginationMetaSchema.properties
	},
	required: [
		"items",
		...paginationMetaSchema.required
	]
} as const

const findBiscuitByIdParamsSchema = biscuitIdSchema

const findBiscuitByIdSuccessReturnSchema = biscuitSchema

const createBiscuitParamsSchema = {
	description: "Create biscuit payload schema.",
	properties: {
		createdAt: {
			type: "string"
		},
		description: {
			type: "string"
		},
		images: {
			items: {
				type: "string"
			},
			type: "array"
		},
		ingredients: {
			type: "string"
		},
		name: {
			type: "string"
		},
		nutritionalValues: {
			properties: {
				carbohydrates: {
					type: "number"
				},
				energy: {
					type: "number"
				},
				fats: {
					type: "number"
				},
				protein: {
					type: "number"
				},
				salt: {
					type: "number"
				},
				saturatedFats: {
					type: "number"
				},
				sugarCarbohydrates: {
					type: "number"
				}
			},
			required: [
				"carbohydrates",
				"energy",
				"fats",
				"protein",
				"salt",
				"saturatedFats",
				"sugarCarbohydrates"
			],
			type: "object"
		},
		price: {
			type: "string"
		}
	},
	required: [
		"createdAt",
		"description",
		"images",
		"ingredients",
		"name",
		"nutritionalValues",
		"price"
	],
	type: "object"
} as const

const createBiscuitSuccessReturnSchema = biscuitSchema

const updateBiscuitBodySchema = {
	description: "Update biscuit payload schema.",
	properties: {
		biscuit: {
			properties: {
				description: {
					type: "string"
				},
				images: {
					items: {
						type: "string"
					},
					type: "array"
				},
				ingredients: {
					type: "string"
				},
				isDisabled: {
					type: "boolean"
				},
				name: {
					type: "string"
				},
				nutritionalValues: {
					properties: {
						carbohydrates: {
							type: "number"
						},
						energy: {
							type: "number"
						},
						fats: {
							type: "number"
						},
						protein: {
							type: "number"
						},
						salt: {
							type: "number"
						},
						saturatedFats: {
							type: "number"
						},
						sugarCarbohydrates: {
							type: "number"
						}
					},
					required: [
						"carbohydrates",
						"energy",
						"fats",
						"protein",
						"salt",
						"saturatedFats",
						"sugarCarbohydrates"
					],
					type: "object"
				},
				price: {
					type: "string"
				},
				tags: {
					items: {
						type: "string"
					},
					type: "array"
				},
				updatedAt: {
					type: "string"
				}
			},
			required: [
				"description",
				"images",
				"ingredients",
				"name",
				"nutritionalValues",
				"price"
			],
			type: "object"
		},
	},
	required: [
		"biscuit",
	],
	type: "object"
} as const

const updateBiscuParamsSchema = biscuitIdSchema

const updateBiscuitSuccessReturnSchema = biscuitSchema

const deleteBiscuitParamsSchema = biscuitIdSchema

const deleteBiscuitSuccessReturnSchema = biscuitSchema

const setDisableBiscuitBodySchema = {
	description: "Disable biscuit payload schema.",
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

const setDisableBiscuitParamsSchema = biscuitIdSchema

const setBiscuitDisabledSuccessReturnSchema = biscuitSchema

export default {
	biscuitIdSchema,
	biscuitSchema,
	findAllActiveBiscuitsSuccessReturnSchema,
	createBiscuitParamsSchema,
	createBiscuitSuccessReturnSchema,
	setDisableBiscuitBodySchema,
	setDisableBiscuitParamsSchema,
	setBiscuitDisabledSuccessReturnSchema,
	nutritionalValuesSchema,
	updateBiscuitBodySchema,
	updateBiscuParamsSchema,
	updateBiscuitSuccessReturnSchema,
	findActiveBiscuitByIdParamsSchema,
	findActiveBiscuitByIdSuccessReturnSchema,
	findAllBiscuitsSuccessReturnSchema,
	findBiscuitByIdParamsSchema,
	findBiscuitByIdSuccessReturnSchema,
	deleteBiscuitParamsSchema,
	deleteBiscuitSuccessReturnSchema,
}