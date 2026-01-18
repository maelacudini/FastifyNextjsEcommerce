import { CreateBiscuitUseCase } from "@/biscuit/application/create-biscuit.usecase.js"
import { MockBiscuitRepository } from "../outbound/biscuit.repository.mock.js"
import { DeleteBiscuitUseCase } from "@/biscuit/application/delete-biscuit.usecase.js"
import { UpdateBiscuitUseCase } from "@/biscuit/application/update-biscuit.usecase.js"
import { FindActiveBiscuitsByIdUseCase } from "@/biscuit/application/find-active-biscuits-by-id.usecase.js"
import { FindAllActiveBiscuitsUseCase } from "@/biscuit/application/find-all-active-biscuits.usecase.js"
import { FindAllBiscuitsUseCase } from "@/biscuit/application/find-all-biscuits.usecase.js"
import { FindBiscuitByIdUseCase } from "@/biscuit/application/find-biscuit-by-id.usecase.js"
import { SetBiscuitDisabledUseCase } from "@/biscuit/application/set-biscuit-disabled.usecase.js"
import type { FastifyInstance } from "fastify"

export default function createBiscuitUsecases( fastify: FastifyInstance ) {
	const biscuitRepo = new MockBiscuitRepository( fastify )

	const createBiscuit = new CreateBiscuitUseCase( biscuitRepo )
	const deleteBiscuit = new DeleteBiscuitUseCase( biscuitRepo )
	const updateBiscuit = new UpdateBiscuitUseCase( biscuitRepo )
	const findActiveBiscuitsById = new FindActiveBiscuitsByIdUseCase( biscuitRepo )
	const findAllActiveBiscuits = new FindAllActiveBiscuitsUseCase( biscuitRepo )
	const findAllBiscuits = new FindAllBiscuitsUseCase( biscuitRepo )
	const findBiscuitById = new FindBiscuitByIdUseCase( biscuitRepo )
	const setBiscuitDisabled = new SetBiscuitDisabledUseCase( biscuitRepo )

	return {
		createBiscuit,
		deleteBiscuit,
		updateBiscuit,
		findActiveBiscuitsById,
		findAllActiveBiscuits,
		findAllBiscuits,
		findBiscuitById,
		setBiscuitDisabled
	}
}