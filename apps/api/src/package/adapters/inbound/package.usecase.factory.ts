import { FindAllPackagesUseCase } from "@/package/application/find-all-packages.usecase.js"
import { PostgresPackageRepository } from "../outbound/package.repository.postgres.js"
import { FindAllActivePackagesUseCase } from "@/package/application/find-all-active-packages.usecase.js"
import { FindPackageByIdUseCase } from "@/package/application/find-package-by-id.usecase copy.js"
import { CreatePackageUseCase } from "@/package/application/create-package.usecase.js"
import { UpdatePackageUseCase } from "@/package/application/update-package.usecase.js"
import { DeletePackageUseCase } from "@/package/application/delete-package.usecase.js"
import { SetIsPackageDisabledUseCase } from "@/package/application/set-is-package-disabled.usecase.js"
import type { FastifyInstance } from "fastify"

export default function createPackageUsecases( fastify: FastifyInstance ) {
	const packageRepo = new PostgresPackageRepository( fastify )

	const findAllPackagesUseCase = new FindAllPackagesUseCase( packageRepo )
	const findAllActivePackagesUseCase = new FindAllActivePackagesUseCase( packageRepo )
	const findPackageByIdUseCase = new FindPackageByIdUseCase( packageRepo )
	const createPackageUseCase = new CreatePackageUseCase( packageRepo )
	const updatePackageUseCase = new UpdatePackageUseCase( packageRepo )
	const deletePackageUseCase = new DeletePackageUseCase( packageRepo )
	const setIsPackageDisabledUseCase = new SetIsPackageDisabledUseCase( packageRepo )

	return {
		findAllPackagesUseCase,
		findAllActivePackagesUseCase,
		findPackageByIdUseCase,
		createPackageUseCase,
		updatePackageUseCase,
		deletePackageUseCase,
		setIsPackageDisabledUseCase
	}
}