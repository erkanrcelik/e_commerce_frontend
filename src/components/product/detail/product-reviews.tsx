'use client'

import { Calendar, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Card } from '@/components/ui/card'
import { CustomerReviewService } from '@/services/customer-review.service'
import type { Product } from '@/types/customer-product'
import type { Review, ReviewStats } from '@/types/customer-review'

import { ReviewForm } from './review-form'

/**
 * Product Reviews Props
 */
interface ProductReviewsProps {
  /** Product to get reviews from */
  product: Product
}

/**
 * Product Reviews Component
 *
 * Displays customer reviews for the product with review submission functionality.
 * Only shows data that is returned by the API.
 *
 * Features:
 * - Review list with ratings from API
 * - Review filtering by rating
 * - Review statistics from API
 * - Review submission form
 * - Conditional rendering based on API data
 * - Real-time updates after review submission
 *
 * @example
 * ```tsx
 * <ProductReviews product={product} />
 * ```
 */
export function ProductReviews({ product }: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch reviews for the product
   */
  const fetchReviews = useCallback(async () => {
    if (!product._id) return

    try {
      setLoading(true)
      setError(null)

      const [reviewsResponse, statsResponse] = await Promise.all([
        CustomerReviewService.getProductReviews(product._id, {
          page: 1,
          limit: 10,
          rating: selectedRating || undefined,
        }),
        CustomerReviewService.getProductReviewStats(product._id),
      ])

      setReviews(reviewsResponse.data)
      setStats(statsResponse)
    } catch (error: unknown) {
      console.error('  Fetch reviews error:', error)
      setError('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }, [product._id, selectedRating])

  useEffect(() => {
    if (product._id) {
      void fetchReviews()
    }
  }, [product._id, fetchReviews])

  /**
   * Handle review submission callback
   */
  const handleReviewSubmitted = () => {
    // Refresh reviews after new review is submitted
    fetchReviews()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Customer Reviews
        </h2>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400">
            Loading reviews...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Customer Reviews
        </h2>
        <div className="text-center py-8">
          <div className="text-red-500 dark:text-red-400">{error}</div>
        </div>
      </div>
    )
  }

  // Use API data if available, otherwise use product data
  const averageRating = stats?.averageRating || product.averageRating
  const totalReviews = stats?.totalReviews || product.reviewCount

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Customer Reviews
        </h2>
        <ReviewForm
          product={product}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>

      {/* Rating Summary - Only show if there are reviews */}
      {totalReviews > 0 && (
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {averageRating?.toFixed(1)}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {totalReviews} reviews
              </p>
            </div>

            {/* Rating Breakdown - Only show if stats available */}
            {stats && (
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = stats.ratingDistribution[rating] || 0
                  const percentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0

                  return (
                    <div key={rating} className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setSelectedRating(
                            selectedRating === rating ? null : rating
                          )
                        }
                        className={`flex items-center space-x-2 px-2 py-1 rounded ${
                          selectedRating === rating
                            ? 'bg-purple-100 dark:bg-purple-900/20'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {count}
                        </span>
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map(review => (
            <Card key={review._id} className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">A</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Anonymous User
                        </h4>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(review.createdAt).toLocaleDateString(
                              'en-US'
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    {review.comment}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">
              No reviews yet for this product.
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Be the first to share your experience!
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
