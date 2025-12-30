import type { FromSchema } from "json-schema-to-ts"
import type { notFoundSchema, serverErrorSchema, unauthorizedSchema } from "./const.js"

// Shared schemas types
export type ErrorSchemasTypes = {
  404: FromSchema<typeof notFoundSchema>,
  401: FromSchema<typeof unauthorizedSchema>,
  500: FromSchema<typeof serverErrorSchema>
};

// Shared pagination type
export type PaginatedResultType<T> = {
  items: T[],
  page: number,
  limit: number,
  total: number,
  totalPages: number
};
