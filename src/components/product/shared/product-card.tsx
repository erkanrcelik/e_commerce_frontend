'use client'

import { Heart, Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { AddToCartButton } from '@/components/custom/add-to-cart-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useWishlist } from '@/hooks/use-wishlist'
import type { Product } from '@/types/customer-product'

interface ProductCardProps {
  product: Product
  showWishlist?: boolean
  showAddToCart?: boolean
}

/**
 * Product card component
 *
 * Displays product information in a card format with wishlist and add to cart functionality.
 *
 * @example
 * ```tsx
 * <ProductCard product={product} showWishlist={true} showAddToCart={true} />
 * ```
 */
export function ProductCard({
  product,
  showWishlist = true,
  showAddToCart = true,
}: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist, wishlistLoading } =
    useWishlist()
  const [isClient, setIsClient] = useState(false)

  // Set client flag on mount to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleWishlistToggle = async () => {
    if (wishlistLoading) return

    try {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id)
      } else {
        await addToWishlist(product._id)
      }
    } catch (error: unknown) {
      console.error('  Toggle wishlist error:', error)
    } finally {
      // No action needed here as wishlistLoading is managed by useWishlist
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

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
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

          {/* Wishlist Button */}
          {showWishlist && isClient && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full w-8 h-8 p-0 shadow-sm"
            >
              <Heart
                className={`w-4 h-4 ${
                  isInWishlist(product._id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              />
            </Button>
          )}

          {/* Discount Badge */}
          {product.hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              -{product.discountPercentage}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          <Link href={`/products/${product._id}`} className="block">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {product.averageRating && product.averageRating > 0 ? (
              <>
                <div className="flex">{renderRating(product.averageRating)}</div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviewCount || 0})
                </span>
              </>
            ) : (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  No reviews yet
                </span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            {product.hasDiscount ? (
              <>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  ₺
                  {isClient
                    ? product.discountedPrice?.toLocaleString()
                    : product.discountedPrice?.toString()}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₺
                  {isClient
                    ? product.price.toLocaleString()
                    : product.price.toString()}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ₺
                {isClient
                  ? product.price.toLocaleString()
                  : product.price.toString()}
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
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {product.category.name}
              </span>
            </div>
          )}

          {/* Add to Cart Button - Always at bottom */}
          {showAddToCart && (
            <div className="mt-auto pt-2">
              <AddToCartButton product={product} size="sm" className="w-full" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
