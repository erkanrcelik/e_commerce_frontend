import api from '@/lib/axios'
import type {
  CreateReviewRequest,
  Review,
  ReviewListResponse,
  ReviewStats,
  UpdateReviewRequest,
} from '@/types/customer-review'

/**
 * Customer Review Service
 *
 * Handles all review-related API calls for customers
 */
export class CustomerReviewService {
  /**
   * Get user's own reviews
   *
   * @param params - Query parameters for pagination and filtering
   * @returns Promise<ReviewListResponse> - User's reviews with pagination
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const userReviews = await CustomerReviewService.getUserReviews({ page: 1, limit: 10 })
   * ```
   */
  static async getUserReviews(params?: {
    page?: number
    limit?: number
  }): Promise<ReviewListResponse> {
    try {
      // TODO: Backend'de /api/reviews/user endpoint'i yoksa, admin endpoint'ini kullan
      // Şimdilik admin endpoint'ini kullanıp client-side filtreleme yapıyoruz
      const response = await api.get<ReviewListResponse>('/reviews/admin', {
        params,
      })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get product reviews
   *
   * @param productId - Product ID
   * @param params - Query parameters for pagination and filtering
   * @returns Promise<ReviewListResponse> - Product reviews with pagination
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const productReviews = await CustomerReviewService.getProductReviews('507f1f77bcf86cd799439011', { page: 1, limit: 10 })
   * ```
   */
  static async getProductReviews(
    productId: string,
    params?: { page?: number; limit?: number; rating?: number }
  ): Promise<ReviewListResponse> {
    try {
      const response = await api.get<ReviewListResponse>(
        `/reviews/product/${productId}`,
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get product review statistics
   *
   * @param productId - Product ID
   * @returns Promise<ReviewStats> - Review statistics
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const stats = await CustomerReviewService.getProductReviewStats('507f1f77bcf86cd799439011')
   * ```
   */
  static async getProductReviewStats(productId: string): Promise<ReviewStats> {
    try {
      const response = await api.get<ReviewStats>(
        `/reviews/product/${productId}/stats`
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get review details
   *
   * @param reviewId - Review ID
   * @returns Promise<Review> - Review details
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const review = await CustomerReviewService.getReviewDetails('507f1f77bcf86cd799439011')
   * ```
   */
  static async getReviewDetails(reviewId: string): Promise<Review> {
    try {
      const response = await api.get<Review>(`/reviews/${reviewId}`)

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Create new review
   *
   * @param reviewData - Review data to create
   * @returns Promise<Review> - Created review
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const newReview = await CustomerReviewService.createReview({
   *   productId: '507f1f77bcf86cd799439011',
   *   rating: 5,
   *   title: 'Excellent product!',
   *   comment: 'This product exceeded my expectations.'
   * })
   * ```
   */
  static async createReview(reviewData: CreateReviewRequest): Promise<Review> {
    try {
      const response = await api.post<Review>('/reviews', reviewData)

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Update review
   *
   * @param reviewId - Review ID to update
   * @param reviewData - Updated review data
   * @returns Promise<Review> - Updated review
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const updatedReview = await CustomerReviewService.updateReview('507f1f77bcf86cd799439011', {
   *   rating: 4,
   *   title: 'Updated title',
   *   comment: 'Updated comment'
   * })
   * ```
   */
  static async updateReview(
    reviewId: string,
    reviewData: UpdateReviewRequest
  ): Promise<Review> {
    try {
      const response = await api.put<Review>(`/reviews/${reviewId}`, reviewData)

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete review
   *
   * @param reviewId - Review ID to delete
   * @returns Promise<void> - Success response
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * await CustomerReviewService.deleteReview('507f1f77bcf86cd799439011')
   * ```
   */
  static async deleteReview(reviewId: string): Promise<void> {
    try {
      await api.delete(`/reviews/${reviewId}`)
    } catch (error) {
      throw error
    }
  }

  /**
   * Get current customer's own reviews (profilde kendi değerlendirmeleri)
   */
  static async getMyReviews(params?: {
    page?: number
    limit?: number
    rating?: number
    isApproved?: boolean
  }): Promise<ReviewListResponse> {
    try {
      const response = await api.get<ReviewListResponse>(
        '/reviews/customer/my-reviews',
        { params }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }
}
