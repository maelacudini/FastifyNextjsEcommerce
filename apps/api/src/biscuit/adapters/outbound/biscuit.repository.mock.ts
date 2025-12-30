import type { Biscuit } from "@/biscuit/domain/biscuit.entity.js"
import type { BiscuitRepositoryPort } from "../../domain/biscuit.repository.ports.js"
import type { CreateBiscuitParamsType, DeleteBiscuitParamsType, DisableBiscuitParamsType, FindActiveBiscuitByIdParamsType, FindBiscuitByIdParamsType, UpdateBiscuitParamsType } from "../../types.js"
import { paginationDefaultLimit } from "@/const.js"

const biscuits: Biscuit[] = []

export class MockBiscuitRepository implements BiscuitRepositoryPort {

	async findAllActiveBiscuits() {
		const activeBiscuits = biscuits.filter( b => !b.isDisabled )

		return {
			items: activeBiscuits,
			page: 1,
			limit: paginationDefaultLimit,
			total: activeBiscuits.length,
			totalPages: Math.round( paginationDefaultLimit / activeBiscuits.length )
		}
	}

	async findActiveBiscuitById( data: FindActiveBiscuitByIdParamsType ) {
		const { id } = data

		return biscuits.find( b => b.id === id && !b.isDisabled )
	}

	async findAllBiscuits() {
		return {
			items: biscuits,
			page: 1,
			limit: paginationDefaultLimit,
			total: biscuits.length,
			totalPages: Math.round( paginationDefaultLimit / biscuits.length )
		}
	}

	async findBiscuitById( data: FindBiscuitByIdParamsType ) {
		const { id } = data

		return biscuits.find( b => b.id === id )
	}

	async createBiscuit( data: CreateBiscuitParamsType ) {
		const biscuit: Biscuit = {
			...data,
			id: crypto.randomUUID(),
			updatedAt: data.createdAt,
			isDisabled: false,
		}

		biscuits.push( biscuit )
		return biscuit
	}

	async updateBiscuit( data: UpdateBiscuitParamsType ) {
		const { id, biscuit } = data

		const existingBiscuit = biscuits.find( b => b.id === id )
		if ( !existingBiscuit ) {throw new Error( "Biscuit not found" )}

		const updatedBiscuit: Biscuit = {
			...biscuit,
			id: existingBiscuit.id,
			createdAt: existingBiscuit.createdAt,
			updatedAt: new Date().toISOString()
		}

		return updatedBiscuit
	}

	async deleteBiscuit( data: DeleteBiscuitParamsType ) {
		const { id } = data

		const index = biscuits.findIndex( b => b.id === id )
		if ( index === -1 ) {return undefined}

		const deleted = biscuits[index]
		biscuits.splice( index, 1 )

		return deleted
	}

	async setBiscuitDisabled( { id, isDisabled }: DisableBiscuitParamsType ) {
		const biscuit = biscuits.find( b => b.id === id )
		if ( !biscuit ) {throw new Error( "Biscuit not found" )}

		biscuit.isDisabled = isDisabled
		biscuit.updatedAt = new Date().toISOString()
		return biscuit
	}
}
