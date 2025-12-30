import type { ErrorSchemasTypes, PaginatedResultType } from "@/types.js"
import type { Package } from "./domain/package.entity.js"
import type { FromSchema } from "json-schema-to-ts"
import schemas from "./adapters/inbound/package.schema.js"

// Generic types
type PackageIdType = Package["id"]
type PackageBaseType = Omit<Package, "id" | "createdAt" | "updatedAt">
type isDisabledType = Package["isDisabled"]

// Request params types
export type FindPackageByIdParamsType = { id: PackageIdType }
export type CreatePackageParamsType = { package: PackageBaseType }
export type UpdatePackageParamsType = { id: PackageIdType, package: PackageBaseType }
export type DeletePackageParamsType = { id: PackageIdType }
export type SetIsPackageDisabledParamsType = { id: PackageIdType, isDisabled: isDisabledType }

// Return types
export type FindAllPackagesReturnType = Promise<PaginatedResultType<Package>>
export type FindAllActivePackagesReturnType = Promise<PaginatedResultType<Package>>
export type FindPackageByIdReturnType = Promise<Package | undefined>
export type CreatePackageReturnType = Promise<Package>
export type UpdatePackageReturnType = Promise<Package>
export type DeletePackageReturnType = Promise<Package>
export type SetIsPackageDisabledReturnType = Promise<Package>

// Schemas types
export type FindAllPackagesReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findAllPackagesReturnSuccessSchema>
}

export type FindAllActivePackagesReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findAllActivePackagesReturnSuccessSchema>
}

export type FindPackageByIdReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.findPackageByIdReturnSuccessSchema>
}

export type CreatePackageReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.createPackageReturnSuccessSchema>
}

export type UpdatePackageReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.updatePackageReturnSuccessSchema>
}

export type DeletePackageReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.deletePackageReturnSuccessSchema>
}

export type SetIsPackageDisabledReplyType = ErrorSchemasTypes & {
  200: FromSchema<typeof schemas.setIsPackageDisabledReturnSuccessSchema>
}