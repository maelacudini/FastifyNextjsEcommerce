import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { UpdateUserMarketingOptInParamsType } from "@/user/types.js"

export class UpdateUserMarketingOptInUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserMarketingOptInParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.id || !data.marketingOptIn ) {
			throw new Error( "Id and MarketingOptIn are required" )
		}
		const user = await this.userRepo.updateUserMarketingOptIn( data )

		return user
	}
}
