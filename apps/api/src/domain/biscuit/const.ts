export const biscuitSelectFields = `
	id,
	name,
	base_price_minor AS "basePriceMinor",
	base_currency AS "baseCurrency",
	ingredients,
	description,
	nutritional_values AS "nutritionalValues",
	images,
	created_at::text AS "createdAt",
	updated_at::text AS "updatedAt",
	tags,
	is_disabled AS "isDisabled"
`
