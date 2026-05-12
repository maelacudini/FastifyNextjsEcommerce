import { readFileSync } from "node:fs"

function readEnvFileValue( filePath: string ): string {
	return readFileSync( filePath, "utf8" ).trim()
}

export function getEnvVariable( name: string ): string | undefined {
	const filePath = process.env[`${name}_FILE`]

	if ( filePath ) {
		return readEnvFileValue( filePath )
	}

	return process.env[name]
}

export function requireEnvVariable( name: string ): string {
	const value = getEnvVariable( name )

	if ( !value ) {
		throw new Error( `Missing required environment variable: ${name}` )
	}

	return value
}
