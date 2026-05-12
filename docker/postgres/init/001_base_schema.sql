CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	email TEXT NOT NULL UNIQUE,
	role TEXT NOT NULL DEFAULT 'customer',
	is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ,
	address JSONB,
	phone TEXT,
	first_name TEXT,
	last_name TEXT,
	favorites TEXT[] NOT NULL DEFAULT '{}',
	cart TEXT[] NOT NULL DEFAULT '{}',
	marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
	CHECK (role IN ('admin', 'customer'))
);

CREATE TABLE IF NOT EXISTS auth (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
	provider TEXT NOT NULL,
	refresh_token_version INTEGER NOT NULL DEFAULT 0,
	username TEXT UNIQUE,
	password_hash TEXT,
	email_verified_at TIMESTAMPTZ,
	last_login_at TIMESTAMPTZ,
	last_password_change_at TIMESTAMPTZ,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CHECK (provider IN ('local', 'google'))
);

CREATE TABLE IF NOT EXISTS biscuits (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name TEXT NOT NULL,
	base_price_minor INTEGER NOT NULL,
	base_currency TEXT NOT NULL,
	ingredients TEXT NOT NULL,
	description TEXT NOT NULL,
	nutritional_values JSONB NOT NULL,
	images TEXT[] NOT NULL DEFAULT '{}',
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ,
	tags TEXT[],
	is_disabled BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS packages (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	items JSONB NOT NULL DEFAULT '[]'::jsonb,
	images TEXT[] NOT NULL DEFAULT '{}',
	packaging_price NUMERIC(10, 2) NOT NULL DEFAULT 0,
	weight NUMERIC(10, 2),
	discount_percent NUMERIC(5, 2),
	is_disabled BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ,
	tags TEXT[]
);

CREATE TABLE IF NOT EXISTS orders (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID REFERENCES users(id) ON DELETE SET NULL,
	items JSONB NOT NULL DEFAULT '[]'::jsonb,
	currency TEXT,
	base_currency TEXT,
	subtotal_minor INTEGER,
	shipping_cost_minor INTEGER,
	total_minor INTEGER,
	discount_total_minor INTEGER,
	exchange_rate NUMERIC(18, 8),
	exchange_rate_captured_at TIMESTAMPTZ,
	shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
	payment_status TEXT NOT NULL DEFAULT 'pending',
	fulfillment_status TEXT NOT NULL DEFAULT 'unfulfilled',
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ,
	CHECK (payment_status IN ('pending', 'paid', 'failed')),
	CHECK (fulfillment_status IN ('unfulfilled', 'processing', 'shipped', 'delivered', 'cancelled'))
);
