import type { ErrorSchemasTypes, PaginatedResultType } from "@/types.js"
import type { Biscuit } from "./domain/biscuit.entity.js"
import type { FromSchema } from "json-schema-to-ts"
import schemas from "./adapters/inbound/biscuit.schema.js"

// Generic types
export type BiscuitId = Biscuit["id"]

// Request params types
export type FindActiveBiscuitByIdParamsType = {
  id: BiscuitId
}
export type FindBiscuitByIdParamsType = {
  id: BiscuitId
}
export type CreateBiscuitParamsType = Pick<Biscuit, "name" | "price" | "ingredients" | "description" | "nutritionalValues" | "createdAt" | "images">
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
export type FindAllActiveBiscuitsReturnType = Promise<PaginatedResultType<Biscuit>>
export type FindActiveBiscuitByIdReturnType = Promise<Biscuit | undefined>
export type FindAllBiscuitsReturnType = Promise<PaginatedResultType<Biscuit>>
export type FindBiscuitByIdReturnType = Promise<Biscuit | undefined>
export type CreateBiscuitReturnType = Promise<Biscuit>
export type UpdateBiscuitReturnType = Promise<Biscuit>
export type DeleteBiscuitReturnType = Promise<Biscuit | undefined>
export type SetBiscuitDisabledReturnType = Promise<Biscuit>

// Schemas types
export type FindAllActiveBiscuitsReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findAllActiveBiscuitsSuccessReturnSchema>
};

export type FindActiveBiscuitByIdReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findActiveBiscuitByIdSuccessReturnSchema>
};

export type FindAllBiscuitsReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findAllBiscuitsSuccessReturnSchema>
};

export type FindBiscuitByIdReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findBiscuitByIdSuccessReturnSchema>
};

export type CreateBiscuitReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.createBiscuitSuccessReturnSchema>
};

export type UpdateBiscuitReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.updateBiscuitSuccessReturnSchema>
};

export type DeleteBiscuitReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.deleteBiscuitSuccessReturnSchema>
};

export type SetBiscuitDisabledReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.setBiscuitDisabledSuccessReturnSchema>
};