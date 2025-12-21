// Common schemas
export const notFoundSchema = {
	description: "No resource found.",
	type: "object",
	properties: {
		error: { type: "string" },
	},
	required: ["error"],
} as const

export const unauthorizedSchema = {
	description: "Unauthorized.",
	type: "object",
	properties: {
		message: { type: "string" },
	},
	required: ["message"],
} as const

export const serverErrorSchema = {
	description: "Server error.",
	type: "object",
	properties: {
		message: { type: "string" },
	},
	required: ["message"],
} as const

export const errorSchemas = {
	404: notFoundSchema,
	401: unauthorizedSchema,
	500: serverErrorSchema,
}