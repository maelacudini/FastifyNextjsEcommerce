import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { UpdateUserFavoritesParamsType } from "@/user/types.js"

export class UpdateUserFavoritesUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserFavoritesParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id || !data.favorites ) {
			throw new Error( "Id and Favorites are required" )
		}
		const user = await this.userRepo.updateUserFavorites( data )

		return user
	}
}
