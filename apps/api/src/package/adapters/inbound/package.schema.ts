const packageIdSchema = {
	description: "Package id schema.",
	type: "object",
	properties: {
		id: {
			type: "string"
		}
	},
	required: ["id"]
} as const

const packageItemSchema = {
	properties: {
		id: {
			type: "string"
		},
		quantity: {
			type: "number"
		}
	},
	required: [
		"id",
		"quantity"
	],
	type: "object"
} as const

const packageBaseSchema = {
	properties: {
		description: {
			type: "string"
		},
		discountPercent: {
			type: "number"
		},
		images: {
			items: {
				type: "string"
			},
			type: "array"
		},
		isDisabled: {
			type: "boolean"
		},
		items: {
			items: packageItemSchema,
			type: "array"
		},
		name: {
			type: "string"
		},
		packagingPrice: {
			type: "number"
		},
		tags: {
			items: {
				type: "string"
			},
			type: "array"
		},
		weight: {
			type: "number"
		}
	},
	required: [
		"description",
		"images",
		"isDisabled",
		"items",
		"name",
		"packagingPrice"
	],
	type: "object"
} as const

const packageSchema = {
	properties: {
		createdAt: {
			type: "string"
		},
		description: {
			type: "string"
		},
		discountPercent: {
			type: "number"
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
		isDisabled: {
			type: "boolean"
		},
		items: {
			items: packageItemSchema,
			type: "array"
		},
		name: {
			type: "string"
		},
		packagingPrice: {
			type: "number"
		},
		tags: {
			items: {
				type: "string"
			},
			type: "array"
		},
		updatedAt: {
			type: "string"
		},
		weight: {
			type: "number"
		}
	},
	required: [
		"createdAt",
		"description",
		"id",
		"images",
		"isDisabled",
		"items",
		"name",
		"packagingPrice"
	],
	type: "object"
} as const

const paginatedPackageSchema = {
	properties: {
		items: {
			items: packageSchema,
			type: "array"
		},
		limit: {
			type: "number"
		},
		page: {
			type: "number"
		},
		total: {
			type: "number"
		},
		totalPages: {
			type: "number"
		}
	},
	required: [
		"items",
		"limit",
		"page",
		"total",
		"totalPages"
	],
	type: "object"
} as const

const findAllPackagesReturnSuccessSchema = paginatedPackageSchema

const findAllActivePackagesReturnSuccessSchema = paginatedPackageSchema

const findPackageByIdParamsSchema = packageIdSchema
const findPackageByIdReturnSuccessSchema = packageSchema

const createPackageBodySchema = packageBaseSchema
const createPackageReturnSuccessSchema = packageSchema

const updatePackageParamsSchema = {
	  properties: {
		id: {
			type: "string"
		},
		package: packageBaseSchema
	},
	required: [
		"id",
		"package"
	],
	type: "object"
} as const

const updatePackageBodySchema = {
	description: "Update package body schema.",
	type: "object",
	properties: {
		package: packageBaseSchema
	},
	required: ["package"]
} as const

const updatePackageReturnSuccessSchema = packageSchema

const deletePackageParamsSchema = packageIdSchema
const deletePackageReturnSuccessSchema = packageSchema

const setIsPackageDisabledParamsSchema = packageIdSchema

const setIsPackageDisabledBodySchema =  {
	description: "Set is package disabled body schema.",
	type: "object",
	properties: {
		isDisabled: {
			type: "boolean"
		}
	},
	required: ["isDisabled"]
} as const

const setIsPackageDisabledReturnSuccessSchema = packageSchema

export default {
	findAllPackagesReturnSuccessSchema,
	findAllActivePackagesReturnSuccessSchema,
	findPackageByIdParamsSchema,
	findPackageByIdReturnSuccessSchema,
	createPackageBodySchema,
	createPackageReturnSuccessSchema,
	updatePackageParamsSchema,
	updatePackageBodySchema,
	updatePackageReturnSuccessSchema,
	deletePackageParamsSchema,
	deletePackageReturnSuccessSchema,
	setIsPackageDisabledParamsSchema,
	setIsPackageDisabledBodySchema,
	setIsPackageDisabledReturnSuccessSchema
}