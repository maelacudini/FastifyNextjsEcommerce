import schemas from "./package.schema.js"
import type { FastifyInstance } from "fastify"
import type { FromSchema } from "json-schema-to-ts"
import usecasesFactory from "./package.usecase.factory.js"
import type {
	FindAllPackagesReplyType,
	FindAllActivePackagesReplyType,
	DeletePackageReplyType,
	FindPackageByIdReplyType,
	SetIsPackageDisabledReplyType,
	CreatePackageReplyType,
	UpdatePackageReplyType
} from "@/package/types.js"
import { errorSchemas } from "@/const.js"

export async function packageController( app: FastifyInstance ) {
	// PUBLIC - FIND ALL PACKAGES
	app.get<{ Reply: FindAllPackagesReplyType }>( "/package", { schema: {
		tags: ["Package"],
		response: {
			200: schemas.findAllPackagesReturnSuccessSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllPackagesUseCase.execute()

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - FIND ALL ACTIVE PACKAGES
	app.get<{ Reply: FindAllActivePackagesReplyType }>( "/package/active", { schema: {
		tags: ["Package"],
		response: {
			200: schemas.findAllActivePackagesReturnSuccessSchema,
			...errorSchemas
		}
	} }, async ( req, reply ) => {
		const data = await usecasesFactory.findAllActivePackagesUseCase.execute()

		return reply.code( 200 ).send( data )
	} )

	// PUBLIC - FIND PACKAGE BY ID
	app.get<{
        Params: FromSchema<typeof schemas.findPackageByIdParamsSchema>,
        Reply: FindPackageByIdReplyType
    }>( "/package/:id", { schema: {
    	tags: ["Package"],
    	params: schemas.findPackageByIdParamsSchema,
    	response: {
    		200: schemas.findPackageByIdReturnSuccessSchema,
    		...errorSchemas
    	}
    } }, async ( req, reply ) => {
    	const data = req.params

    	const pkg = await usecasesFactory.findPackageByIdUseCase.execute( data )

    	if ( !pkg ) {
    		return reply.code( 404 ).send( { error: "Package not found" } )
    	}

    	return reply.code( 200 ).send( pkg )
    } )

	// PRIVATE - CREATE PACKAGE
	app.post<{
	      Body: FromSchema<typeof schemas.createPackageBodySchema>,
	      Reply: CreatePackageReplyType
	  }>( "/package", { schema: {
	  	tags: ["Package"],
	  	body: schemas.createPackageBodySchema,
	  	response: {
	  		200: schemas.createPackageReturnSuccessSchema,
	  		...errorSchemas
	  	}
	  } }, async ( req, reply ) => {
	  	const data = req.body

	  	try {
	  		const newPackage = await usecasesFactory.createPackageUseCase.execute( { package: data } )

	  		return reply.code( 200 ).send( newPackage )
	  	} catch ( err: unknown ) {
	  		const errorMessage = err instanceof Error ? err.message : "Unknown error"

	  		return reply.code( 500 ).send( { message: errorMessage } )
	  	}
	  } )

	// PRIVATE - UPDATE PACKAGE
	app.put<{
	      Params: FromSchema<typeof schemas.updatePackageParamsSchema>,
	      Body: FromSchema<typeof schemas.updatePackageBodySchema>,
	      Reply: UpdatePackageReplyType
	  }>( "/package/:id",{ schema: {
	  	tags: ["Package"],
	  	params: schemas.updatePackageParamsSchema,
	  	body: schemas.updatePackageBodySchema,
	  	response: {
	  		200: schemas.updatePackageReturnSuccessSchema,
	  		...errorSchemas
	  	}
	  } }, async ( req, reply ) => {
	  	const { id } = req.params
	  	const pkg = req.body

	  	try {
	  		const updated = await usecasesFactory.updatePackageUseCase.execute( { id, package: pkg.package } )

	  		return reply.code( 200 ).send( updated )
	  	} catch ( err: unknown ) {
	  		const errorMessage = err instanceof Error ? err.message : "Unknown error"

	  		return reply.code( 500 ).send( { message: errorMessage } )
	  	}
	  } )

	// PRIVATE - DELETE PACKAGE
	app.delete<{
        Params: FromSchema<typeof schemas.deletePackageParamsSchema>,
        Reply: DeletePackageReplyType
    }>( "/package/:id", { schema: {
    	tags: ["Package"],
    	params: schemas.deletePackageParamsSchema,
    	response: {
    		200: schemas.deletePackageReturnSuccessSchema,
    		...errorSchemas
    	}
    } }, async ( req, reply ) => {
    	const { id } = req.params

    	try {
    		const deleted = await usecasesFactory.deletePackageUseCase.execute( { id } )
    		if ( !deleted ) {
    			return reply.code( 404 ).send( { error: "Package not found" } )
    		}

    		return reply.code( 200 ).send( deleted )
    	} catch ( err: unknown ) {
    		const errorMessage = err instanceof Error ? err.message : "Unknown error"

    		return reply.code( 500 ).send( { message: errorMessage } )
    	}
    } )

	// PRIVATE - SET ISDISABLED
	app.put<{
	      Params: FromSchema<typeof schemas.setIsPackageDisabledParamsSchema>,
	      Body: FromSchema<typeof schemas.setIsPackageDisabledBodySchema>,
	      Reply: SetIsPackageDisabledReplyType
	  }>( "/package/:id/isDisabled", { schema: {
	  	tags: ["Package"],
	  	params: schemas.setIsPackageDisabledParamsSchema,
	  	body: schemas.setIsPackageDisabledBodySchema,
	  	response: {
	  		200: schemas.setIsPackageDisabledReturnSuccessSchema,
	  		...errorSchemas
	  	}
	  } }, async ( req, reply ) => {
	  	const { id } = req.params
	  	const { isDisabled } = req.body

	  	try {
	  		const updated = await usecasesFactory.setIsPackageDisabledUseCase.execute( { id, isDisabled } )

	  		return reply.code( 200 ).send( updated )
	  	} catch ( err: unknown ) {
	  		const errorMessage = err instanceof Error ? err.message : "Unknown error"

	  		return reply.code( 500 ).send( { message: errorMessage } )
	  	}
	  } )
}