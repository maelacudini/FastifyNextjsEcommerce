import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { UpdateUserCartParamsType } from "@/user/types.js"

export class UpdateUserCartUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserCartParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id || !data.cart ) {
			throw new Error( "Id and Cart are required" )
		}
		const user = await this.userRepo.updateUserCart( data )

		return user
	}
}
