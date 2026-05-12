import { CreateBiscuitUseCase } from "@/domain/biscuit/application/create-biscuit.usecase.js"
import { PostgresBiscuitRepository } from "../outbound/biscuit.repository.postgres.js"
import { DeleteBiscuitUseCase } from "@/domain/biscuit/application/delete-biscuit.usecase.js"
import { UpdateBiscuitUseCase } from "@/domain/biscuit/application/update-biscuit.usecase.js"
import { FindActiveBiscuitsByIdUseCase } from "@/domain/biscuit/application/find-active-biscuits-by-id.usecase.js"
import { FindAllActiveBiscuitsUseCase } from "@/domain/biscuit/application/find-all-active-biscuits.usecase.js"
import { FindAllBiscuitsUseCase } from "@/domain/biscuit/application/find-all-biscuits.usecase.js"
import { FindBiscuitByIdUseCase } from "@/domain/biscuit/application/find-biscuit-by-id.usecase.js"
import { SetBiscuitDisabledUseCase } from "@/domain/biscuit/application/set-biscuit-disabled.usecase.js"
import type { FastifyInstance } from "fastify"

export default function createBiscuitUsecases( fastify: FastifyInstance ) {
	const biscuitRepo = new PostgresBiscuitRepository( fastify )

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