import type { UserRepositoryPort } from "@/user/domain/user.repository.port.js";
import type { FindAllUsersReturnType } from "@/user/types.js";

export class FindAllUsersUseCase {
	constructor( private readonly userRepo: UserRepositoryPort ) {}

	async execute(): FindAllUsersReturnType {
		return this.userRepo.findAllUsers();
	}
}