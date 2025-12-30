import type { PackageRepositoryPort } from "../domain/package.repository.ports.js"
import type { SetIsPackageDisabledParamsType } from "../types.js"

export class SetIsPackageDisabledUseCase {
	constructor( private readonly packageRepo: PackageRepositoryPort ) {}

	async execute( data: SetIsPackageDisabledParamsType ) {
		if ( !data.id ) {
			throw new Error( "Id is required" )
		}

		return await this.packageRepo.setIsPackageDisabled( data )
	}
}
