'use client'

import { Heart, Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useWishlist } from '@/hooks/use-wishlist'

/**
 * Profile favorites component
 *
 * Displays user's wishlist items with remove functionality.
 *
 * @example
 * ```tsx
 * <ProfileFavorites />
 * ```
 */
export function ProfileFavorites() {
  const { wishlist, wishlistLoading, removeFromWishlist, loadWishlist } =
    useWishlist()

  useEffect(() => {
    loadWishlist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId)
    } catch (error: unknown) {
      console.error('Remove from wishlist error:', error)
    }
  }

  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      )
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      )
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  if (wishlistLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No favorites yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Start adding products to your wishlist to see them here
        </p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Favorites ({wishlist.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map(wishlistItem => {
          if (!wishlistItem.productId) return null

          const product = wishlistItem.productId

          return (
            <Card
              key={wishlistItem._id}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Link href={`/products/${product._id}`}>
                    <Image
                      src={product.imageUrls?.[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    disabled={wishlistLoading}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full w-8 h-8 p-0 shadow-sm"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </Button>

                  {/* Discount Badge */}
                  {product.hasDiscount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{product.discountPercentage}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/products/${product._id}`} className="block">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  {product.averageRating && (
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {renderRating(product.averageRating)}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({product.reviewCount})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    {product.hasDiscount ? (
                      <>
                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          ₺{product.discountedPrice?.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₺{product.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ₺{product.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Seller */}
                  {product.seller && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      by {product.seller.firstName} {product.seller.lastName}
                    </p>
                  )}

                  {/* Category */}
                  {product.category && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {product.category.name}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
