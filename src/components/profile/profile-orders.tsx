'use client'

import { Clock, Package, ShoppingBag, Truck, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CustomerOrderService } from '@/services/customer-order.service'
import type { Order, OrderStatus } from '@/types/customer-order'

/**
 * Profile Orders Component
 *
 * Displays user's order history with filtering and pagination.
 *
 * Features:
 * - List all user orders
 * - Order status filtering
 * - Order details view
 * - Order cancellation
 * - Loading states
 * - Error handling
 * - Responsive design
 *
 * @example
 * ```tsx
 * <ProfileOrders />
 * ```
 */
export function ProfileOrders() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null)

  /**
   * Load orders with current filters
   */
  const loadOrders = async (page: number = 1, status?: string) => {
    try {
      setLoading(true)
      setError(null)

      const params: {
        page: number
        limit: number
        sortBy: string
        sortOrder: 'desc' | 'asc'
        status?: string
      } = {
        page,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }

      if (status) {
        params.status = status
      }

      const response = await CustomerOrderService.getOrders(params)
      setOrders(response.data)
      setTotalPages(response.totalPages)
      setCurrentPage(response.page)
    } catch (error: unknown) {
      console.error('Load orders error:', error)
      setError('Failed to load orders. Please try again.')
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle order cancellation
   */
  const handleCancelOrder = async (orderId: string) => {
    try {
      setCancellingOrder(orderId)
      await CustomerOrderService.cancelOrder(orderId)

      // Update the order status in the list
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId
            ? { ...order, status: 'cancelled' as OrderStatus }
            : order
        )
      )

      toast.success('Order cancelled successfully')
    } catch (error) {
      console.error('Cancel order error:', error)
      toast.error('Failed to cancel order. Please try again.')
    } finally {
      setCancellingOrder(null)
    }
  }

  /**
   * Handle status filter change
   */
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    loadOrders(1, status || undefined)
  }

  /**
   * Handle page change
   */
  const handlePageChange = (page: number) => {
    loadOrders(page, statusFilter || undefined)
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
        return <Clock className="w-4 h-4" />
      case 'processing':
        return <Package className="w-4 h-4" />
      case 'shipped':
        return <Truck className="w-4 h-4" />
      case 'delivered':
        return <ShoppingBag className="w-4 h-4" />
      case 'cancelled':
        return <X className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  /**
   * Check if order can be cancelled
   */
  const canCancelOrder = (status: OrderStatus) => {
    return status === 'pending' || status === 'processing'
  }

  // Load orders on component mount
  useEffect(() => {
    loadOrders()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Orders
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Track your order history and manage your purchases
        </p>
      </div>

      {/* Status Filter */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilterChange('')}
            >
              All Orders
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilterChange('pending')}
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === 'processing' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilterChange('processing')}
            >
              Processing
            </Button>
            <Button
              variant={statusFilter === 'shipped' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilterChange('shipped')}
            >
              Shipped
            </Button>
            <Button
              variant={statusFilter === 'delivered' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilterChange('delivered')}
            >
              Delivered
            </Button>
            <Button
              variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilterChange('cancelled')}
            >
              Cancelled
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {loading ? (
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading orders...</p>
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center text-red-600 dark:text-red-400">
              <X className="w-8 h-8 mx-auto mb-2" />
              <p>{error}</p>
              <Button
                onClick={() => loadOrders()}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : orders.length === 0 ? (
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {statusFilter
                  ? `No orders with status "${statusFilter}"`
                  : 'You haven\'t placed any orders yet'}
              </p>
              <Button onClick={() => router.push('/')}>
                Start Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order._id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <Badge variant="outline">
                          {getStatusBadge(order.status)}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Order #{order._id.slice(-8)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Order Date:</span>
                        <p className="font-medium">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Total:</span>
                        <p className="font-medium">₺{order.totalPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Items:</span>
                        <p className="font-medium">{order.itemCount} items</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/profile/orders/${order._id}`)}
                    >
                      View Details
                    </Button>
                    {canCancelOrder(order.status) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={cancellingOrder === order._id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
                      >
                        {cancellingOrder === order._id ? 'Cancelling...' : 'Cancel Order'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
