import type { PackageRepositoryPort } from "../domain/package.repository.ports.js"

export class FindAllPackagesUseCase {
	constructor( private readonly packageRepo: PackageRepositoryPort ) {}

	async execute( ) {
		return await this.packageRepo.findAllPackages( )
	}
}
