/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { FastifyInstance } from "fastify"
import type { BiscuitRepositoryPort } from "../../domain/biscuit.repository.ports.js"
import type { CreateBiscuitParamsType, CreateBiscuitReturnType, DeleteBiscuitParamsType, DeleteBiscuitReturnType, DisableBiscuitParamsType, FindActiveBiscuitByIdParamsType, FindActiveBiscuitByIdReturnType, FindAllActiveBiscuitsReturnType, FindAllBiscuitsReturnType, FindBiscuitByIdParamsType, FindBiscuitByIdReturnType, SetBiscuitDisabledReturnType, UpdateBiscuitParamsType, UpdateBiscuitReturnType } from "../../types.js"

export class MockBiscuitRepository implements BiscuitRepositoryPort {

	constructor( private fastify: FastifyInstance ) {}

	async findAllActiveBiscuits(): Promise<FindAllActiveBiscuitsReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findActiveBiscuitById( data: FindActiveBiscuitByIdParamsType ): Promise<FindActiveBiscuitByIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findAllBiscuits(): Promise<FindAllBiscuitsReturnType> {
		throw new Error( "Method not implemented." )
	}

	async findBiscuitById( data: FindBiscuitByIdParamsType ): Promise<FindBiscuitByIdReturnType> {
		throw new Error( "Method not implemented." )
	}

	async createBiscuit( data: CreateBiscuitParamsType ): Promise<CreateBiscuitReturnType> {
		throw new Error( "Method not implemented." )
	}

	async updateBiscuit( data: UpdateBiscuitParamsType ): Promise<UpdateBiscuitReturnType> {
		throw new Error( "Method not implemented." )
	}

	async deleteBiscuit( data: DeleteBiscuitParamsType ): Promise<DeleteBiscuitReturnType> {
		throw new Error( "Method not implemented." )
	}

	async setBiscuitDisabled( data: DisableBiscuitParamsType ): Promise<SetBiscuitDisabledReturnType> {
		throw new Error( "Method not implemented." )
	}
}
