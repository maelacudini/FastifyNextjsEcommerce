export const biscuitSelectFields = `
	id,
	name,
	price,
	ingredients,
	description,
	nutritional_values AS "nutritionalValues",
	images,
	created_at::text AS "createdAt",
	updated_at::text AS "updatedAt",
	tags,
	is_disabled AS "isDisabled"
`