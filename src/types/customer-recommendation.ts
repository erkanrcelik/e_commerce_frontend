import type { Product } from './customer-product'

/**
 * Recommendation API response types
 */

/**
 * Personalized recommendation item
 */
export interface PersonalizedRecommendation extends Product {
  similarity: number
}

/**
 * Popular products recommendation
 */
export interface PopularRecommendation extends Product {
  popularityScore: number
}

/**
 * Category-based recommendation
 */
export interface CategoryRecommendation extends Product {
  categoryRelevance: number
}

/**
 * Browsing history recommendation
 */
export interface HistoryRecommendation extends Product {
  viewCount: number
  lastViewed: string
}

/**
 * Recommendation query parameters
 */
export interface RecommendationParams {
  limit?: number
}

/**
 * Category recommendation parameters
 */
export interface CategoryRecommendationParams extends RecommendationParams {
  categoryId: string
}

/**
 * Recommendation response types
 */
export type PersonalizedRecommendations = PersonalizedRecommendation[]
export type PopularRecommendations = PopularRecommendation[]
export type CategoryRecommendations = CategoryRecommendation[]
export type HistoryRecommendations = HistoryRecommendation[]
