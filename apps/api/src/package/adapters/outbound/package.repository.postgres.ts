/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { PackageRepositoryPort } from "@/package/domain/package.repository.ports.js"
import type { CreatePackageParamsType, CreatePackageReturnType, DeletePackageParamsType, DeletePackageReturnType, FindAllActivePackagesReturnType, FindAllPackagesReturnType, FindPackageByIdParamsType, FindPackageByIdReturnType, SetIsPackageDisabledParamsType, SetIsPackageDisabledReturnType, UpdatePackageParamsType, UpdatePackageReturnType } from "@/package/types.js"
import type { FastifyInstance } from "fastify"

export class PostgresPackageRepository implements PackageRepositoryPort {

	constructor( private fastify: FastifyInstance ) {}

	async findAllPackages(): Promise<FindAllPackagesReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findAllActivePackages(): Promise<FindAllActivePackagesReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findPackageById( data: FindPackageByIdParamsType ): Promise<FindPackageByIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async createPackage( data: CreatePackageParamsType ): Promise<CreatePackageReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updatePackage( data: UpdatePackageParamsType ): Promise<UpdatePackageReturnType> {
		throw new Error( "Method not implemented." )
	}

	async deletePackage( data: DeletePackageParamsType ): Promise<DeletePackageReturnType> {
		throw new Error( "Method not implemented." )
	}

	async setIsPackageDisabled( data: SetIsPackageDisabledParamsType ): Promise<SetIsPackageDisabledReturnType> {
		throw new Error( "Method not implemented." )
	}
}