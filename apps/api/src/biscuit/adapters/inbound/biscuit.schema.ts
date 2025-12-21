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
	type: "object",
	properties: {
		id: { type: "string" },
		name: { type: "string" },
		price: { type: "string" },
		ingredients: { type: "string" },
		description: { type: "string" },
		nutritionalValues: nutritionalValuesSchema,
		images: {
			type: "array",
			items: { type: "string" }
		},
		createdAt: { type: "string" },
		updatedAt: { type: "string", nullable: true },
		tags: {
			type: "array",
			items: { type: "string" },
			nullable: true
		},
		isDisabled: { type: "boolean", nullable: true }
	},
	required: [
		"id",
		"name",
		"price",
		"ingredients",
		"description",
		"nutritionalValues",
		"images",
		"createdAt"
	]
} as const

const createBiscuitSchema = {
	description: "Create biscuit payload schema.",
	type: "object",
	properties: {
		name: { type: "string" },
		price: { type: "string" },
		ingredients: { type: "string" },
		description: { type: "string" },
		nutritionalValues: nutritionalValuesSchema,
		createdAt: { type: "string" },
		images: {
			type: "array",
			items: { type: "string" }
		}
	},
	required: [
		"name",
		"price",
		"ingredients",
		"description",
		"nutritionalValues",
		"createdAt",
		"images"
	]
} as const

const updateBiscuitSchema = {
	description: "Update biscuit payload schema.",
	type: "object",
	properties: {
		id: { type: "string" },
		biscuit: {
			type: "object",
			properties: {
				name: { type: "string" },
				price: { type: "string" },
				ingredients: { type: "string" },
				description: { type: "string" },
				nutritionalValues: nutritionalValuesSchema,
				images: {
					type: "array",
					items: { type: "string" }
				},
				updatedAt: { type: "string", nullable: true },
				tags: {
					type: "array",
					items: { type: "string" },
					nullable: true
				},
				isDisabled: { type: "boolean", nullable: true }
			},
			required: [
				"name",
				"price",
				"ingredients",
				"description",
				"nutritionalValues",
				"images"
			]
		}
	},
	required: ["id", "biscuit"]
} as const

const disableBiscuitSchema = {
	description: "Disable biscuit payload schema.",
	type: "object",
	properties: {
		id: { type: "string" },
		isDisabled: { type: "boolean" }
	},
	required: ["id", "isDisabled"]
} as const

export default {
	biscuitIdSchema,
	biscuitSchema,
	createBiscuitSchema,
	disableBiscuitSchema,
	nutritionalValuesSchema,
	updateBiscuitSchema
}