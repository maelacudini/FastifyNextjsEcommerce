import { FindAllPackagesUseCase } from "@/package/application/find-all-packages.usecase.js"
import { MockPackageRepository } from "../outbound/package.repository.mock.js"
import { FindAllActivePackagesUseCase } from "@/package/application/find-all-active-packages.usecase.js"
import { FindPackageByIdUseCase } from "@/package/application/find-package-by-id.usecase copy.js"
import { CreatePackageUseCase } from "@/package/application/create-package.usecase.js"
import { UpdatePackageUseCase } from "@/package/application/update-package.usecase.js"
import { DeletePackageUseCase } from "@/package/application/delete-package.usecase.js"
import { SetIsPackageDisabledUseCase } from "@/package/application/set-is-package-disabled.usecase.js"

const packageRepo = new MockPackageRepository()

const findAllPackagesUseCase = new FindAllPackagesUseCase( packageRepo )
const findAllActivePackagesUseCase = new FindAllActivePackagesUseCase( packageRepo )
const findPackageByIdUseCase = new FindPackageByIdUseCase( packageRepo )
const createPackageUseCase = new CreatePackageUseCase( packageRepo )
const updatePackageUseCase = new UpdatePackageUseCase( packageRepo )
const deletePackageUseCase = new DeletePackageUseCase( packageRepo )
const setIsPackageDisabledUseCase = new SetIsPackageDisabledUseCase( packageRepo )

export default {
	findAllPackagesUseCase,
	findAllActivePackagesUseCase,
	findPackageByIdUseCase,
	createPackageUseCase,
	updatePackageUseCase,
	deletePackageUseCase,
	setIsPackageDisabledUseCase
}