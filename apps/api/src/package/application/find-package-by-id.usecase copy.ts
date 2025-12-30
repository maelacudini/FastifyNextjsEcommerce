import type { PackageRepositoryPort } from "../domain/package.repository.ports.js"
import type { FindPackageByIdParamsType } from "../types.js"

export class FindPackageByIdUseCase {
	constructor( private readonly packageRepo: PackageRepositoryPort ) {}

	async execute( data: FindPackageByIdParamsType ) {
		if ( !data.id ) {
			throw new Error( "Id is required" )
		}

		return await this.packageRepo.findPackageById( data )
	}
}
