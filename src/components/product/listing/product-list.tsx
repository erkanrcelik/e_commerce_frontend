'use client'

import { Eye, Heart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { AddToCartButton } from '@/components/custom/add-to-cart-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/**
 * Product List Component
 *
 * Displays a list of products in a grid layout with wishlist functionality.
 * Supports campaign indicators and responsive design.
 *
 * @param products - Array of products to display
 * @param showCampaigns - Whether to show campaign indicators
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <ProductList products={products} showCampaigns={true} />
 * ```
 */
interface ProductListProps {
  /** Products to display */
  products: any[]
  /** Show campaign indicators */
  showCampaigns?: boolean
  /** Additional CSS classes */
  className?: string
}

export function ProductList({ products, className }: ProductListProps) {
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(
    new Set()
  )

  const toggleWishlist = (productId: string) => {
    setWishlistedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {products.map(product => (
        <Card
          key={product._id}
          className="p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex gap-6">
            {/* Product Image */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={product.imageUrls?.[0] || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />

              {/* Product Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs">
                    New
                  </Badge>
                )}
                {product.isOnSale && product.originalPrice && (
                  <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                    Sale
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs">
                    Bestseller
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWishlist(product.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Heart
                      className={cn(
                        'w-4 h-4',
                        wishlistedProducts.has(product.id)
                          ? 'text-red-500 fill-red-500'
                          : 'text-gray-400'
                      )}
                    />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {product.averageRating && product.averageRating > 0 ? (
                  <>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i < Math.floor(product.averageRating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({product.reviewCount || product.totalReviews || 0} reviews)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      No reviews yet
                    </span>
                  </>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  )}
              </div>

              {/* Add to Cart */}
              <div className="flex items-center gap-3">
                <AddToCartButton
                  product={product}
                  size="sm"
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.isInStock
                    ? `${product.stock} in stock`
                    : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
