'use client'

import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@/hooks/use-cart'

/**
 * Shopping Cart Menu Component
 *
 * Displays cart icon with item count badge and provides mini cart functionality.
 * Shows the current number of items in the shopping cart with a slide-out mini cart.
 *
 * Features:
 * - Real-time cart state from Redux
 * - Quantity controls
 * - Remove items
 * - Loading states
 * - Error handling
 * - Authentication check
 *
 * @example
 * ```tsx
 * <ShoppingCartMenu />
 * ```
 */
export function ShoppingCartMenu() {
  const {
    items,
    total,
    subtotal,
    totalDiscount,
    isLoading,
    error,
    isEmpty,
    getTotalItems,
    updateQuantity,
    removeFromCart,
  } = useCart()

  const [isOpen, setIsOpen] = useState(false)
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  /**
   * Handle quantity update
   */
  const handleQuantityUpdate = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return

    setUpdatingItems(prev => new Set(prev).add(productId))

    try {
      await updateQuantity(productId, newQuantity)
      toast.success('Cart updated successfully')
    } catch (error: unknown) {
      console.log('Update cart error:', error)
      toast.error('Failed to update cart')
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
    }
  }

  /**
   * Handle item removal
   */
  const handleRemoveItem = async (productId: string) => {
    setUpdatingItems(prev => new Set(prev).add(productId))

    try {
      await removeFromCart(productId)
      toast.success('Item removed from cart')
    } catch (error: unknown) {
      console.log('Remove from cart error:', error)
      toast.error('Failed to remove item from cart')
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(productId)
        return newSet
      })
    }
  }

  const cartItemsCount = getTotalItems()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-12 px-4 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-xl"
          aria-label={`Shopping cart with ${cartItemsCount} items`}
          disabled={isLoading}
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-purple-600 to-blue-600">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </Badge>
            )}
          </div>
          <span className="ml-2 hidden sm:inline font-medium">
            Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 p-6">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({cartItemsCount})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {isLoading ? (
            /* Loading State */
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            /* Error State */
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Error loading cart
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {error}
                </p>
              </div>
            </div>
          ) : isEmpty ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Your cart is empty
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Start shopping to add items to your cart
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            /* Cart Items */
            <>
              {/* Cart Items - Fixed height with scroll */}
              <div className="flex-1 overflow-y-auto pr-2 max-h-96">
                <div className="space-y-3">
                  {items.map(item => {
                    const isUpdating = updatingItems.has(item.productId)

                    return (
                      <div
                        key={item.productId}
                        className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      >
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden relative">
                          <Image
                            src={item.imageUrls?.[0] || '/placeholder-product.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement
                              target.src = '/placeholder-product.jpg'
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ${item.price.toFixed(2)} each
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-6 h-6 p-0"
                              onClick={() =>
                                handleQuantityUpdate(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              disabled={isUpdating || item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {isUpdating ? '...' : item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-6 h-6 p-0"
                              onClick={() =>
                                handleQuantityUpdate(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              disabled={isUpdating}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="font-semibold text-purple-600 dark:text-purple-400 mt-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                          aria-label="Remove item"
                          onClick={() => handleRemoveItem(item.productId)}
                          disabled={isUpdating}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Cart Summary - Compact and fixed at bottom */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-10 rounded-lg text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/cart">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Go to Cart
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
