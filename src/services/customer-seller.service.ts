import api from '@/lib/axios'
import type { PaginatedApiResponse } from '@/types/api'
import type { Campaign } from '@/types/customer-campaign'
import type { Product } from '@/types/customer-product'
import type { Seller } from '@/types/customer-seller'

/**
 * Customer Seller Service
 *
 * Handles all seller-related API calls for customers.
 * Fetches seller profiles, seller lists, and seller products.
 */
export class CustomerSellerService {
  /**
   * Get seller public profile
   *
   * @param sellerId - Seller ID
   * @returns Promise<Seller> - Seller public profile details
   *
   * @example
   * ```typescript
   * const profile = await CustomerSellerService.getSellerProfile('507f1f77bcf86cd799439011')
   * ```
   */
  static async getSellerProfile(sellerId: string): Promise<Seller> {
    try {
      // Use the new public seller API endpoint
      const response = await api.get<Seller>(`/sellers/detail/${sellerId}`)

      return response.data
    } catch (error) {
      console.error('Get seller profile API hatası:', error)
      throw error
    }
  }

  /**
   * Get seller's products from homepage API
   *
   * @param sellerId - Seller ID
   * @param params - Query parameters
   * @returns Promise<PaginatedApiResponse<Product>> - Paginated seller products
   *
   * @example
   * ```typescript
   * const products = await CustomerSellerService.getSellerProducts('507f1f77bcf86cd799439011', {
   *   limit: 20
   * })
   * ```
   */
  static async getSellerProducts(
    sellerId: string,
    params?: {
      limit?: number
    }
  ): Promise<PaginatedApiResponse<Product>> {
    try {
      const response = await api.get<PaginatedApiResponse<Product>>(
        `/homepage/sellers/${sellerId}/products`,
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get seller's campaigns
   *
   * @param sellerId - Seller ID
   * @param params - Query parameters
   * @returns Promise<PaginatedApiResponse<Campaign>> - Paginated seller campaigns
   *
   * @example
   * ```typescript
   * const campaigns = await CustomerSellerService.getSellerCampaigns('507f1f77bcf86cd799439011', {
   *   limit: 5
   * })
   * ```
   */
  static async getSellerCampaigns(
    sellerId: string,
    params?: {
      limit?: number
    }
  ): Promise<PaginatedApiResponse<Campaign>> {
    try {
      const response = await api.get<PaginatedApiResponse<Campaign>>(
        `/campaigns/seller/${sellerId}`,
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Search sellers
   *
   * @param params - Query parameters for seller search
   * @returns Promise<PaginatedApiResponse<Seller>> - Paginated search results
   *
   * @example
   * ```typescript
   * const results = await CustomerSellerService.searchSellers({
   *   query: 'moda',
   *   page: 1,
   *   limit: 10
   * })
   * ```
   */
  static async searchSellers(params: {
    query: string
    page?: number
    limit?: number
  }): Promise<PaginatedApiResponse<Seller>> {
    try {
      const response = await api.get<PaginatedApiResponse<Seller>>(
        '/search/sellers',
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get all sellers for homepage carousel
   *
   * @param params - Query parameters for pagination and filtering
   * @returns Promise<PaginatedApiResponse<Seller>> - Paginated sellers list
   *
   * @example
   * ```typescript
   * const sellers = await CustomerSellerService.getAllSellers({ limit: 10 })
   * ```
   */
  static async getAllSellers(params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<PaginatedApiResponse<Seller>> {
    try {

      const response = await api.get<PaginatedApiResponse<Seller>>('/sellers', {
        params,
      })

      return response.data
    } catch (error) {
      console.error('Get all sellers API hatası:', error)
      throw error
    }
  }

  /**
   * Get seller by ID
   *
   * @param sellerId - Seller ID
   * @returns Promise<Seller> - Seller details
   *
   * @example
   * ```typescript
   * const seller = await CustomerSellerService.getSellerById('507f1f77bcf86cd799439011')
   * ```
   */
  static async getSellerById(sellerId: string): Promise<Seller> {
    try {
      const response = await api.get<Seller>(`/sellers/${sellerId}`)

      return response.data
    } catch (error) {
      throw error
    }
  }
}
