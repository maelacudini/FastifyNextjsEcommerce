import type { PackageRepositoryPort } from "../domain/package.repository.ports.js"
import type { DeletePackageParamsType } from "../types.js"

export class DeletePackageUseCase {
	constructor( private readonly packageRepo: PackageRepositoryPort ) {}

	async execute( data: DeletePackageParamsType ) {
		if ( !data.id ) {
			throw new Error( "Id is required" )
		}
		return await this.packageRepo.deletePackage( data )
	}
}
