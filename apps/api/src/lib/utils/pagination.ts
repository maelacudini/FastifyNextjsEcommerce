import { paginationDefaultLimit } from "@/const.js"
import type { PageAndLimitType, PaginatedResultType } from "@/types.js"

export const normalizePagination = <T extends PageAndLimitType>( data: T ) => {
	const requestedPage = data.page && data.page > 0 ? Math.floor( data.page ) : 1
	const limit = data.limit && data.limit > 0 ? Math.floor( data.limit ) : paginationDefaultLimit

	return { requestedPage, limit }
}

export const getPaginationMeta = ( requestedPage: number, limit: number, total: number ) => {
	const totalPages = total === 0 ? 0 : Math.ceil( total / limit )
	const page = totalPages === 0 ? 1 : Math.min( requestedPage, totalPages )
	const offset = ( page - 1 ) * limit

	return { page, limit, total, totalPages, offset }
}

export const buildPaginatedResult = <T>( items: T[], data: Omit<PaginatedResultType<T>, "items"> ): PaginatedResultType<T> => ( {
	items,
	...data
} )
