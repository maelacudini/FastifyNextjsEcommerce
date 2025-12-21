import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { UpdateUserIsVerifiedParamsType } from "@/user/types.js"

export class UpdateUserIsVerifiedUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserIsVerifiedParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id || !data.isVerified ) {
			throw new Error( "Id and IsVerified are required" )
		}
		const user = await this.userRepo.updateUserIsVerified( data )

		return user
	}
}
