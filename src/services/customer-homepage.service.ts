import api from '@/lib/axios'
import type { HomepageData } from '@/types/customer-homepage'

/**
 * Customer Homepage Service
 *
 * Handles all homepage-related API calls for customers.
 * Fetches featured products, categories, campaigns, and other homepage data.
 */
export class CustomerHomepageService {
  /**
   * Get complete homepage data (Public)
   *
   * @returns Promise<HomepageData> - Complete homepage data including all sections
   *
   * @example
   * ```typescript
   * const homepageData = await CustomerHomepageService.getHomepageData()
   * ```
   */
  static async getHomepageData(): Promise<HomepageData> {
    try {
      const response = await api.get<HomepageData>('/homepage')

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get personalized homepage data with recommendations (Authenticated)
   *
   * @returns Promise<HomepageData> - Complete homepage data with personalized recommendations
   *
   * @example
   * ```typescript
   * const homepageData = await CustomerHomepageService.getHomepageWithRecommendations()
   * ```
   */
  static async getHomepageWithRecommendations(): Promise<HomepageData> {
    try {
      const response = await api.get<HomepageData>('/homepage/with-recommendations')

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get featured products for homepage
   *
   * @param params - Query parameters for featured products
   * @returns Promise<HomepageFeaturedProducts> - Featured products data
   *
   * @example
   * ```typescript
   * const featured = await CustomerHomepageService.getFeaturedProducts({ limit: 8 })
   * ```
   */
  static async getFeaturedProducts(params?: {
    limit?: number
  }): Promise<HomepageData['featuredProducts']> {
    try {
      const response = await api.get<HomepageData['featuredProducts']>(
        '/homepage/featured-products',
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get new arrivals for homepage
   *
   * @param params - Query parameters for new arrivals
   * @returns Promise<HomepageNewArrivals> - New arrivals data
   *
   * @example
   * ```typescript
   * const newArrivals = await CustomerHomepageService.getNewArrivals({ limit: 6 })
   * ```
   */
  static async getNewArrivals(params?: {
    limit?: number
    days?: number
  }): Promise<HomepageData['newArrivals']> {
    try {
      const response = await api.get<HomepageData['newArrivals']>(
        '/homepage/new-arrivals',
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get popular products for homepage
   *
   * @param params - Query parameters for popular products
   * @returns Promise<HomepagePopularProducts> - Popular products data
   *
   * @example
   * ```typescript
   * const popular = await CustomerHomepageService.getPopularProducts({ limit: 8 })
   * ```
   */
  static async getPopularProducts(params?: {
    limit?: number
    days?: number
  }): Promise<HomepageData['popularProducts']> {
    try {
      const response = await api.get<HomepageData['popularProducts']>(
        '/homepage/popular-products',
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get special offers for homepage
   *
   * @param params - Query parameters for special offers
   * @returns Promise<HomepageSpecialOffers> - Special offers data
   *
   * @example
   * ```typescript
   * const specialOffers = await CustomerHomepageService.getSpecialOffers({ limit: 8 })
   * ```
   */
  static async getSpecialOffers(params?: {
    limit?: number
  }): Promise<HomepageData['specialOffers']> {
    try {
      const response = await api.get<HomepageData['specialOffers']>(
        '/homepage/special-offers',
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get categories for homepage
   *
   * @param params - Query parameters for categories
   * @returns Promise<HomepageCategories> - Categories data
   *
   * @example
   * ```typescript
   * const categories = await CustomerHomepageService.getCategories({ limit: 12 })
   * ```
   */
  static async getCategories(params?: {
    limit?: number
  }): Promise<HomepageData['categories']> {
    try {
      const response = await api.get<HomepageData['categories']>(
        '/homepage/categories',
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }
}
