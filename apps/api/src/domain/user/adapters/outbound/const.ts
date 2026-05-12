export const userSelectFields = `
	id,
	email,
	role,
	is_disabled AS "isDisabled",
	created_at AS "createdAt",
	updated_at AS "updatedAt",
	address,
	phone,
	first_name AS "firstName",
	last_name AS "lastName",
	favorites,
	cart,
	marketing_opt_in AS "marketingOptIn"
`