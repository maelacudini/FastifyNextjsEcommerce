import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { UpdateUserIsDisabledParamsType } from "@/domain/user/types.js"

export class UpdateUserIsDisabledUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserIsDisabledParamsType ) {
		if ( !data.id || typeof data.isDisabled !== "boolean" ) {
			throw new Error( "Id and IsDisabled are required" )
		}
		const user = await this.userRepo.updateUserIsDisabled( data )

		return user
	}
}
