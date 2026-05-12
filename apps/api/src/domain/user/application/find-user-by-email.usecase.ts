import type { UserRepositoryPort } from "@/domain/user/domain/user.repository.port.js"
import type { FindUserByEmailRequestType } from "@/domain/user/types.js"

export class FindUserByEmailUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: FindUserByEmailRequestType ) {
		return this.userRepo.findUserById( { id: data.email } )
	}
}