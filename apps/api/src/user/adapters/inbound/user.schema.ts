export const findAllUsersSchema = {
	description: "Get all users.",
	tags: ["users"],
	response: {
		200: {
			description: "Successful response",
			type: "array",
			items: {
				type: "object",
				properties: {
					id: { type: "string" },
					name: { type: "string" },
					email: { type: "string" },
				},
				required: ["id", "name", "email"]
			}
		},
		401: {
			description: "Unauthorized",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		500: {
			description: "Server error",
			type: "object",
			properties: {
				message: { type: "string" },
			},
		},
		default: {
			description: "Unexpected error",
			type: "object",
			properties: {
				message: { type: "string" }
			}
		}
	}
} as const;