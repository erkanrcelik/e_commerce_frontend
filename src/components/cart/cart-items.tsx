'use client'

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  clearCartAsync,
  removeItemFromCart,
  updateCartItemQuantity,
} from '@/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

/**
 * Cart items component props
 */
interface CartItemsProps {
  /** Recommendations data from SSR */
  recommendations?: {
    frequentlyBoughtTogether: any[]
    personalized: any[]
    popular: any[]
  }
}

/**
 * Cart items component
 *
 * Displays cart items with quantity controls and remove functionality.
 * Focuses on cart management without address selection.
 *
 * @example
 * ```tsx
 * <CartItems recommendations={recommendations} />
 * ```
 */
export function CartItems({ recommendations }: CartItemsProps) {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.cart)
  const [isClient, setIsClient] = useState(false)

  // Set client flag on mount to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      await dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
        })
      ).unwrap()
    } catch (error) {
      console.log('Update cart error:', error)
      toast.error('Failed to update quantity')
    }
  }

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItemFromCart(productId))
  }

  const handleClearCart = () => {
    dispatch(clearCartAsync())
  }

  if (!isClient) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add some products to your cart to get started
        </p>
        <Button asChild>
          <a href="/products">Continue Shopping</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Cart Items ({items.length})
        </h3>
        <Button
          variant="outline"
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map(item => (
          <Card key={item.productId} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Product Image */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.imageUrls?.[0] || '/placeholder-product.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-product.jpg'
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Seller: {item.sellerName || 'Unknown'}
                  </p>
                  <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    ₺{item.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity + 1)
                    }
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Remove Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveItem(item.productId)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
