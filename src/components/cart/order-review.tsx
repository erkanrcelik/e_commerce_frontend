'use client'

import { CreditCard, Shield, Truck } from 'lucide-react'
import Image from 'next/image'

import { useAppSelector } from '@/hooks/redux'

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

  return (
    <div className="space-y-8">
      {/* Order Items */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Details
        </h3>
        <div className="space-y-4">
          {items.map(item => (
            <div
              key={item.productId}
              className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden relative">
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
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Seller: {item.sellerName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
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
            <strong>Shipping Address:</strong>
            <br />
            Ahmet Yılmaz
            <br />
            Atatürk Caddesi No:123
            <br />
            İstanbul, İstanbul 34000
            <br />
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
              All your transactions are protected with SSL encryption. Your
              personal information is secure.
            </p>
          </div>
        </div>
      </div>

      {/* Order confirmation is handled by OrderSummary component */}
    </div>
  )
}
