import api from '@/lib/axios'
import type {
  OrderDetails,
  OrderListResponse,
  OrderTracking,
} from '@/types/customer-order'

/**
 * Customer Order Service
 *
 * Handles all order-related API calls for customers.
 * Manages order listing, details, tracking, and cancellation.
 *
 * Features:
 * - Get user orders with pagination and filtering
 * - Get order details
 * - Get order tracking information
 * - Cancel orders
 * - Form validation
 * - Error handling
 */
export class CustomerOrderService {
  /**
   * Get user's orders with pagination and filtering
   *
   * @param params - Query parameters for filtering and pagination
   * @returns Promise<OrderListResponse> - Orders with pagination info
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const orders = await CustomerOrderService.getOrders({
   *   page: 1,
   *   limit: 10,
   *   status: 'pending'
   * })
   * ```
   */
  static async getOrders(params?: {
    page?: number
    limit?: number
    status?: string
    startDate?: string
    endDate?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }): Promise<OrderListResponse> {
    try {
      const response = await api.get<OrderListResponse>('/orders', { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get order details by ID
   *
   * @param orderId - Order ID to get details for
   * @returns Promise<OrderDetails> - Order details
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const orderDetails = await CustomerOrderService.getOrderDetails('507f1f77bcf86cd799439011')
   * ```
   */
  static async getOrderDetails(orderId: string): Promise<OrderDetails> {
    try {
      const response = await api.get<OrderDetails>(`/orders/${orderId}`)

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get order tracking information
   *
   * @param orderId - Order ID to get tracking for
   * @returns Promise<OrderTracking> - Order tracking information
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const tracking = await CustomerOrderService.getOrderTracking('507f1f77bcf86cd799439011')
   * ```
   */
  static async getOrderTracking(orderId: string): Promise<OrderTracking> {
    try {
      const response = await api.get<OrderTracking>(
        `/orders/${orderId}/tracking`
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Cancel order
   *
   * @param orderId - Order ID to cancel
   * @returns Promise<OrderDetails> - Cancelled order details
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const cancelledOrder = await CustomerOrderService.cancelOrder('507f1f77bcf86cd799439011')
   * ```
   */
  static async cancelOrder(orderId: string): Promise<OrderDetails> {
    try {
      const response = await api.put<OrderDetails>(`/orders/${orderId}/cancel`)

      return response.data
    } catch (error) {
      throw error
    }
  }
}
