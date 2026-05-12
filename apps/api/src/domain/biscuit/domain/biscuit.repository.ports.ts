import type {
	CreateBiscuitParamsType,
	CreateBiscuitReturnType,
	DeleteBiscuitParamsType,
	DeleteBiscuitReturnType,
	DisableBiscuitParamsType,
	FindAllActiveBiscuitsParamsType,
	FindActiveBiscuitByIdParamsType,
	FindActiveBiscuitByIdReturnType,
	FindAllActiveBiscuitsReturnType,
	FindAllBiscuitsParamsType,
	FindAllBiscuitsReturnType,
	FindBiscuitByIdParamsType,
	FindBiscuitByIdReturnType,
	SetBiscuitDisabledReturnType,
	UpdateBiscuitParamsType,
	UpdateBiscuitReturnType
} from "../types.js"

export interface BiscuitRepositoryPort {
  findAllActiveBiscuits( data: FindAllActiveBiscuitsParamsType ): Promise<FindAllActiveBiscuitsReturnType>;
  findActiveBiscuitById( data: FindActiveBiscuitByIdParamsType ): Promise<FindActiveBiscuitByIdReturnType>;
  findAllBiscuits( data: FindAllBiscuitsParamsType ): Promise<FindAllBiscuitsReturnType>;
  findBiscuitById( data: FindBiscuitByIdParamsType ): Promise<FindBiscuitByIdReturnType>;
  createBiscuit( data: CreateBiscuitParamsType ): Promise<CreateBiscuitReturnType>;
  updateBiscuit( data: UpdateBiscuitParamsType ): Promise<UpdateBiscuitReturnType>;
  deleteBiscuit( data: DeleteBiscuitParamsType ): Promise<DeleteBiscuitReturnType>;
  setBiscuitDisabled( data: DisableBiscuitParamsType ): Promise<SetBiscuitDisabledReturnType>;
}
