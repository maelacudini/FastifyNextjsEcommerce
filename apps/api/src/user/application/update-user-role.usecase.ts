import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { UpdateUserRoleParamsType } from "@/user/types.js"

export class UpdateUserRoleUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserRoleParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id || !data.role ) {
			throw new Error( "Id and Role are required" )
		}
		const user = await this.userRepo.updateUserRole( data )

		return user
	}
}
