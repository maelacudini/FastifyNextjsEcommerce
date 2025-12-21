import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { FindUserByEmailParamsType } from "@/user/types.js"


export class FindUserByEmailUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: FindUserByEmailParamsType ) {
		return this.userRepo.findUserById( { id: data.email } )
	}
}