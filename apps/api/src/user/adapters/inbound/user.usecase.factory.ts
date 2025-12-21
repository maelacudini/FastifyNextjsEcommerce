import { MockUserRepository } from "@/user/adapters/outbound/user.repository.mock.js"
import { FindUserByIdUseCase } from "@/user/application/find-user-by-id.usecase.js"
import { FindAllUsersUseCase } from "@/user/application/find-all-users.usecase.js"
import { CreateUserUseCase } from "@/user/application/create-user.usecase.js"
import { DeleteUserUseCase } from "@/user/application/delete-user.usecase.js"
import { FindUserByEmailUseCase } from "@/user/application/find-user-by-email.usecase.js"
import { UpdateUserUseCase } from "@/user/application/update-user.usecase.js"
import { UpdateUserPasswordUseCase } from "@/user/application/update-user-password.usecase.js"
import { UpdateUserIsVerifiedUseCase } from "@/user/application/update-user-is-verified.usecase.js"
import { UpdateUserIsDisabledUseCase } from "@/user/application/update-user-is-disabled.usecase.js"
import { UpdateUserRoleUseCase } from "@/user/application/update-user-role.usecase.js"
import { UpdateUserMarketingOptInUseCase } from "@/user/application/update-user-marketing-opt-in.usecase.js"
import { UpdateUserFavoritesUseCase } from "@/user/application/update-user-favorites.usecase.js"
import { UpdateUserCartUseCase } from "@/user/application/update-user-cart.usecase.js"

const userRepo = new MockUserRepository()
const findAllUsersUseCase = new FindAllUsersUseCase( userRepo )
const findUserByIdUseCase = new FindUserByIdUseCase( userRepo )
const findUserByEmailUseCase = new FindUserByEmailUseCase( userRepo )
const createUserUseCase = new CreateUserUseCase( userRepo )
const deleteUserUseCase = new DeleteUserUseCase( userRepo )
const updateUserUseCase = new UpdateUserUseCase( userRepo )
const updateUserPasswordUseCase = new UpdateUserPasswordUseCase( userRepo )
const updateUserIsVerifiedUseCase = new UpdateUserIsVerifiedUseCase( userRepo )
const updateUserIsDisabledUseCase = new UpdateUserIsDisabledUseCase( userRepo )
const updateUserRoleUseCase = new UpdateUserRoleUseCase( userRepo )
const updateUserMarketingOptInUseCase = new UpdateUserMarketingOptInUseCase( userRepo )
const updateUserFavoritesUseCase = new UpdateUserFavoritesUseCase( userRepo )
const updateUserCartUseCase = new UpdateUserCartUseCase( userRepo )

export default {
	findAllUsersUseCase,
	findUserByIdUseCase,
	findUserByEmailUseCase,
	createUserUseCase,
	deleteUserUseCase,
	updateUserUseCase,
	updateUserPasswordUseCase,
	updateUserIsVerifiedUseCase,
	updateUserIsDisabledUseCase,
	updateUserRoleUseCase,
	updateUserMarketingOptInUseCase,
	updateUserFavoritesUseCase,
	updateUserCartUseCase
}