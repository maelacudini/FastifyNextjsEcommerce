import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { UpdateUserCartParamsType } from "@/domain/user/types.js"

export class UpdateUserCartUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserCartParamsType ) {
		if ( !data.id || !Array.isArray( data.cart ) ) {
			throw new Error( "Id and Cart are required" )
		}
		const user = await this.userRepo.updateUserCart( data )

		return user
	}
}
