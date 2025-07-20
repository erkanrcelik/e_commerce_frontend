'use client'

import { Check, CreditCard, Shield, Truck } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/redux'
import { useToast } from '@/hooks/use-toast'

/**
 * Order review component
 * 
 * Final review page with order details and confirmation
 * 
 * @example
 * ```tsx
 * <OrderReview />
 * ```
 */
export function OrderReview() {
  const { items } = useAppSelector(state => state.cart)
  const { showSuccess, showError } = useToast()

  const handlePlaceOrder = async () => {
    try {
      // Simulate order placement
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showSuccess({
        message: 'Your order has been placed successfully!',
        description: 'Order number: #ORD-2024-001',
        duration: 5000,
      })
    } catch {
      showError({
        message: 'Failed to place order',
        description: 'Please try again',
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Order Items */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Details
        </h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </h4>
                {item.variant && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.variant.size && `Size: ${item.variant.size}`}
                    {item.variant.color && item.variant.size && ' • '}
                    {item.variant.color && `Color: ${item.variant.color}`}
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">
                ₺{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Truck className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Shipping Information
          </h3>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Shipping Address:</strong><br />
            Ahmet Yılmaz<br />
            Atatürk Caddesi No:123<br />
            İstanbul, İstanbul 34000<br />
            Türkiye
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Delivery Time:</strong> 2-4 business days
          </p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment Information
          </h3>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Payment Method:</strong> Visa ****1234
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Expires:</strong> 12/2025
          </p>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Secure Shopping
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              All your transactions are protected with SSL encryption. 
              Your personal information is secure.
            </p>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handlePlaceOrder} 
          className="h-12 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg px-12"
          size="lg"
        >
          <Check className="w-5 h-5 mr-2" />
          Confirm Order
        </Button>
      </div>
    </div>
  )
} 