import type { PackageRepositoryPort } from "../domain/package.repository.ports.js"
import type { UpdatePackageParamsType } from "../types.js"

export class UpdatePackageUseCase {
	constructor( private readonly packageRepo: PackageRepositoryPort ) {}

	async execute( data: UpdatePackageParamsType ) {
		if ( !data ) {
			throw new Error( "Id is required" )
		}

		return await this.packageRepo.updatePackage( data )
	}
}
