import api from '@/lib/axios'

/**
 * Customer Recommendation Service
 *
 * Handles all recommendation-related API calls for customers.
 * Provides personalized and general product recommendations.
 */
export class CustomerRecommendationService {
  /**
   * Get personalized recommendations (Authenticated)
   *
   * @param params - Query parameters for personalized recommendations
   * @returns Promise<any[]> - Personalized recommendations
   *
   * @example
   * ```typescript
   * const recommendations = await CustomerRecommendationService.getPersonalized({ limit: 10 })
   * ```
   */
  static async getPersonalized(params?: {
    limit?: number
  }): Promise<any[]> {
    try {
      const response = await api.get('/recommendations/personalized', { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get user's most viewed products (Authenticated)
   *
   * @param params - Query parameters for most viewed products
   * @returns Promise<any[]> - Most viewed products
   *
   * @example
   * ```typescript
   * const mostViewed = await CustomerRecommendationService.getMyMostViewed({ limit: 10 })
   * ```
   */
  static async getMyMostViewed(params?: {
    limit?: number
  }): Promise<any[]> {
    try {
      const response = await api.get('/recommendations/my-most-viewed', { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get featured products (Public)
   *
   * @param params - Query parameters for featured products
   * @returns Promise<any[]> - Featured products
   *
   * @example
   * ```typescript
   * const featured = await CustomerRecommendationService.getFeatured({ limit: 10 })
   * ```
   */
  static async getFeatured(params?: {
    limit?: number
  }): Promise<any[]> {
    try {
      const response = await api.get('/recommendations/featured', { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get popular products (Public)
   *
   * @param params - Query parameters for popular products
   * @returns Promise<any[]> - Popular products
   *
   * @example
   * ```typescript
   * const popular = await CustomerRecommendationService.getPopular({ limit: 10 })
   * ```
   */
  static async getPopular(params?: {
    limit?: number
  }): Promise<any[]> {
    try {
      const response = await api.get('/recommendations/popular', { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get frequently bought together products (Public)
   *
   * @param productId - Product ID to get related products
   * @param params - Query parameters for frequently bought together
   * @returns Promise<any[]> - Frequently bought together products
   *
   * @example
   * ```typescript
   * const related = await CustomerRecommendationService.getFrequentlyBoughtTogether('product_id', { limit: 5 })
   * ```
   */
  static async getFrequentlyBoughtTogether(
    productId: string,
    params?: {
      limit?: number
    }
  ): Promise<any[]> {
    try {
      const response = await api.get(`/recommendations/frequently-bought-together/${productId}`, { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get category recommendations (Public)
   *
   * @param categoryId - Category ID to get recommendations
   * @param params - Query parameters for category recommendations
   * @returns Promise<any[]> - Category recommendations
   *
   * @example
   * ```typescript
   * const categoryRecs = await CustomerRecommendationService.getCategoryRecommendations('category_id', { limit: 10 })
   * ```
   */
  static async getCategoryRecommendations(
    categoryId: string,
    params?: {
      limit?: number
    }
  ): Promise<any[]> {
    try {
      const response = await api.get(`/recommendations/category/${categoryId}`, { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get browsing history recommendations (Authenticated)
   *
   * @param params - Query parameters for browsing history recommendations
   * @returns Promise<any[]> - Browsing history recommendations
   *
   * @example
   * ```typescript
   * const historyRecs = await CustomerRecommendationService.getBrowsingHistory({ limit: 10 })
   * ```
   */
  static async getBrowsingHistory(params?: {
    limit?: number
  }): Promise<any[]> {
    try {
      const response = await api.get('/recommendations/browsing-history', { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Track user activity (Authenticated)
   *
   * @param productId - Product ID
   * @param activityType - Type of activity (view, purchase, cart_add)
   * @returns Promise<void>
   *
   * @example
   * ```typescript
   * await CustomerRecommendationService.trackActivity('product_id', 'view')
   * ```
   */
  static async trackActivity(
    productId: string,
    activityType: 'view' | 'purchase' | 'cart_add'
  ): Promise<void> {
    try {
      await api.post('/recommendations/track-activity', {
        productId,
        activityType,
      })
    } catch (error) {
      // Don't throw error for tracking, just log it
      console.log('Activity tracking failed:', error)
    }
  }
}
