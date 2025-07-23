import api from '@/lib/axios'
import type { PaginatedApiResponse } from '@/types/api'
import type { Product, ProductListParams } from '@/types/customer-product'

/**
 * Customer Product Service
 *
 * Handles all product-related API calls for customers.
 * Uses the new products API endpoints with advanced filtering and search.
 */
export class CustomerProductService {
  /**
   * Get products with advanced filtering and search
   *
   * @param params - Query parameters for filtering, search, and pagination
   * @returns Promise<PaginatedApiResponse<Product>> - Paginated products
   *
   * @example
   * ```typescript
   * const products = await CustomerProductService.getProducts({
   *   page: 1,
   *   limit: 20,
   *   search: 'laptop',
   *   category: '6880212ad7d0a3256b36f488',
   *   minPrice: 1000,
   *   maxPrice: 5000,
   *   sortBy: 'price',
   *   sortOrder: 'asc'
   * })
   * ```
   */
  static async getProducts(
    params?: ProductListParams
  ): Promise<PaginatedApiResponse<Product>> {
    try {
      const response = await api.get<PaginatedApiResponse<Product>>(
        '/products',
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get product filters and options
   *
   * @returns Promise<any> - Filter options including categories, price ranges, tags, sellers
   *
   * @example
   * ```typescript
   * const filters = await CustomerProductService.getProductFilters()
   * ```
   */
  static async getProductFilters(): Promise<any> {
    try {
      const response = await api.get('/products/filters')

      return response.data
    } catch (error: unknown) {
      console.error('  Get product error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to get product'
      throw new Error(errorMessage)
    }
  }

  /**
   * Get featured products
   *
   * @returns Promise<Product[]> - Featured products
   *
   * @example
   * ```typescript
   * const featuredProducts = await CustomerProductService.getFeaturedProducts()
   * ```
   */
  static async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>('/products/featured')

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get single product by ID
   *
   * @param id - Product ID
   * @returns Promise<Product> - Product details
   *
   * @example
   * ```typescript
   * const product = await CustomerProductService.getProduct('688023da55e69ed266417934')
   * ```
   */
  static async getProduct(id: string): Promise<Product> {
    try {
      const response = await api.get<Product>(`/products/${id}`)

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get products by category
   *
   * @param categoryId - Category ID
   * @param params - Additional query parameters
   * @returns Promise<PaginatedApiResponse<Product>> - Paginated products
   *
   * @example
   * ```typescript
   * const categoryProducts = await CustomerProductService.getProductsByCategory('6880212ad7d0a3256b36f488', {
   *   page: 1,
   *   limit: 20,
   *   sortBy: 'price',
   *   sortOrder: 'asc'
   * })
   * ```
   */
  static async getProductsByCategory(
    categoryId: string,
    params?: Omit<ProductListParams, 'category'>
  ): Promise<PaginatedApiResponse<Product>> {
    try {
      const response = await api.get<PaginatedApiResponse<Product>>(
        '/products',
        {
          params: { ...params, category: categoryId },
        }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get products by seller
   *
   * @param sellerId - Seller ID
   * @param params - Additional query parameters
   * @returns Promise<PaginatedApiResponse<Product>> - Paginated products
   *
   * @example
   * ```typescript
   * const sellerProducts = await CustomerProductService.getProductsBySeller('6880213dd7d0a3256b36f4ae', {
   *   page: 1,
   *   limit: 20,
   *   sortBy: 'createdAt',
   *   sortOrder: 'desc'
   * })
   * ```
   */
  static async getProductsBySeller(
    sellerId: string,
    params?: Omit<ProductListParams, 'seller'>
  ): Promise<PaginatedApiResponse<Product>> {
    try {
      const response = await api.get<PaginatedApiResponse<Product>>(
        '/products',
        {
          params: { ...params, seller: sellerId },
        }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get products by campaign using dedicated campaign endpoint
   *
   * @param campaignId - Campaign ID
   * @param params - Additional query parameters
   * @returns Promise<PaginatedApiResponse<Product>> - Paginated campaign products
   *
   * @example
   * ```typescript
   * const campaignProducts = await CustomerProductService.getProductsByCampaign('6880346b0d74539ff4abfe2d', {
   *   page: 1,
   *   limit: 10
   * })
   * ```
   */
  static async getProductsByCampaign(
    campaignId: string,
    params?: {
      page?: number
      limit?: number
    }
  ): Promise<PaginatedApiResponse<Product>> {
    try {
      const response = await api.get<PaginatedApiResponse<Product>>(
        `/products/by-campaign/${campaignId}`,
        {
          params,
        }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Search products
   *
   * @param searchTerm - Search term
   * @param params - Additional query parameters
   * @returns Promise<PaginatedApiResponse<Product>> - Paginated search results
   *
   * @example
   * ```typescript
   * const searchResults = await CustomerProductService.searchProducts('laptop', {
   *   page: 1,
   *   limit: 20,
   *   minPrice: 1000,
   *   maxPrice: 5000
   * })
   * ```
   */
  static async searchProducts(
    searchTerm: string,
    params?: Omit<ProductListParams, 'search'>
  ): Promise<PaginatedApiResponse<Product>> {
    try {
      const response = await api.get<PaginatedApiResponse<Product>>(
        '/products',
        {
          params: { ...params, search: searchTerm },
        }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }
}

// Export individual functions for easier imports
export const getProducts = CustomerProductService.getProducts
export const getProductFilters = CustomerProductService.getProductFilters
export const getFeaturedProducts = CustomerProductService.getFeaturedProducts
export const getProduct = CustomerProductService.getProduct
export const getProductsByCategory =
  CustomerProductService.getProductsByCategory
export const getProductsBySeller = CustomerProductService.getProductsBySeller
export const searchProducts = CustomerProductService.searchProducts
