import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { UpdateUserParamsType } from "@/domain/user/types.js"

export class UpdateUserUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserParamsType ) {
		if ( !data.id || !data.user || Object.keys( data.user ).length === 0 ) {
			throw new Error( "Id and user data are required" )
		}
		const user = await this.userRepo.updateUser( data )

		return user
	}
}
