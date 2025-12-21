import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { UpdateUserParamsType } from "@/user/types.js"

export class UpdateUserUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id || !data.user ) {
			throw new Error( "Id and user data are required" )
		}
		const user = await this.userRepo.updateUser( data )

		return user
	}
}
