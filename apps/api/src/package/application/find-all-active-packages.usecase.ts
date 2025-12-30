import type { PackageRepositoryPort } from "../domain/package.repository.ports.js"

export class FindAllActivePackagesUseCase {
	constructor( private readonly packageRepo: PackageRepositoryPort ) {}

	async execute( ) {
		return await this.packageRepo.findAllActivePackages( )
	}
}
