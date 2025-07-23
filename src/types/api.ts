/**
 * Base API response types and common interfaces
 */

/**
 * Standard API pagination response structure
 */
export interface PaginationResponse {
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Base API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
  statusCode?: number
}

/**
 * Paginated API response
 */
export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * API error response structure
 */
export interface ApiError {
  message: string
  error?: string
  statusCode: number
  details?: Array<{
    field: string
    message: string
  }>
}

/**
 * Common query parameters for list endpoints
 */
export interface BaseListParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/**
 * Date range filter parameters
 */
export interface DateRangeParams {
  startDate?: string
  endDate?: string
}

/**
 * Price range filter parameters
 */
export interface PriceRangeParams {
  minPrice?: number
  maxPrice?: number
}
