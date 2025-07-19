'use client'

import { Eye, Heart, Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { AddToCartButton } from '@/components/custom/add-to-cart-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'

/**
 * Product Card Props for UI components
 */
interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'grid' | 'list'
  showQuickView?: boolean
  showWishlist?: boolean
  showCompare?: boolean
  className?: string
  onAddToCart?: (product: Product) => void
  onQuickView?: (product: Product) => void
  onWishlist?: (product: Product) => void
  onCompare?: (product: Product) => void
}

/**
 * Star Rating Component
 * @param rating - Product rating (0-5)
 * @param totalReviews - Total number of reviews
 */
const StarRating = ({ rating, totalReviews }: { rating: number; totalReviews: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
        
        {/* Half Star */}
        {hasHalfStar && (
          <StarHalf className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        )}
        
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
      
      {/* Review Count */}
      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 font-medium">
        ({totalReviews})
      </span>
    </div>
  )
}

/**
 * Price Display Component
 * @param price - Current price
 * @param originalPrice - Original price (optional)
 */
const PriceDisplay = ({ 
  price, 
  originalPrice 
}: { 
  price: number; 
  originalPrice?: number 
}) => {
  const hasDiscount = originalPrice && originalPrice > price
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg text-gray-900 dark:text-white">
          ${price.toFixed(2)}
        </span>
        {hasDiscount && (
          <span className="text-sm text-gray-500 dark:text-gray-400 line-through font-medium">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      {hasDiscount && (
        <div className="flex items-center gap-2">
          <Badge className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs px-2 py-0.5 font-medium">
            Save {discountPercentage}%
          </Badge>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            You save ${(originalPrice - price).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  )
}

/**
 * Product Card Component
 * Displays product information in a card format with hover effects and actions
 * 
 * @param product - Product data to display
 * @param variant - Card variant style
 * @param showQuickView - Whether to show quick view button
 * @param showWishlist - Whether to show wishlist button
 * @param showCompare - Whether to show compare button
 * @param className - Additional CSS classes
 * @param onAddToCart - Callback when add to cart is clicked
 * @param onQuickView - Callback when quick view is clicked
 * @param onWishlist - Callback when wishlist is clicked
 * @param onCompare - Callback when compare is clicked
 */
export function ProductCard({ 
  product, 
  showQuickView = true,
  showWishlist = true,
  className,
  onAddToCart,
  onQuickView,
  onWishlist,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  /**
   * Handle quick view action
   */
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (onQuickView) {
      onQuickView(product)
    } else {
      toast.info('Quick view feature coming soon!', {
        description: 'This feature will be available soon.',
        duration: 2000
      })
    }
  }

  /**
   * Handle wishlist toggle
   */
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsWishlisted(!isWishlisted)
    if (onWishlist) {
      onWishlist(product)
    } else {
      toast.success(
        isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
        { 
          description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your wishlist`,
          duration: 2000
        }
      )
    }
  }

  return (
    <Card className={cn(
      "group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-950 rounded-xl h-full flex flex-col",
      className
    )}>
      <Link href={`/products/${product.slug}`} className="block">
        {/* Product Image - Fixed at top */}
        <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800 relative rounded-t-xl">
          <Image
            src={product.images[0]?.url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />

          {/* Product Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium shadow-lg">
                New
              </Badge>
            )}
            {product.isOnSale && product.originalPrice && (
              <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium shadow-lg">
                Sale
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium shadow-lg">
                Bestseller
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          {showWishlist && (
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full shadow-lg"
                onClick={handleWishlist}
              >
                <Heart 
                  className={cn(
                    "w-4 h-4",
                    isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
                  )} 
                />
              </Button>
            </div>
          )}

          {/* Quick View Button */}
          {showQuickView && (
            <div className="absolute top-14 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 rounded-full shadow-lg"
                onClick={handleQuickView}
              >
                <Eye className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          )}

          {/* Stock Status Overlay */}
          {!product.isInStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-t-xl">
              <span className="text-white font-medium text-sm bg-black/50 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info - Flexible content area that fills remaining space */}
      <div className="flex flex-col flex-1">
        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2 mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors leading-5 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="mb-3">
            <StarRating rating={product.averageRating} totalReviews={product.totalReviews} />
          </div>

          {/* Price - This will push the button to bottom */}
          <div className="mb-4 flex-1 flex flex-col justify-end">
            <PriceDisplay 
              price={product.price} 
              originalPrice={product.originalPrice} 
            />
          </div>
        </CardContent>

        {/* Add to Cart Button - Always at bottom */}
        <div className="p-4 pt-0 mt-auto">
          <AddToCartButton
            product={product}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </Card>
  )
} 