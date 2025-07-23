import type { Product } from '@/types/customer-product'

/**
 * Recommendation parameters interface
 */
export interface RecommendationParams {
  /** Number of recommendations to return */
  limit?: number
  /** Page number for pagination */
  page?: number
}

/**
 * Category recommendation parameters interface
 */
export interface CategoryRecommendationParams extends RecommendationParams {
  /** Category ID for recommendations */
  categoryId: string
}

/**
 * Product recommendation interface
 */
export interface ProductRecommendation extends Product {
  /** Similarity score for personalized recommendations */
  similarity?: number
  /** Recommendation reason */
  reason?: string
}

/**
 * Personalized recommendations response
 */
export type PersonalizedRecommendations = ProductRecommendation[]

/**
 * Popular recommendations response
 */
export type PopularRecommendations = ProductRecommendation[]

/**
 * History-based recommendations response
 */
export type HistoryRecommendations = ProductRecommendation[]

/**
 * Activity types for tracking - matches backend API
 */
export type ActivityType = 'view' | 'cart_add' | 'purchase' | 'wishlist'

/**
 * Activity tracking request
 */
export interface ActivityTrackingRequest {
  /** Product ID being tracked */
  productId: string
  /** Type of activity */
  activityType: ActivityType
}
