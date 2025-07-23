'use client'

import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ProductCard } from '@/components/product/shared/product-card'
import { useAppSelector } from '@/hooks/redux'
import { CustomerRecommendationService } from '@/services/customer-recommendation.service'
import type { ProductRecommendation } from '@/types/recommendation'

/**
 * Recommendations Section Props
 */
interface RecommendationsSectionProps {
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Maximum number of recommendations to show */
  limit?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * Recommendations Section Component
 *
 * Displays personalized product recommendations for logged-in users.
 * Falls back to popular products for non-authenticated users.
 *
 * Features:
 * - Personalized recommendations for authenticated users
 * - Popular products fallback for non-authenticated users
 * - Loading states
 * - Error handling
 * - Responsive grid layout
 * - Activity tracking integration
 *
 * @example
 * ```tsx
 * <RecommendationsSection
 *   title="Recommended for You"
 *   subtitle="Based on your browsing history"
 *   limit={8}
 * />
 * ```
 */
export function RecommendationsSection({
  title = 'Recommended for You',
  subtitle = 'Based on your preferences and browsing history',
  limit = 8,
  className,
}: RecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<
    ProductRecommendation[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAppSelector(state => state.auth)

  /**
   * Fetch recommendations based on user authentication status
   */
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true)
      setError(null)

      try {
        let recommendationsData: ProductRecommendation[] = []

        if (user) {
          // Fetch personalized recommendations for authenticated users
          recommendationsData =
            await CustomerRecommendationService.getPersonalized({
              limit,
            })
        } else {
          // Fetch popular recommendations for non-authenticated users
          recommendationsData =
            await CustomerRecommendationService.getPopular({ limit })
        }

        setRecommendations(recommendationsData)
      } catch (error) {
        console.log('Load recommendations error:', error)
        setError('Failed to load recommendations')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [user, limit])

  // Don't render if no recommendations and not loading
  if (!loading && recommendations.length === 0) {
    return null
  }

  return (
    <section
      className={`py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-purple-900/20 ${className || ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Recommendations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Unable to load recommendations
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                showWishlist={true}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && recommendations.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              <Sparkles className="w-4 h-4" />
              View All Recommendations
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
