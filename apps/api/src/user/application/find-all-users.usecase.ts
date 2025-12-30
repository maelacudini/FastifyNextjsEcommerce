import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js"

export class FindAllUsersUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute() {
		return this.userRepo.findAllUsers()
	}
}