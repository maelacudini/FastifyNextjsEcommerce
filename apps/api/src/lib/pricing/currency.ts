import type { CurrencyCode } from "./types.js"

export const supportedCurrencyCodes = ["EUR", "USD", "GBP"] as const

export const defaultStoreCurrency: CurrencyCode = "EUR"

const zeroDecimalCurrencies = new Set<CurrencyCode>( [] )

export function getMinorUnitFactor( currency: CurrencyCode ): number {
	return zeroDecimalCurrencies.has( currency ) ? 1 : 100
}
