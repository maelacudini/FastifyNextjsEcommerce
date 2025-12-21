import type { Biscuit } from "@/biscuit/domain/biscuit.entity.js"
import type { BiscuitRepositoryPort } from "../../domain/buiscuit.repository.ports.js"
import type { BiscuitId, CreateBiscuitParams, DisableBiscuitParams, UpdateBiscuitParams } from "../../types.js"

const biscuits: Biscuit[] = []

export class MockBiscuitRepository implements BiscuitRepositoryPort {
	// PUBLIC (ONLY ACTIVE)
	async findAllActiveBiscuits() {
		return biscuits.filter( b => !b.isDisabled )
	}

	async findActiveBiscuitById( { id }: { id: BiscuitId } ) {
		return biscuits.find( b => b.id === id && !b.isDisabled )
	}

	// ADMIN (FULL ACCESS)
	async findAllBiscuits(): Promise<Biscuit[]> {
		return [...biscuits]
	}

	async findBiscuitById( { id }: { id: BiscuitId } ) {
		return biscuits.find( b => b.id === id )
	}

	async createBiscuit( data: CreateBiscuitParams ) {
		const biscuit: Biscuit = {
			...data,
			id: crypto.randomUUID(),
			updatedAt: data.createdAt,
			isDisabled: false,
		}

		biscuits.push( biscuit )
		return biscuit
	}

	async updateBiscuit( { id, biscuit }: UpdateBiscuitParams ) {
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

	async deleteBiscuit( { id }: { id: BiscuitId } ) {
		const index = biscuits.findIndex( b => b.id === id )
		if ( index === -1 ) {return undefined}

		const deleted = biscuits[index]
		biscuits.splice( index, 1 )

		return deleted
	}

	async setBiscuitDisabled( { id, isDisabled }: DisableBiscuitParams ) {
		const biscuit = biscuits.find( b => b.id === id )
		if ( !biscuit ) {throw new Error( "Biscuit not found" )}

		biscuit.isDisabled = isDisabled
		biscuit.updatedAt = new Date().toISOString()
		return biscuit
	}
}
