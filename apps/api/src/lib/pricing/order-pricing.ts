import { convertMoney } from "./money.js"
import type { PriceOrderInput, PriceOrderResult } from "./types.js"

export function priceOrder( input: PriceOrderInput ): PriceOrderResult {
	const pricedItems = input.items.map( ( item ) => {
		if ( !Number.isInteger( item.quantity ) || item.quantity <= 0 ) {
			throw new Error( "Order item quantity must be a positive integer" )
		}

		return {
			...item,
			lineTotalMinor: item.unitPriceMinor * item.quantity
		}
	} )

	const baseSubtotalMinor = pricedItems.reduce( ( total, item ) => total + item.lineTotalMinor, 0 )
	const shippingCostMinor = input.shippingCostMinor ?? 0
	const discountTotalMinor = input.discountTotalMinor ?? 0
	const baseTotalMinor = Math.max( 0, baseSubtotalMinor + shippingCostMinor - discountTotalMinor )

	if ( input.presentmentCurrency === input.baseCurrency ) {
		return {
			items: pricedItems,
			subtotalMinor: baseSubtotalMinor,
			shippingCostMinor,
			discountTotalMinor,
			totalMinor: baseTotalMinor,
			currency: input.baseCurrency,
			baseCurrency: input.baseCurrency
		}
	}

	if ( !input.exchangeRate ) {
		throw new Error( "Exchange rate is required when pricing in a non-base currency" )
	}

	const exchangeRate = input.exchangeRate

	return {
		items: pricedItems.map( ( item ) => ( {
			...item,
			lineTotalMinor: convertMoney(
				{ amountMinor: item.lineTotalMinor, currency: input.baseCurrency },
				input.presentmentCurrency,
				exchangeRate.rate
			).amountMinor
		} ) ),
		subtotalMinor: convertMoney(
			{ amountMinor: baseSubtotalMinor, currency: input.baseCurrency },
			input.presentmentCurrency,
			exchangeRate.rate
		).amountMinor,
		shippingCostMinor: convertMoney(
			{ amountMinor: shippingCostMinor, currency: input.baseCurrency },
			input.presentmentCurrency,
			exchangeRate.rate
		).amountMinor,
		discountTotalMinor: convertMoney(
			{ amountMinor: discountTotalMinor, currency: input.baseCurrency },
			input.presentmentCurrency,
			exchangeRate.rate
		).amountMinor,
		totalMinor: convertMoney(
			{ amountMinor: baseTotalMinor, currency: input.baseCurrency },
			input.presentmentCurrency,
			exchangeRate.rate
		).amountMinor,
		currency: input.presentmentCurrency,
		baseCurrency: input.baseCurrency,
		exchangeRate
	}
}
