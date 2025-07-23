'use client'

import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { addItemToCart } from '@/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { cn } from '@/lib/utils'
import { CustomerRecommendationService } from '@/services/customer-recommendation.service'
import type { Product } from '@/types/customer-product'

/**
 * Add to Cart Button Props 
 */
interface AddToCartButtonProps {
  /** Product to add to cart */
  product: Product
  /** Button variant */
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  /** Button size */
  size?: 'default' | 'sm' | 'lg'
  /** Full width button */
  fullWidth?: boolean
  /** Show shopping cart icon */
  showIcon?: boolean
  /** Custom button text */
  text?: string
  /** Custom out of stock text */
  outOfStockText?: string
  /** Additional CSS classes */
  className?: string
  /** Custom add to cart handler */
  onAddToCart?: (product: Product) => void
  /** Disable the button */
  disabled?: boolean
}

/**
 * Add to Cart Button Component
 *
 * Reusable add to cart button with loading states, error handling, and activity tracking.
 * Used across product cards, product pages, and quick view modals.
 *
 * Features:
 * - Loading animation during API calls
 * - Automatic stock checking
 * - Toast notifications
 * - Customizable appearance
 * - Accessible design
 * - Error handling
 * - Authentication check with login redirect
 * - Redux integration
 * - Activity tracking for recommendations
 *
 * @example
 * ```tsx
 * <AddToCartButton
 *   product={product}
 *   fullWidth={true}
 *   onAddToCart={handleAddToCart}
 * />
 * ```
 */
export function AddToCartButton({
  product,
  variant = 'default',
  size = 'default',
  fullWidth = false,
  showIcon = true,
  text = 'Add to Cart',
  outOfStockText = 'Out of Stock',
  className,
  onAddToCart,
  disabled = false,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoading } = useAppSelector(state => state.cart)
  const { user } = useAppSelector(state => state.auth)
  const [localLoading, setLocalLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set client flag on mount to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if product is in stock
  const isInStock = product.stock > 0
  const isDisabled = disabled || !isInStock || isLoading || localLoading

  /**
   * Track cart_add activity for recommendations
   */
  const trackCartActivity = async () => {
    if (user && product?._id) {
      try {
        await CustomerRecommendationService.trackActivity(product._id, 'cart_add')
      } catch (error) {
        // Silently fail to avoid breaking user experience
        console.log('Failed to track cart activity:', error)
      }
    }
  }

  /**
   * Handle login redirect
   */
  const handleLoginRedirect = () => {
    toast.error('Please login to add items to cart', {
      description: 'You need to be logged in to add items to your cart.',
      duration: 4000,
      action: {
        label: 'Login Now',
        onClick: () => {
          router.push('/login')
        },
      },
    })
  }

  /**
   * Handle add to cart action
   */
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isDisabled) return

    // Check if user is authenticated
    if (!user) {
      handleLoginRedirect()
      return
    }

    setLocalLoading(true)

    try {
      // Use custom handler if provided
      if (onAddToCart) {
        onAddToCart(product)

        // Track cart activity
        await trackCartActivity()

        toast.success('Added to Cart!', {
          description: (
            <div className="flex items-center gap-3 mt-2">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden relative">
                <Image
                  src={product.imageUrls[0] || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {product.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ₺{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ),
          duration: 3000,
          action: {
            label: 'View Cart',
            onClick: () => {
              router.push('/cart')
            },
          },
        })
      } else {
        // Use Redux action to add to cart via API
        const result = await dispatch(
          addItemToCart({
            productId: product._id,
            quantity: 1,
          })
        ).unwrap()

        console.log('Add to cart result:', result)
        // Track cart activity
        await trackCartActivity()

        toast.success('Added to Cart!', {
          description: (
            <div className="flex items-center gap-3 mt-2">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden relative">
                <Image
                  src={product.imageUrls[0] || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                  {product.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ₺{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ),
          duration: 3000,
          action: {
            label: 'View Cart',
            onClick: () => {
              router.push('/cart')
            },
          },
        })
      }
    } catch (error: unknown) {
      console.log('Add to cart error:', error)
      toast.error('Failed to add item to cart')
    } finally {
      setLocalLoading(false)
    }
  }

  // Don't render button content until client-side hydration is complete
  if (!isClient) {
    return (
      <Button
        disabled={true}
        variant={variant}
        size={size}
        className={cn(
          fullWidth && 'w-full',
          'transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
          className
        )}
      >
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </Button>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isDisabled}
      variant={isInStock ? variant : 'secondary'}
      size={size}
      className={cn(
        fullWidth && 'w-full',
        !isInStock && 'opacity-60 cursor-not-allowed',
        variant === 'default' &&
          isInStock &&
          'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
        'transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      aria-label={
        isInStock ? `Add ${product.name} to cart` : 'Product out of stock'
      }
    >
      {isLoading || localLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : !isInStock ? (
        outOfStockText
      ) : (
        <>
          {showIcon && <ShoppingCart className="w-4 h-4 mr-2" />}
          {text}
        </>
      )}
    </Button>
  )
}
