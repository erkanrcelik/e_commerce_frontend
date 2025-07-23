import api from '@/lib/axios'
import type {
  SearchCampaignsResponse,
  SearchCategoriesResponse,
  SearchParams,
  SearchProductsResponse,
  SearchResponse,
  SearchSellersResponse,
} from '@/types/customer-search'

/**
 * Customer Search Service
 *
 * Handles all search-related API calls for customers.
 * Supports general search and type-specific search operations.
 */
export class CustomerSearchService {
  /**
   * General search across all types (products, categories, sellers, campaigns)
   *
   * @param params - Search parameters including query, page, limit, and optional type filter
   * @returns Promise<SearchResponse> - Complete search results with all types
   *
   * @example
   * ```typescript
   * const results = await CustomerSearchService.searchAll({
   *   query: 'iphone',
   *   page: 1,
   *   limit: 20
   * })
   * ```
   */
  static async searchAll(params: SearchParams): Promise<SearchResponse> {
    const { query, page = 1, limit = 10, type } = params

    const searchParams = new URLSearchParams({
      query,
      page: page.toString(),
      limit: limit.toString(),
    })

    if (type) {
      searchParams.append('type', type)
    }

    const response = await api.get<SearchResponse>(
      `/search?${searchParams.toString()}`
    )
    return response.data
  }

  /**
   * Search only products
   *
   * @param params - Search parameters for products
   * @returns Promise<SearchProductsResponse> - Products search results
   *
   * @example
   * ```typescript
   * const products = await CustomerSearchService.searchProducts({
   *   query: 'laptop',
   *   page: 1,
   *   limit: 15
   * })
   * ```
   */
  static async searchProducts(
    params: Omit<SearchParams, 'type'>
  ): Promise<SearchProductsResponse> {
    const { query, page = 1, limit = 10 } = params

    const searchParams = new URLSearchParams({
      query,
      page: page.toString(),
      limit: limit.toString(),
    })

    const response = await api.get<SearchProductsResponse>(
      `/search/products?${searchParams.toString()}`
    )
    return response.data
  }

  /**
   * Search only categories
   *
   * @param params - Search parameters for categories
   * @returns Promise<SearchCategoriesResponse> - Categories search results
   *
   * @example
   * ```typescript
   * const categories = await CustomerSearchService.searchCategories({
   *   query: 'electronics',
   *   page: 1,
   *   limit: 10
   * })
   * ```
   */
  static async searchCategories(
    params: Omit<SearchParams, 'type'>
  ): Promise<SearchCategoriesResponse> {
    const { query, page = 1, limit = 10 } = params

    const searchParams = new URLSearchParams({
      query,
      page: page.toString(),
      limit: limit.toString(),
    })

    const response = await api.get<SearchCategoriesResponse>(
      `/search/categories?${searchParams.toString()}`
    )
    return response.data
  }

  /**
   * Search only sellers
   *
   * @param params - Search parameters for sellers
   * @returns Promise<SearchSellersResponse> - Sellers search results
   *
   * @example
   * ```typescript
   * const sellers = await CustomerSearchService.searchSellers({
   *   query: 'tech store',
   *   page: 1,
   *   limit: 10
   * })
   * ```
   */
  static async searchSellers(
    params: Omit<SearchParams, 'type'>
  ): Promise<SearchSellersResponse> {
    const { query, page = 1, limit = 10 } = params

    const searchParams = new URLSearchParams({
      query,
      page: page.toString(),
      limit: limit.toString(),
    })

    const response = await api.get<SearchSellersResponse>(
      `/search/sellers?${searchParams.toString()}`
    )
    return response.data
  }

  /**
   * Search only campaigns
   *
   * @param params - Search parameters for campaigns
   * @returns Promise<SearchCampaignsResponse> - Campaigns search results
   *
   * @example
   * ```typescript
   * const campaigns = await CustomerSearchService.searchCampaigns({
   *   query: 'summer sale',
   *   page: 1,
   *   limit: 10
   * })
   * ```
   */
  static async searchCampaigns(
    params: Omit<SearchParams, 'type'>
  ): Promise<SearchCampaignsResponse> {
    const { query, page = 1, limit = 10 } = params

    const searchParams = new URLSearchParams({
      query,
      page: page.toString(),
      limit: limit.toString(),
    })

    const response = await api.get<SearchCampaignsResponse>(
      `/search/campaigns?${searchParams.toString()}`
    )
    return response.data
  }
}
