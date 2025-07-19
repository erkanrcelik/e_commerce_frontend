'use client'

import { Calendar, MessageCircle, Star, ThumbsUp } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Product } from '@/types/product'

/**
 * Product Reviews Props
 */
interface ProductReviewsProps {
  /** Product to get reviews from */
  product: Product
}

/**
 * Review Interface
 */
interface Review {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  verified: boolean
}

/**
 * Product Reviews Component
 * 
 * Displays customer reviews for the product.
 * 
 * Features:
 * - Review list with ratings
 * - Review filtering
 * - Helpful votes
 * - Verified purchase badges
 * 
 * @example
 * ```tsx
 * <ProductReviews product={product} />
 * ```
 */
export function ProductReviews({ product }: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: '1',
      user: {
        name: 'Ahmet Yılmaz',
        avatar: '/images/avatars/user1.jpg'
      },
      rating: 5,
      title: 'Mükemmel ürün!',
      comment: 'Çok kaliteli bir ürün. Beklentilerimin üzerinde. Kesinlikle tavsiye ederim.',
      date: '2024-01-15',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      user: {
        name: 'Ayşe Demir',
        avatar: '/images/avatars/user2.jpg'
      },
      rating: 4,
      title: 'Gayet iyi',
      comment: 'Fiyatına göre iyi bir ürün. Performansı tatmin edici.',
      date: '2024-01-10',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      user: {
        name: 'Mehmet Kaya',
        avatar: '/images/avatars/user3.jpg'
      },
      rating: 5,
      title: 'Harika!',
      comment: 'Çok hızlı kargo ve mükemmel ürün kalitesi. Teşekkürler!',
      date: '2024-01-08',
      helpful: 15,
      verified: false
    }
  ]

  const filteredReviews = selectedRating 
    ? reviews.filter(review => review.rating === selectedRating)
    : reviews

  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Müşteri Yorumları
        </h2>
        <Button variant="outline" size="sm">
          Yorum Yaz
        </Button>
      </div>

      {/* Rating Summary */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {product.averageRating}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {product.totalReviews} değerlendirme
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
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
                      style={{ 
                        width: `${(ratingCounts[rating as keyof typeof ratingCounts] / reviews.length) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {ratingCounts[rating as keyof typeof ratingCounts]}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map(review => (
          <Card key={review.id} className="p-6">
            <div className="space-y-4">
              {/* Review Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {review.user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {review.user.name}
                      </h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Doğrulanmış Alışveriş
                        </Badge>
                      )}
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
                        <span>{new Date(review.date).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {review.title}
                </h5>
                <p className="text-gray-600 dark:text-gray-400">
                  {review.comment}
                </p>
              </div>

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Faydalı ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>Yanıtla</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {reviews.length > 3 && (
        <div className="text-center">
          <Button variant="outline">
            Daha Fazla Yorum Göster
          </Button>
        </div>
      )}
    </div>
  )
} 