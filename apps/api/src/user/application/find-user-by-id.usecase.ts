import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"
import type { FindUserByIdParamsType } from "@/user/types.js"

export class FindUserByIdUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute( data: FindUserByIdParamsType ) {
		return this.userRepo.findUserById( { id: data.id } )
	}
}