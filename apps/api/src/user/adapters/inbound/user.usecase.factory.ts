import { PostgresUserRepository } from "@/user/adapters/outbound/user.repository.postgres.js"
import { FindUserByIdUseCase } from "@/user/application/find-user-by-id.usecase.js"
import { FindAllUsersUseCase } from "@/user/application/find-all-users.usecase.js"
import { CreateUserUseCase } from "@/user/application/create-user.usecase.js"
import { DeleteUserUseCase } from "@/user/application/delete-user.usecase.js"
import { FindUserByEmailUseCase } from "@/user/application/find-user-by-email.usecase.js"
import { UpdateUserUseCase } from "@/user/application/update-user.usecase.js"
import { UpdateUserIsDisabledUseCase } from "@/user/application/update-user-is-disabled.usecase.js"
import { UpdateUserRoleUseCase } from "@/user/application/update-user-role.usecase.js"
import { UpdateUserMarketingOptInUseCase } from "@/user/application/update-user-marketing-opt-in.usecase.js"
import { UpdateUserFavoritesUseCase } from "@/user/application/update-user-favorites.usecase.js"
import { UpdateUserCartUseCase } from "@/user/application/update-user-cart.usecase.js"
import type { FastifyInstance } from "fastify"

export default function createUserUsecases( fastify: FastifyInstance ) {
	const userRepo = new PostgresUserRepository( fastify )

	const findAllUsersUseCase = new FindAllUsersUseCase( userRepo )
	const findUserByIdUseCase = new FindUserByIdUseCase( userRepo )
	const findUserByEmailUseCase = new FindUserByEmailUseCase( userRepo )
	const createUserUseCase = new CreateUserUseCase( userRepo )
	const deleteUserUseCase = new DeleteUserUseCase( userRepo )
	const updateUserUseCase = new UpdateUserUseCase( userRepo )
	const updateUserIsDisabledUseCase = new UpdateUserIsDisabledUseCase( userRepo )
	const updateUserRoleUseCase = new UpdateUserRoleUseCase( userRepo )
	const updateUserMarketingOptInUseCase = new UpdateUserMarketingOptInUseCase( userRepo )
	const updateUserFavoritesUseCase = new UpdateUserFavoritesUseCase( userRepo )
	const updateUserCartUseCase = new UpdateUserCartUseCase( userRepo )

	return {
		findAllUsersUseCase,
		findUserByIdUseCase,
		findUserByEmailUseCase,
		createUserUseCase,
		deleteUserUseCase,
		updateUserUseCase,
		updateUserIsDisabledUseCase,
		updateUserRoleUseCase,
		updateUserMarketingOptInUseCase,
		updateUserFavoritesUseCase,
		updateUserCartUseCase
	}
}