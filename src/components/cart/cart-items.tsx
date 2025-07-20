'use client'

import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { removeFromCart, updateQuantity } from '@/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

/**
 * Cart items component
 * 
 * Displays cart items with quantity controls and remove functionality
 * 
 * @example
 * ```tsx
 * <CartItems />
 * ```
 */
export function CartItems() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.cart)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Your cart is empty
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Browse our products and add items to your cart to start shopping
        </p>
        <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          My Cart ({items.length} items)
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => items.forEach(item => dispatch(removeFromCart(item.id)))}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-cover rounded-lg shadow-sm"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {item.name}
                </h4>
                {item.variant && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {item.variant.size && `Size: ${item.variant.size}`}
                    {item.variant.color && item.variant.size && ' • '}
                    {item.variant.color && `Color: ${item.variant.color}`}
                  </p>
                )}
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  ₺{item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-10 h-10 p-0 rounded-full"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                
                <span className="w-16 text-center text-lg font-semibold text-gray-900 dark:text-white">
                  {item.quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                  className="w-10 h-10 p-0 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  ₺{(item.price * item.quantity).toFixed(2)}
                </p>
                {item.quantity > 1 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Unit: ₺{item.price.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full w-10 h-10 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cart Summary
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {items.length} items
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Total Items</span>
            <span className="font-medium">
              {items.reduce((sum, item) => sum + item.quantity, 0)} pieces
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-bold text-lg">
              ₺{items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 