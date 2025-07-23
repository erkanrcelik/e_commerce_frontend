import type { Category } from './customer-category'
import type { Product } from './customer-product'

/**
 * Search API types
 */

/**
 * Search type enumeration
 */
export type SearchType = 'all' | 'products' | 'categories' | 'sellers'

/**
 * Seller search result
 */
export interface SellerSearchResult {
  _id: string
  firstName: string
  lastName: string
  companyName?: string
  rating: number
  totalProducts: number
}

/**
 * Search results structure
 */
export interface SearchResults {
  products: {
    data: Product[]
    total: number
  }
  categories: {
    data: Category[]
    total: number
  }
  sellers: {
    data: SellerSearchResult[]
    total: number
  }
}

/**
 * Search response
 */
export interface SearchResponse {
  query: string
  results: SearchResults
  suggestions: string[]
  totalResults: number
}

/**
 * Search query parameters
 */
export interface SearchParams {
  q: string
  type?: SearchType
  page?: number
  limit?: number
}
