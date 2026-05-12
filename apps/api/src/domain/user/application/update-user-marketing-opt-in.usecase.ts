import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { UpdateUserMarketingOptInParamsType } from "@/domain/user/types.js"

export class UpdateUserMarketingOptInUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: UpdateUserMarketingOptInParamsType ) {
		if ( !data.id || typeof data.marketingOptIn !== "boolean" ) {
			throw new Error( "Id and MarketingOptIn are required" )
		}
		const user = await this.userRepo.updateUserMarketingOptIn( data )

		return user
	}
}
