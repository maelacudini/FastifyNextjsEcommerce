import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { CreateUserParamsType } from "@/user/types.js"


export class CreateUserUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: CreateUserParamsType ) {
		// Basic validation (could later move to a validator)
		if ( !data.email || !data.password ) {
			throw new Error( "Name and email are required" )
		}
		const user = await this.userRepo.createUser( data )

		return user
	}
}
