import type { PaginatedResultType } from "@/types.js"
import type { Biscuit } from "./domain/biscuit.entity.js"

// Generic types
export type BiscuitId = Biscuit["id"]
export type BiscuitPaginationParamsType = {
	page?: number
}

// Request params types
export type FindAllActiveBiscuitsParamsType = BiscuitPaginationParamsType
export type FindActiveBiscuitByIdParamsType = {
  id: BiscuitId
}
export type FindAllBiscuitsParamsType = BiscuitPaginationParamsType
export type FindBiscuitByIdParamsType = {
  id: BiscuitId
}
export type CreateBiscuitParamsType = Pick<Biscuit, "name" | "price" | "ingredients" | "description" | "nutritionalValues" | "images">
export type UpdateBiscuitParamsType = {
  id: BiscuitId
  biscuit: Omit<Biscuit, "id" | "createdAt">
}
export type DeleteBiscuitParamsType = {
  id: BiscuitId
}
export type DisableBiscuitParamsType = {
  id: BiscuitId
  isDisabled: boolean
}

// Return types
export type FindAllActiveBiscuitsReturnType = PaginatedResultType<Biscuit>
export type FindActiveBiscuitByIdReturnType = Biscuit | undefined
export type FindAllBiscuitsReturnType = PaginatedResultType<Biscuit>
export type FindBiscuitByIdReturnType = Biscuit | undefined
export type CreateBiscuitReturnType = Biscuit
export type UpdateBiscuitReturnType = Biscuit
export type DeleteBiscuitReturnType = Biscuit | undefined
export type SetBiscuitDisabledReturnType = Biscuit
