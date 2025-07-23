import type { Campaign } from './customer-campaign'
import type { Category } from './customer-category'
import type { Product } from './customer-product'
import type { Seller } from './customer-seller'

/**
 * Search parameters for all search operations
 */
export interface SearchParams {
  /** Search query term */
  query: string
  /** Page number (default: 1) */
  page?: number
  /** Items per page (default: 10, max: 100) */
  limit?: number
  /** Optional type filter for general search */
  type?: 'products' | 'categories' | 'sellers' | 'campaigns'
}

/**
 * Search result counts for each type
 */
export interface SearchTotalResults {
  /** Total number of products found */
  products: number
  /** Total number of categories found */
  categories: number
  /** Total number of sellers found */
  sellers: number
  /** Total number of campaigns found */
  campaigns: number
}

/**
 * Complete search response with all types
 * Response from /api/search endpoint
 */
export interface SearchResponse {
  /** Array of found products */
  products: Product[]
  /** Array of found categories */
  categories: Category[]
  /** Array of found sellers */
  sellers: Seller[]
  /** Array of found campaigns */
  campaigns: Campaign[]
  /** Total result counts for each type */
  totalResults: SearchTotalResults
}

/**
 * Products-only search response
 * Response from /api/search/products endpoint
 */
export interface SearchProductsResponse {
  /** Array of found products */
  products: Product[]
  /** Empty array for categories */
  categories: []
  /** Empty array for sellers */
  sellers: []
  /** Empty array for campaigns */
  campaigns: []
  /** Total result counts (only products will have count) */
  totalResults: SearchTotalResults
}

/**
 * Categories-only search response
 * Response from /api/search/categories endpoint
 */
export interface SearchCategoriesResponse {
  /** Empty array for products */
  products: []
  /** Array of found categories */
  categories: Category[]
  /** Empty array for sellers */
  sellers: []
  /** Empty array for campaigns */
  campaigns: []
  /** Total result counts (only categories will have count) */
  totalResults: SearchTotalResults
}

/**
 * Sellers-only search response
 * Response from /api/search/sellers endpoint
 */
export interface SearchSellersResponse {
  /** Empty array for products */
  products: []
  /** Empty array for categories */
  categories: []
  /** Array of found sellers */
  sellers: Seller[]
  /** Empty array for campaigns */
  campaigns: []
  /** Total result counts (only sellers will have count) */
  totalResults: SearchTotalResults
}

/**
 * Campaigns-only search response
 * Response from /api/search/campaigns endpoint
 */
export interface SearchCampaignsResponse {
  /** Empty array for products */
  products: []
  /** Empty array for categories */
  categories: []
  /** Empty array for sellers */
  sellers: []
  /** Array of found campaigns */
  campaigns: Campaign[]
  /** Total result counts (only campaigns will have count) */
  totalResults: SearchTotalResults
}
