import type { CurrencyCode } from "@/lib/pricing/types.js"

export type Biscuit = {
  id: string
  name: string
  basePriceMinor: number
  baseCurrency: CurrencyCode
  ingredients: string
  description: string
  nutritionalValues: {
    energy: number
    carbohydrates: number
    sugarCarbohydrates: number
    fats: number
    saturatedFats: number
    protein: number
    salt: number
  }
  images: string[]
  createdAt: string
  updatedAt?: string
  tags?: string[]
  isDisabled?: boolean
};
