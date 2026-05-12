import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { UpdateUserFavoritesParamsType } from "@/domain/user/types.js"

export class UpdateUserFavoritesUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserFavoritesParamsType ) {
		if ( !data.id || !Array.isArray( data.favorites ) ) {
			throw new Error( "Id and Favorites are required" )
		}
		const user = await this.userRepo.updateUserFavorites( data )

		return user
	}
}
