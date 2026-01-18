import type { PaginatedResultType } from "@/types.js"
import type { Package } from "./domain/package.entity.js"

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
export type FindAllPackagesReturnType = PaginatedResultType<Package>
export type FindAllActivePackagesReturnType = PaginatedResultType<Package>
export type FindPackageByIdReturnType = Package | undefined
export type CreatePackageReturnType = Package
export type UpdatePackageReturnType = Package
export type DeletePackageReturnType = Package
export type SetIsPackageDisabledReturnType = Package