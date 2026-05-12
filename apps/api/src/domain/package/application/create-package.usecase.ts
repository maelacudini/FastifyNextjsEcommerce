import type { PackageRepositoryPort } from "../domain/package.repository.ports.js"
import type { CreatePackageParamsType } from "../types.js"

export class CreatePackageUseCase {
	constructor( private readonly packageRepo: PackageRepositoryPort ) {}

	async execute( data: CreatePackageParamsType ) {
		if ( !data ) {
			throw new Error( "Data is required" )
		}
		return await this.packageRepo.createPackage( data )
	}
}
