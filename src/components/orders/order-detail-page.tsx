'use client'

import { ArrowLeft, Clock, MapPin, Package, Truck, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CustomerOrderService } from '@/services/customer-order.service'
import type {
  OrderDetails,
  OrderStatus
} from '@/types/customer-order'

/**
 * Order Detail Page Props
 */
interface OrderDetailPageProps {
  /** Order ID to display */
  orderId: string
}

/**
 * Order Detail Page Component
 *
 * Displays comprehensive order information including items, tracking, and status.
 *
 * Features:
 * - Order details with items
 * - Order tracking information
 * - Order status updates
 * - Order cancellation
 * - Loading states
 * - Error handling
 * - Responsive design
 *
 * @example
 * ```tsx
 * <OrderDetailPage orderId="507f1f77bcf86cd799439011" />
 * ```
 */
export function OrderDetailPage({ orderId }: OrderDetailPageProps) {
  const router = useRouter()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState(false)

  /**
   * Load order data
   */
  const loadOrderData = useCallback(async () => {
    if (!orderId) return

    try {
      setLoading(true)
      const order = await CustomerOrderService.getOrderDetails(orderId)
      setOrder(order)
    } catch (error: unknown) {
      console.error('  Load order error:', error)
      setError('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }, [orderId])

  /**
   * Handle order cancellation
   */
  const handleCancelOrder = async () => {
    if (!order) return

    try {
      setCancelling(true)
      await CustomerOrderService.cancelOrder(orderId)

      // Update order status
      setOrder(prev =>
        prev ? { ...prev, status: 'cancelled' as OrderStatus } : null
      )

      toast.success('Order cancelled successfully')
    } catch (error) {
      console.error('Load order data error:', error)
      toast.error('Failed to cancel order. Please try again.')
    } finally {
      setCancelling(false)
    }
  }

  /**
   * Get status badge color
   */
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
          >
            Pending
          </Badge>
        )
      case 'processing':
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          >
            Processing
          </Badge>
        )
      case 'shipped':
        return (
          <Badge
            variant="secondary"
            className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
          >
            Shipped
          </Badge>
        )
      case 'delivered':
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          >
            Delivered
          </Badge>
        )
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  /**
   * Get status icon
   */
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />
      case 'processing':
        return <Package className="w-5 h-5" />
      case 'shipped':
        return <Truck className="w-5 h-5" />
      case 'delivered':
        return <Package className="w-5 h-5" />
      case 'cancelled':
        return <X className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  /**
   * Check if order can be cancelled
   */
  const canCancelOrder = (status: OrderStatus) => {
    return status === 'pending' || status === 'processing'
  }

  // Load order data on component mount
  useEffect(() => {
    if (orderId) {
      void loadOrderData()
    }
  }, [orderId, loadOrderData])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-red-600 mb-4">
                <X className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading Order
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error || 'Order not found'}
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => loadOrderData()} variant="outline">
                  Try Again
                </Button>
                <Button onClick={() => router.back()} variant="outline">
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Placed on{' '}
              {new Date(order.orderDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader className="pb-4 px-6 pt-6">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {order.status === 'pending' &&
                        'Your order has been received and is being processed'}
                      {order.status === 'processing' &&
                        'Your order is being prepared for shipment'}
                      {order.status === 'shipped' &&
                        'Your order has been shipped and is on its way'}
                      {order.status === 'delivered' &&
                        'Your order has been delivered'}
                      {order.status === 'cancelled' &&
                        'Your order has been cancelled'}
                    </span>
                  </div>
                  {canCancelOrder(order.status) && (
                    <Button
                      variant="outline"
                      onClick={handleCancelOrder}
                      disabled={cancelling}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30 shrink-0"
                    >
                      {cancelling ? (
                        <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-600 rounded-full animate-spin" />
                      ) : (
                        'Cancel Order'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader className="pb-4 px-6 pt-6">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <Package className="w-5 h-5 text-purple-500" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden relative">
                        <Image
                          src={item.productImage || '/placeholder-product.jpg'}
                          alt={item.productName}
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
                          {item.productName}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader className="pb-4 px-6 pt-6">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-6 pb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Items
                    </span>
                    <span className="font-medium">{order.itemCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Amount
                    </span>
                    <span className="font-bold text-lg">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Payment Status
                    </span>
                    <Badge
                      variant={
                        order.paymentStatus === 'paid'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Estimated Delivery
                    </span>
                    <span className="font-medium">
                      {new Date(order.estimatedDelivery).toLocaleDateString(
                        'en-US'
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader className="pb-4 px-6 pt-6">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-6 pb-6">
                <div className="space-y-2">
                  <p className="text-gray-900 dark:text-white">
                    {order.shippingAddress.street}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {order.shippingAddress.country}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {(order.notes || order.sellerNotes) && (
              <Card>
                <CardHeader className="pb-4 px-6 pt-6">
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-6 pb-6">
                  <div className="space-y-3">
                    {order.notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Your Notes
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.notes}
                        </p>
                      </div>
                    )}
                    {order.sellerNotes && (
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          Seller Notes
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.sellerNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
