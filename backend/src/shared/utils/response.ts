export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface SuccessResponse<T> {
  success: true
  data: T
  meta?: PaginationMeta
}

export interface ErrorResponse {
  success: false
  error: string
  code: string
  details?: unknown
}

export function success<T>(data: T, meta?: PaginationMeta): SuccessResponse<T> {
  return meta ? { success: true, data, meta } : { success: true, data }
}

export function errorResponse(error: string, code: string, details?: unknown): ErrorResponse {
  return details !== undefined
    ? { success: false, error, code, details }
    : { success: false, error, code }
}
