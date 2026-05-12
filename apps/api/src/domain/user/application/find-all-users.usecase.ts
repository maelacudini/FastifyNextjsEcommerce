import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { FindAllUsersRequestType } from "@/domain/user/types.js"

export class FindAllUsersUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	// TODO: implement validation logic for user data, consider using a validation library based on the current setup
	async execute( data: FindAllUsersRequestType = {} ) {
		return this.userRepo.findAllUsers( data )
	}
}
