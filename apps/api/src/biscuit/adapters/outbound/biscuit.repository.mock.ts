/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: IMPLEMENT ALL METHODS

import type { BiscuitRepositoryPort } from "../../domain/biscuit.repository.ports.js"
import type { CreateBiscuitParamsType, CreateBiscuitReturnType, DeleteBiscuitParamsType, DeleteBiscuitReturnType, DisableBiscuitParamsType, FindActiveBiscuitByIdParamsType, FindActiveBiscuitByIdReturnType, FindAllActiveBiscuitsReturnType, FindAllBiscuitsReturnType, FindBiscuitByIdParamsType, FindBiscuitByIdReturnType, SetBiscuitDisabledReturnType, UpdateBiscuitParamsType, UpdateBiscuitReturnType } from "../../types.js"

export class MockBiscuitRepository implements BiscuitRepositoryPort {

	async findAllActiveBiscuits(): FindAllActiveBiscuitsReturnType {
		throw new Error( "Method not implemented." )
	}

	async findActiveBiscuitById( data: FindActiveBiscuitByIdParamsType ): FindActiveBiscuitByIdReturnType {
		throw new Error( "Method not implemented." )
	}

	async findAllBiscuits(): FindAllBiscuitsReturnType {
		throw new Error( "Method not implemented." )
	}

	async findBiscuitById( data: FindBiscuitByIdParamsType ): FindBiscuitByIdReturnType {
		throw new Error( "Method not implemented." )
	}

	async createBiscuit( data: CreateBiscuitParamsType ): CreateBiscuitReturnType {
		throw new Error( "Method not implemented." )
	}

	async updateBiscuit( data: UpdateBiscuitParamsType ): UpdateBiscuitReturnType {
		throw new Error( "Method not implemented." )
	}

	async deleteBiscuit( data: DeleteBiscuitParamsType ): DeleteBiscuitReturnType {
		throw new Error( "Method not implemented." )
	}

	async setBiscuitDisabled( data: DisableBiscuitParamsType ): SetBiscuitDisabledReturnType {
		throw new Error( "Method not implemented." )
	}
}
