import { getMinorUnitFactor } from "./currency.js"
import type { CurrencyCode, Money } from "./types.js"

export function assertMinorAmount( amountMinor: number ): number {
	if ( !Number.isInteger( amountMinor ) ) {
		throw new Error( "Money amounts must be stored as integer minor units" )
	}

	return amountMinor
}

export function decimalToMinorUnits( amount: number, currency: CurrencyCode ): number {
	const factor = getMinorUnitFactor( currency )
	return assertMinorAmount( Math.round( amount * factor ) )
}

export function convertMoney( money: Money, targetCurrency: CurrencyCode, rate: number ): Money {
	if ( rate <= 0 ) {
		throw new Error( "Exchange rate must be greater than zero" )
	}

	const convertedAmountMinor = decimalToMinorUnits( money.amountMinor / getMinorUnitFactor( money.currency ) * rate, targetCurrency )

	return {
		amountMinor: convertedAmountMinor,
		currency: targetCurrency
	}
}
