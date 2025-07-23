'use client'

import { CheckCircle, Heart, Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { AddToCartButton } from '@/components/custom/add-to-cart-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useWishlist } from '@/hooks/use-wishlist'
import { CustomerRecommendationService } from '@/services/customer-recommendation.service'
import type { Product } from '@/types/customer-product'

import { CampaignInfo } from './campaign-info'
import { ProductImageGallery } from './product-image-gallery'
import { ProductReviews } from './product-reviews'
import { ProductSpecifications } from './product-specifications'
import { SellerInfo } from './seller-info'

interface ProductDetailPageProps {
  product: Product
}

/**
 * Product detail page component
 *
 * Displays detailed product information with add to cart and wishlist functionality.
 *
 * @example
 * ```tsx
 * <ProductDetailPage product={product} />
 * ```
 */
export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const {
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    wishlistLoading,
    loadWishlist,
  } = useWishlist()
  const [frequentlyBoughtTogether, setFrequentlyBoughtTogether] = useState<
    Product[]
  >([])
  const [isClient, setIsClient] = useState(false)

  // Set client flag on mount to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist()
  }, [loadWishlist])

  // Track view activity
  useEffect(() => {
    if (product._id) {
      CustomerRecommendationService.trackActivity(product._id, 'view').catch(
        console.error
      )
    }
  }, [product._id])

  // Fetch frequently bought together recommendations
  useEffect(() => {
    if (product._id) {
      CustomerRecommendationService.getFrequentlyBoughtTogether(product._id)
        .then(setFrequentlyBoughtTogether)
        .catch(console.error)
    }
  }, [product._id])

  const handleAddToCart = async () => {
    try {
      // Track cart_add activity
      await CustomerRecommendationService.trackActivity(product._id, 'cart_add')
    } catch (error: unknown) {
      console.log('Add to cart error:', error)
    }
  }

  const handleWishlistToggle = async () => {
    if (wishlistLoading) return

    try {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id)
      } else {
        await addToWishlist(product._id)
      }
    } catch (error: unknown) {
      console.log('Wishlist toggle error:', error)
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
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      )
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      )
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />)
    }

    return stars
  }

  // Format price consistently to avoid hydration issues
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <ProductImageGallery
            images={
              product.imageUrls?.map((url, index) => ({
                url,
                alt: `${product.name} ${index + 1}`,
                id: `${product._id}-${index}`,
              })) || []
            }
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Campaign Info */}
          {product.hasDiscount && (
            <CampaignInfo
              discountPercentage={product.discountPercentage || 0}
              originalPrice={product.price}
            />
          )}

          {/* Product Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            {product.averageRating && product.reviewCount > 0 ? (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderRating(product.averageRating)}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            ) : (
              <div className="mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  No reviews yet
                </span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.hasDiscount ? (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  ₺{formatPrice(product.discountedPrice || 0)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ₺{formatPrice(product.price)}
                </span>
                <span className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded text-sm font-medium">
                  -{product.discountPercentage}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₺{formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">
                  In Stock ({product.stock} available)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <span className="font-medium">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton
              product={product}
              onAddToCart={handleAddToCart}
              className="flex-1"
            />

            {isClient && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                disabled={wishlistLoading}
                className="flex items-center gap-2"
              >
                {wishlistLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin" />
                ) : (
                  <Heart
                    className={`w-5 h-5 ${
                      isInWishlist(product._id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  />
                )}
                {wishlistLoading
                  ? 'Loading...'
                  : isInWishlist(product._id)
                    ? 'Remove from Wishlist'
                    : 'Add to Wishlist'}
              </Button>
            )}
          </div>

          {/* Seller Info */}
          {(product.seller || product.sellerId) && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <SellerInfo seller={product.seller || product.sellerId || null} />
            </div>
          )}

          {/* Category */}
          {product.category && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Category:
              </span>
              <Link
                href={`/categories/${product.category._id}`}
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                {product.category.name}
              </Link>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      <div className="mt-12">
        <ProductSpecifications product={product} />
      </div>

      {/* Product Reviews */}
      <div className="mt-12">
        <ProductReviews product={product} />
      </div>

      {/* Seller Products - TODO: Add API call for seller products */}
      {/* {product.seller && (
        <div className="mt-12">
          <SellerProducts seller={product.seller} currentProductId={product._id} />
        </div>
      )} */}

      {/* Frequently Bought Together */}
      {frequentlyBoughtTogether.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Bought Together
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {frequentlyBoughtTogether.map(item => (
              <Card key={item._id} className="overflow-hidden">
                <CardContent className="p-0">
                  <Link href={`/products/${item._id}`}>
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={item.imageUrls?.[0] || '/placeholder-product.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${item._id}`}>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        ₺{formatPrice(item.price || 0)}
                      </span>
                      <AddToCartButton product={item} size="sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
