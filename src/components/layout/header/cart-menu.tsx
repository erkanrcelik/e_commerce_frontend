'use client'

import { ArrowRight, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

/**
 * Shopping Cart Menu Component
 * 
 * Displays cart icon with item count badge and provides mini cart functionality.
 * Shows the current number of items in the shopping cart with a slide-out mini cart.
 * 
 * @example
 * ```tsx
 * <ShoppingCartMenu />
 * ```
 */
export function ShoppingCartMenu() {
  // TODO: Replace with actual cart state from Redux store
  const cartItemsCount = 3
  const [isOpen, setIsOpen] = useState(false)

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      quantity: 1,
      image: "/placeholder-product.jpg"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      quantity: 1,
      image: "/placeholder-product.jpg"
    }
  ]

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-12 px-4 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-xl"
          aria-label={`Shopping cart with ${cartItemsCount} items`}
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
        
        <div className="flex flex-col h-full space-y-6">
          {cartItems.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="flex-1 space-y-4 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-semibold text-purple-600 dark:text-purple-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-12 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/cart">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Go to Cart
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Your cart is empty</h3>
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
                <Link href="/products">
                  Start Shopping
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 