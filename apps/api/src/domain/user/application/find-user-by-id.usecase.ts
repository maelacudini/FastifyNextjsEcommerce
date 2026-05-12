import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { FindUserByIdRequestType } from "@/domain/user/types.js"

export class FindUserByIdUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	// TODO: implement validation logic for user data, consider using a validation library based on the current setup
	async execute( data: FindUserByIdRequestType ) {
		return this.userRepo.findUserById( { id: data.id } )
	}
}