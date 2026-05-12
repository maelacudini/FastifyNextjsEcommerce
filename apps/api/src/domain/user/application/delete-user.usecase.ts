import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { DeleteUserRequestType } from "@/domain/user/types.js"

export class DeleteUserUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: DeleteUserRequestType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id ) {
			throw new Error( "ID is required" )
		}
		const user = await this.userRepo.deleteUser( { id: data.id } )

		return user
	}
}
