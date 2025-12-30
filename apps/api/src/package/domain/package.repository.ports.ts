import type { CreatePackageParamsType, CreatePackageReturnType, DeletePackageParamsType, DeletePackageReturnType, FindAllActivePackagesReturnType, FindAllPackagesReturnType, FindPackageByIdParamsType, FindPackageByIdReturnType, SetIsPackageDisabledParamsType, SetIsPackageDisabledReturnType, UpdatePackageParamsType, UpdatePackageReturnType } from "../types.js"

export interface PackageRepositoryPort {
	findAllPackages(): FindAllPackagesReturnType
	findAllActivePackages(): FindAllActivePackagesReturnType
	findPackageById( data: FindPackageByIdParamsType ): FindPackageByIdReturnType
	createPackage( data: CreatePackageParamsType ): CreatePackageReturnType
	updatePackage( data: UpdatePackageParamsType ): UpdatePackageReturnType
	deletePackage( data: DeletePackageParamsType ): DeletePackageReturnType
	setIsPackageDisabled( data: SetIsPackageDisabledParamsType ): SetIsPackageDisabledReturnType
}
