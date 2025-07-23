'use client'

import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { clearCartAsync } from '@/features/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useToast } from '@/hooks/use-toast'
import { CustomerCartService } from '@/services/customer-cart.service'

/**
 * Order summary component
 *
 * Displays only price information and totals
 * Used as sidebar during checkout process
 *
 * @example
 * ```tsx
 * <OrderSummary showConfirmButton={true} />
 * ```
 */
interface OrderSummaryProps {
  showConfirmButton?: boolean
}

export function OrderSummary({ showConfirmButton = false }: OrderSummaryProps) {
  const dispatch = useAppDispatch()
  const { items, subtotal, shipping, tax, discount, total } = useAppSelector(
    state => state.cart
  )
  const { showSuccess, showError } = useToast()
  const router = useRouter()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      showError({
        message: 'Cart is empty',
        description: 'Please add items to your cart before placing an order',
      })
      return
    }

    try {
      setIsPlacingOrder(true)

      // Mock checkout data - in real application this would come from forms
      const checkoutData = {
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          postalCode: '10001',
        },
        billingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          postalCode: '10001',
        },
        paymentMethod: {
          type: 'credit_card' as const,
          cardNumber: '****1234',
          cardHolderName: 'John Doe',
          expiryDate: '12/2025',
          cvv: '123',
        },
        notes: 'Please handle with care',
      }

      // Real checkout API call
      const orderResponse = await CustomerCartService.checkout(checkoutData)

      // Clear cart after successful order
      await dispatch(clearCartAsync()).unwrap()

      showSuccess({
        message: 'Order placed successfully!',
        description: `Order number: ${orderResponse.orderId || 'ORD-2024-001'}`,
        duration: 5000,
      })

      // Redirect to profile orders page
      setTimeout(() => {
        router.push('/profile/orders')
      }, 2000)
    } catch (error: unknown) {
      console.error('  Apply coupon error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Please try again'
      showError({
        message: 'Failed to place order',
        description: errorMessage,
      })
    } finally {
      setIsPlacingOrder(false)
    }
  }

  if (items.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl rounded-2xl">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Browse our products to start shopping
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl rounded-2xl sticky top-8">
      <CardHeader className="pb-4 pt-6 px-6">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <ShoppingBag className="w-6 h-6 text-purple-500" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-6 pb-6">
        {/* Items Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {items.length} items •{' '}
          {items.reduce((sum, item) => sum + item.quantity, 0)} pieces
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span
              className={shipping === 0 ? 'text-green-600 font-medium' : ''}
            >
              {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Tax (8.5%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
              <span>Total</span>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Free Shipping Notice */}
        {shipping === 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                Free shipping
              </span>
            </div>
          </div>
        )}

        {/* Confirm Order Button */}
        {showConfirmButton && (
          <Button
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder || items.length === 0}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
            size="lg"
          >
            {isPlacingOrder ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Placing Order...
              </>
            ) : (
              'Confirm Order'
            )}
          </Button>
        )}

        {/* Terms */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By placing your order, you agree to our{' '}
          <a
            href="/terms"
            className="underline hover:text-purple-600 dark:hover:text-purple-400"
          >
            terms of service
          </a>{' '}
          and privacy policy.
        </p>
      </CardContent>
    </Card>
  )
}
