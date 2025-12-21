import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { UpdateUserPasswordParamsType } from "@/user/types.js"

export class UpdateUserPasswordUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserPasswordParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id || !data.newPassword ) {
			throw new Error( "Id and new password are required" )
		}
		const user = await this.userRepo.updateUserPassword( data )

		return user
	}
}
