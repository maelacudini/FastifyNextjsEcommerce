CREATE TABLE IF NOT EXISTS exchange_rates (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	base_currency TEXT NOT NULL,
	quote_currency TEXT NOT NULL,
	rate NUMERIC(18, 8) NOT NULL,
	fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	UNIQUE (base_currency, quote_currency),
	CHECK (rate > 0)
);

ALTER TABLE IF EXISTS biscuits
	ADD COLUMN IF NOT EXISTS base_price_minor INTEGER,
	ADD COLUMN IF NOT EXISTS base_currency TEXT;

UPDATE biscuits
SET
	base_price_minor = COALESCE(base_price_minor, 0),
	base_currency = COALESCE(base_currency, 'EUR')
WHERE base_price_minor IS NULL
	OR base_currency IS NULL;

DO $$
BEGIN
	IF EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_name = 'biscuits'
			AND column_name = 'price'
	) THEN
		UPDATE biscuits
		SET
			base_price_minor = COALESCE(
				base_price_minor,
				ROUND((NULLIF(TRIM(price), '')::numeric) * 100)::integer
			),
			base_currency = COALESCE(base_currency, 'EUR')
		WHERE price IS NOT NULL;
	END IF;
END $$;

ALTER TABLE IF EXISTS biscuits
	ALTER COLUMN base_price_minor SET NOT NULL,
	ALTER COLUMN base_currency SET NOT NULL;

DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'biscuits_base_price_minor_non_negative'
	) THEN
		ALTER TABLE biscuits
			ADD CONSTRAINT biscuits_base_price_minor_non_negative CHECK (base_price_minor >= 0);
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'biscuits_base_currency_supported'
	) THEN
		ALTER TABLE biscuits
			ADD CONSTRAINT biscuits_base_currency_supported CHECK (base_currency IN ('EUR', 'USD', 'GBP'));
	END IF;
END $$;

ALTER TABLE IF EXISTS orders
	ADD COLUMN IF NOT EXISTS currency TEXT,
	ADD COLUMN IF NOT EXISTS base_currency TEXT,
	ADD COLUMN IF NOT EXISTS subtotal_minor INTEGER,
	ADD COLUMN IF NOT EXISTS shipping_cost_minor INTEGER,
	ADD COLUMN IF NOT EXISTS total_minor INTEGER,
	ADD COLUMN IF NOT EXISTS discount_total_minor INTEGER,
	ADD COLUMN IF NOT EXISTS exchange_rate NUMERIC(18, 8),
	ADD COLUMN IF NOT EXISTS exchange_rate_captured_at TIMESTAMPTZ;

UPDATE orders
SET
	currency = COALESCE(currency, 'EUR'),
	base_currency = COALESCE(base_currency, 'EUR'),
	subtotal_minor = COALESCE(subtotal_minor, 0),
	shipping_cost_minor = COALESCE(shipping_cost_minor, 0),
	total_minor = COALESCE(total_minor, 0),
	discount_total_minor = COALESCE(discount_total_minor, 0)
WHERE currency IS NULL
	OR base_currency IS NULL
	OR subtotal_minor IS NULL
	OR shipping_cost_minor IS NULL
	OR total_minor IS NULL
	OR discount_total_minor IS NULL;

DO $$
BEGIN
	IF EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_name = 'orders'
			AND column_name = 'subtotal'
	) THEN
		UPDATE orders
		SET
			currency = COALESCE(currency, 'EUR'),
			base_currency = COALESCE(base_currency, 'EUR'),
			subtotal_minor = COALESCE(subtotal_minor, ROUND(COALESCE(subtotal, 0)::numeric * 100)::integer),
			shipping_cost_minor = COALESCE(shipping_cost_minor, ROUND(COALESCE(shipping_cost, 0)::numeric * 100)::integer),
			total_minor = COALESCE(total_minor, ROUND(COALESCE(total, 0)::numeric * 100)::integer),
			discount_total_minor = COALESCE(discount_total_minor, ROUND(COALESCE(discount_total, 0)::numeric * 100)::integer)
		WHERE subtotal IS NOT NULL OR shipping_cost IS NOT NULL OR total IS NOT NULL OR discount_total IS NOT NULL;
	END IF;
END $$;

DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'orders_currency_supported'
	) THEN
		ALTER TABLE orders
			ADD CONSTRAINT orders_currency_supported CHECK (currency IN ('EUR', 'USD', 'GBP'));
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'orders_base_currency_supported'
	) THEN
		ALTER TABLE orders
			ADD CONSTRAINT orders_base_currency_supported CHECK (base_currency IN ('EUR', 'USD', 'GBP'));
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'orders_subtotal_minor_non_negative'
	) THEN
		ALTER TABLE orders
			ADD CONSTRAINT orders_subtotal_minor_non_negative CHECK (subtotal_minor IS NULL OR subtotal_minor >= 0);
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'orders_shipping_cost_minor_non_negative'
	) THEN
		ALTER TABLE orders
			ADD CONSTRAINT orders_shipping_cost_minor_non_negative CHECK (shipping_cost_minor IS NULL OR shipping_cost_minor >= 0);
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'orders_total_minor_non_negative'
	) THEN
		ALTER TABLE orders
			ADD CONSTRAINT orders_total_minor_non_negative CHECK (total_minor IS NULL OR total_minor >= 0);
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'orders_discount_total_minor_non_negative'
	) THEN
		ALTER TABLE orders
			ADD CONSTRAINT orders_discount_total_minor_non_negative CHECK (discount_total_minor IS NULL OR discount_total_minor >= 0);
	END IF;

	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint
		WHERE conname = 'orders_exchange_rate_positive'
	) THEN
		ALTER TABLE orders
			ADD CONSTRAINT orders_exchange_rate_positive CHECK (exchange_rate IS NULL OR exchange_rate > 0);
	END IF;
END $$;
