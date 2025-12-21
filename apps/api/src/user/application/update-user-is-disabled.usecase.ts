import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { UpdateUserIsDisabledParamsType } from "@/user/types.js"

export class UpdateUserIsDisabledUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserIsDisabledParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id || !data.isDisabled ) {
			throw new Error( "Id and IsDisabled are required" )
		}
		const user = await this.userRepo.updateUserIsDisabled( data )

		return user
	}
}
