'use client'

import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/product'

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
 * Reusable add to cart button with loading states and error handling.
 * Used across product cards, product pages, and quick view modals.
 * 
 * Features:
 * - Loading animation during API calls
 * - Automatic stock checking
 * - Toast notifications
 * - Customizable appearance
 * - Accessible design
 * - Error handling
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
  const [isLoading, setIsLoading] = useState(false)
  
  // Check if product is in stock
  const isInStock = product.isInStock && product.stock > 0
  const isDisabled = disabled || !isInStock

  /**
   * Handle add to cart action
   */
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isDisabled || isLoading) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (onAddToCart) {
        onAddToCart(product)
      } else {
        // Default behavior - show enhanced toast
        toast.success('Added to Cart!', {
          description: (
            <div className="flex items-center gap-3 mt-2">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden relative">
                <Image 
                  src={product.images[0]?.url || '/placeholder-product.jpg'} 
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
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ),
          duration: 3000,
          action: {
            label: 'View Cart',
            onClick: () => {
              // TODO: Navigate to cart page
            }
          }
        })
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      toast.error('Failed to add to cart', {
        description: 'Please try again later.',
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isDisabled || isLoading}
      variant={isInStock ? variant : 'secondary'}
      size={size}
      className={cn(
        fullWidth && 'w-full',
        !isInStock && 'opacity-60 cursor-not-allowed',
        variant === 'default' && isInStock && 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
        'transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      aria-label={isInStock ? `Add ${product.name} to cart` : 'Product out of stock'}
    >
      {isLoading ? (
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