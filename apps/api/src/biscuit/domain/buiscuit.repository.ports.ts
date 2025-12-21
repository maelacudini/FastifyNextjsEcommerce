import type { BiscuitId, CreateBiscuitParams, DisableBiscuitParams, UpdateBiscuitParams } from "../types.js"
import type { Biscuit } from "./biscuit.entity.js"

export interface BiscuitRepositoryPort {
  findAllActiveBiscuits(): Promise<Biscuit[]>;
  findActiveBiscuitById( data: { id: BiscuitId } ): Promise<Biscuit | undefined>;
  findAllBiscuits(): Promise<Biscuit[]>;
  findBiscuitById( data: { id: BiscuitId } ): Promise<Biscuit | undefined>;
  createBiscuit( data: CreateBiscuitParams ): Promise<Biscuit>;
  updateBiscuit( data: UpdateBiscuitParams ): Promise<Biscuit>;
  deleteBiscuit( data: { id: BiscuitId } ): Promise<Biscuit | undefined>;
  setBiscuitDisabled( data: DisableBiscuitParams ): Promise<Biscuit>;
}
