/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { PackageRepositoryPort } from "@/package/domain/package.repository.ports.js"
import type { CreatePackageParamsType, CreatePackageReturnType, DeletePackageParamsType, DeletePackageReturnType, FindAllActivePackagesReturnType, FindAllPackagesReturnType, FindPackageByIdParamsType, FindPackageByIdReturnType, SetIsPackageDisabledParamsType, SetIsPackageDisabledReturnType, UpdatePackageParamsType, UpdatePackageReturnType } from "@/package/types.js"

export class MockPackageRepository implements PackageRepositoryPort {

	async findAllPackages(): FindAllPackagesReturnType {
		throw new Error( "Method not implemented." )
	}

	async findAllActivePackages(): FindAllActivePackagesReturnType {
		throw new Error( "Method not implemented." )
	}

	async findPackageById( data: FindPackageByIdParamsType ): FindPackageByIdReturnType {
		throw new Error( "Method not implemented." )
	}

	async createPackage( data: CreatePackageParamsType ): CreatePackageReturnType {
		throw new Error( "Method not implemented." )
	}

	async updatePackage( data: UpdatePackageParamsType ): UpdatePackageReturnType {
		throw new Error( "Method not implemented." )
	}

	async deletePackage( data: DeletePackageParamsType ): DeletePackageReturnType {
		throw new Error( "Method not implemented." )
	}

	async setIsPackageDisabled( data: SetIsPackageDisabledParamsType ): SetIsPackageDisabledReturnType {
		throw new Error( "Method not implemented." )
	}
}