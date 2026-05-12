import type { CreatePackageParamsType, CreatePackageReturnType, DeletePackageParamsType, DeletePackageReturnType, FindAllActivePackagesReturnType, FindAllPackagesReturnType, FindPackageByIdParamsType, FindPackageByIdReturnType, SetIsPackageDisabledParamsType, SetIsPackageDisabledReturnType, UpdatePackageParamsType, UpdatePackageReturnType } from "../types.js"

export interface PackageRepositoryPort {
	findAllPackages(): Promise<FindAllPackagesReturnType>
	findAllActivePackages(): Promise<FindAllActivePackagesReturnType>
	findPackageById( data: FindPackageByIdParamsType ): Promise<FindPackageByIdReturnType>
	createPackage( data: CreatePackageParamsType ): Promise<CreatePackageReturnType>
	updatePackage( data: UpdatePackageParamsType ): Promise<UpdatePackageReturnType>
	deletePackage( data: DeletePackageParamsType ): Promise<DeletePackageReturnType>
	setIsPackageDisabled( data: SetIsPackageDisabledParamsType ): Promise<SetIsPackageDisabledReturnType>
}
