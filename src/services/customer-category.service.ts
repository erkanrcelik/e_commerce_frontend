import api from '@/lib/axios'
import type { PaginatedApiResponse } from '@/types/api'
import type { Campaign } from '@/types/customer-campaign'
import type { Category } from '@/types/customer-category'
import type { Product } from '@/types/customer-product'

/**
 * Customer Category Service
 *
 * Handles all category-related API calls for customers.
 * Fetches categories, category details, products, and campaigns.
 */
export class CustomerCategoryService {
  /**
   * Get category by ID
   *
   * @param categoryId - Category ID
   * @returns Promise<Category> - Category details
   *
   * @example
   * ```typescript
   * const category = await CustomerCategoryService.getCategoryById('507f1f77bcf86cd799439012')
   * ```
   */
  static async getCategoryById(categoryId: string): Promise<Category> {
    try {
      const response = await api.get<Category>(`/categories/${categoryId}`)

      return response.data
    } catch (error) {
      console.error('Get category error:', error)
      throw error
    }
  }

  /**
   * Get category products from homepage API
   *
   * @param categoryId - Category ID
   * @param params - Query parameters
   * @returns Promise<PaginatedApiResponse<Product>> - Paginated category products
   *
   * @example
   * ```typescript
   * const products = await CustomerCategoryService.getCategoryProducts('507f1f77bcf86cd799439012', {
   *   limit: 20
   * })
   * ```
   */
  static async getCategoryProducts(
    categoryId: string,
    params?: {
      limit?: number
    }
  ): Promise<PaginatedApiResponse<Product>> {
    try {
      const response = await api.get<PaginatedApiResponse<Product>>(
        `/homepage/categories/${categoryId}/products`,
        { params }
      )

      // Ensure response has the expected structure
      const data = response.data?.data || []
      const total = response.data?.total || 0

      return {
        data: data,
        total: total,
        page: 1,
        limit: params?.limit || 6,
        totalPages: Math.ceil(total / (params?.limit || 6)),
      }
    } catch (error) {
      console.error('Get category products error:', error)
      throw error
    }
  }

  /**
   * Get category campaigns
   *
   * @param categoryId - Category ID
   * @param params - Query parameters
   * @returns Promise<PaginatedApiResponse<Campaign>> - Paginated category campaigns
   *
   * @example
   * ```typescript
   * const campaigns = await CustomerCategoryService.getCategoryCampaigns('507f1f77bcf86cd799439012', {
   *   limit: 5
   * })
   * ```
   */
  static async getCategoryCampaigns(
    categoryId: string,
    params?: {
      limit?: number
    }
  ): Promise<PaginatedApiResponse<Campaign>> {
    try {
      const response = await api.get<PaginatedApiResponse<Campaign>>(
        `/campaigns/category/${categoryId}`,
        { params }
      )

      // Ensure response has the expected structure
      const data = response.data?.data || []
      const total = response.data?.total || 0

      return {
        data: data,
        total: total,
        page: 1,
        limit: params?.limit || 10,
        totalPages: Math.ceil(total / (params?.limit || 10)),
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Search categories
   *
   * @param params - Query parameters for category search
   * @returns Promise<PaginatedApiResponse<Category>> - Paginated search results
   *
   * @example
   * ```typescript
   * const results = await CustomerCategoryService.searchCategories({
   *   query: 'giyim',
   *   page: 1,
   *   limit: 10
   * })
   * ```
   */
  static async searchCategories(params: {
    query: string
    page?: number
    limit?: number
  }): Promise<PaginatedApiResponse<Category>> {
    try {
      const response = await api.get<PaginatedApiResponse<Category>>(
        '/search/categories',
        { params }
      )

      // Ensure response has the expected structure
      const data = response.data?.data || []
      const total = response.data?.total || 0
      const page = response.data?.page || 1

      return {
        data: data,
        total: total,
        page: page,
        limit: params.limit || 10,
        totalPages: Math.ceil(total / (params.limit || 10)),
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Get paginated category list with filtering
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Promise<PaginatedApiResponse<Category>> - Paginated category list
   *
   * @example
   * ```typescript
   * const categories = await CustomerCategoryService.getCategories({
   *   page: 1,
   *   limit: 12,
   *   search: 'electronics',
   *   isActive: true
   * })
   * ```
   */
  static async getCategories(params?: {
    page?: number
    limit?: number
    search?: string
    isActive?: boolean
  }): Promise<PaginatedApiResponse<Category>> {
    try {
      const response = await api.get<PaginatedApiResponse<Category>>(
        '/categories',
        { params }
      )

      return response.data
    } catch (error) {
      console.error('Get categories error:', error)
      throw error
    }
  }

  /**
   * Get category by slug (for backward compatibility)
   *
   * @param slug - Category slug
   * @returns Promise<Category | null> - Category details or null if not found
   *
   * @example
   * ```typescript
   * const category = await CustomerCategoryService.getCategoryBySlug('electronics')
   * ```
   */
  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      // First try to get category by ID if slug looks like an ID
      if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        try {
          const category = await CustomerCategoryService.getCategoryById(slug)

          return category
        } catch {
          // If it's a 404 error, return null
          // For other errors, return null to show not found
          return null
        }
      }

      // Search for category by slug (name) - case insensitive
      const response = await CustomerCategoryService.searchCategories({
        query: slug,
        limit: 10,
      })

      // Ensure we have valid data and find exact match (case insensitive)
      const category =
        response.data?.find(
          cat =>
            cat.name.toLowerCase() === slug.toLowerCase() ||
            cat.name.toLowerCase().includes(slug.toLowerCase()) ||
            slug.toLowerCase().includes(cat.name.toLowerCase())
        ) || null

      return category
    } catch {
      // For other errors, return null to show not found
      return null
    }
  }
}
