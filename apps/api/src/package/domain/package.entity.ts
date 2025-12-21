import type { Biscuit } from "@/biscuit/domain/biscuit.entity.js"

type PackageItem = {
  id: Biscuit["id"]
  quantity: number
}

export type Package = {
  id: string
  name: string
  description: string
  items: PackageItem[]
  createdAt: string
  images: string[]
  packagingPrice: number
  updatedAt?: string
  tags?: string[]
  weight?: number
  discountPercent?: number
}