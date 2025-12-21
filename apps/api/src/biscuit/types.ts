import type { Biscuit } from "./domain/biscuit.entity.js"

export type BiscuitId = Biscuit["id"]
export type CreateBiscuitParams = Pick<Biscuit, "name" | "price" | "ingredients" | "description" | "nutritionalValues" | "createdAt" | "images">
export type UpdateBiscuitParams = {
  id: BiscuitId
  biscuit: Omit<Biscuit, "id" | "createdAt">
}
export type DisableBiscuitParams = {
  id: BiscuitId
  isDisabled: boolean
}
