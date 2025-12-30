import type {
	CreateBiscuitParamsType,
	CreateBiscuitReturnType,
	DeleteBiscuitParamsType,
	DeleteBiscuitReturnType,
	DisableBiscuitParamsType,
	FindActiveBiscuitByIdParamsType,
	FindActiveBiscuitByIdReturnType,
	FindAllActiveBiscuitsReturnType,
	FindAllBiscuitsReturnType,
	FindBiscuitByIdParamsType,
	FindBiscuitByIdReturnType,
	SetBiscuitDisabledReturnType,
	UpdateBiscuitParamsType,
	UpdateBiscuitReturnType
} from "../types.js"

export interface BiscuitRepositoryPort {
  findAllActiveBiscuits(): FindAllActiveBiscuitsReturnType;
  findActiveBiscuitById( data: FindActiveBiscuitByIdParamsType ): FindActiveBiscuitByIdReturnType;
  findAllBiscuits(): FindAllBiscuitsReturnType;
  findBiscuitById( data: FindBiscuitByIdParamsType ): FindBiscuitByIdReturnType;
  createBiscuit( data: CreateBiscuitParamsType ): CreateBiscuitReturnType;
  updateBiscuit( data: UpdateBiscuitParamsType ): UpdateBiscuitReturnType;
  deleteBiscuit( data: DeleteBiscuitParamsType ): DeleteBiscuitReturnType;
  setBiscuitDisabled( data: DisableBiscuitParamsType ): SetBiscuitDisabledReturnType;
}
