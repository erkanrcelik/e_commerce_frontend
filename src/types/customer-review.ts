import type { BaseListParams } from './api'

/**
 * Review user information
 */
export interface ReviewUser {
  _id: string
  firstName: string
  lastName: string
}

/**
 * Review data structure
 */
export interface Review {
  _id: string
  productId: {
    _id: string
    name: string
    imageUrls: string[]
  }
  userId: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Review list response with pagination
 */
export interface ReviewListResponse {
  data: Review[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Review statistics
 */
export interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    [key: number]: number
  }
}

/**
 * Product reviews response
 */
export interface ProductReviewsResponse {
  data: Review[]
  total: number
  page: number
  limit: number
  totalPages: number
  averageRating: number
  totalReviews: number
}

/**
 * Review list query parameters
 */
export interface ReviewListParams extends BaseListParams {
  productId: string
  rating?: number
}

/**
 * Create review request
 */
export interface CreateReviewRequest {
  productId: string
  rating: number
  title: string
  comment: string
}

/**
 * Update review request
 */
export interface UpdateReviewRequest {
  rating?: number
  title?: string
  comment?: string
}

/**
 * Review form data for React Hook Form
 */
export interface ReviewFormData {
  rating: number
  title: string
  comment: string
}

/**
 * Review response for checking if user has reviewed
 */
export interface ReviewCheckResponse {
  isInWishlist: boolean
}
