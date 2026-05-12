import type { Biscuit } from "@/domain/biscuit/domain/biscuit.entity.js"
import type { supportedCurrencyCodes } from "./currency.js"

export type CurrencyCode = typeof supportedCurrencyCodes[number]

export type ExchangeRate = {
  baseCurrency: CurrencyCode
  quoteCurrency: CurrencyCode
  rate: number
  fetchedAt: string
}

export type Money = {
	amountMinor: number
	currency: CurrencyCode
}

export type OrderPricingItemInput = {
	productId: Biscuit["id"]
	name: Biscuit["name"]
	quantity: number
	unitPriceMinor: number
}

export type PricedOrderItem = OrderPricingItemInput & {
	lineTotalMinor: number
}

export type PriceOrderInput = {
	items: OrderPricingItemInput[]
	baseCurrency: CurrencyCode
	presentmentCurrency: CurrencyCode
	shippingCostMinor?: number
	discountTotalMinor?: number
	exchangeRate?: ExchangeRate
}

export type PriceOrderResult = {
	items: PricedOrderItem[]
	subtotalMinor: number
	shippingCostMinor: number
	discountTotalMinor: number
	totalMinor: number
	currency: CurrencyCode
	baseCurrency: CurrencyCode
	exchangeRate?: ExchangeRate
}