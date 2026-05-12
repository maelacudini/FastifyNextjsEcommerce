INSERT INTO users (
	id,
	email,
	role,
	is_disabled,
	first_name,
	last_name,
	marketing_opt_in
)
VALUES
	(
		'11111111-1111-1111-1111-111111111111',
		'admin@example.com',
		'admin',
		FALSE,
		'Admin',
		'User',
		TRUE
	),
	(
		'22222222-2222-2222-2222-222222222222',
		'customer@example.com',
		'customer',
		FALSE,
		'Sample',
		'Customer',
		TRUE
	)
ON CONFLICT (id) DO NOTHING;

INSERT INTO auth (
	id,
	user_id,
	provider,
	username,
	password_hash,
	refresh_token_version
)
VALUES
	(
		'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
		'11111111-1111-1111-1111-111111111111',
		'local',
		'admin',
		'$2b$10$m2/zR5fvMN5dDRevfOkk1.UWqxFwUJIDeNJHMflG6cN5aP8i66lue',
		0
	),
	(
		'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
		'22222222-2222-2222-2222-222222222222',
		'local',
		'customer',
		'$2b$10$m2/zR5fvMN5dDRevfOkk1.UWqxFwUJIDeNJHMflG6cN5aP8i66lue',
		0
	)
ON CONFLICT (id) DO NOTHING;

INSERT INTO biscuits (
	id,
	name,
	base_price_minor,
	base_currency,
	ingredients,
	description,
	nutritional_values,
	images,
	tags,
	is_disabled
)
VALUES
	(
		'30000000-0000-0000-0000-000000000001',
		'Butter Biscuit',
		390,
		'EUR',
		'Flour, butter, sugar, eggs',
		'Simple butter biscuit for local development.',
		'{"energy": 480, "carbohydrates": 66, "sugarCarbohydrates": 21, "fats": 20, "saturatedFats": 12, "protein": 6, "salt": 0.5}'::jsonb,
		ARRAY['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80'],
		ARRAY['classic', 'butter'],
		FALSE
	),
	(
		'30000000-0000-0000-0000-000000000002',
		'Cocoa Biscuit',
		450,
		'EUR',
		'Flour, cocoa, butter, sugar, eggs',
		'Chocolate-flavored biscuit for sample catalog data.',
		'{"energy": 505, "carbohydrates": 62, "sugarCarbohydrates": 24, "fats": 24, "saturatedFats": 14, "protein": 7, "salt": 0.4}'::jsonb,
		ARRAY['https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=800&q=80'],
		ARRAY['cocoa', 'sweet'],
		FALSE
	),
	(
		'30000000-0000-0000-0000-000000000003',
		'Almond Biscuit',
		520,
		'EUR',
		'Flour, almonds, butter, sugar, eggs',
		'Almond biscuit for sample catalog data.',
		'{"energy": 530, "carbohydrates": 55, "sugarCarbohydrates": 18, "fats": 29, "saturatedFats": 11, "protein": 9, "salt": 0.3}'::jsonb,
		ARRAY['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80'],
		ARRAY['almond', 'premium'],
		FALSE
	)
ON CONFLICT (id) DO NOTHING;

INSERT INTO exchange_rates (
	base_currency,
	quote_currency,
	rate
)
VALUES
	('EUR', 'USD', 1.08),
	('EUR', 'GBP', 0.85),
	('USD', 'EUR', 0.93),
	('GBP', 'EUR', 1.18)
ON CONFLICT (base_currency, quote_currency) DO UPDATE
SET
	rate = EXCLUDED.rate,
	fetched_at = NOW();
