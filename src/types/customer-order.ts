import type { BaseListParams, DateRangeParams } from './api'
import type { PaymentMethod } from './customer-cart'

/**
 * Order status enum
 */
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

/**
 * Payment status enum
 */
export enum PaymentStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  PENDING = 'pending',
}

/**
 * Order item interface
 */
export interface OrderItem {
  /** Product ID */
  productId: string
  /** Product name */
  productName: string
  /** Product image URL */
  productImage: string
  /** Seller ID */
  sellerId: string
  /** Seller name */
  sellerName: string
  /** Quantity ordered */
  quantity: number
  /** Unit price */
  price: number
  /** Subtotal for this item */
  subtotal: number
}

/**
 * Shipping address interface
 */
export interface ShippingAddress {
  /** Street address */
  street: string
  /** City */
  city: string
  /** State/Province */
  state: string
  /** Country */
  country: string
  /** Postal code */
  postalCode: string
}

/**
 * Order interface (for list items)
 */
export interface Order {
  /** Order ID */
  _id: string
  /** Order status */
  status: OrderStatus
  /** Total price */
  totalPrice: number
  /** Payment status */
  paymentStatus: PaymentStatus
  /** Number of items in order */
  itemCount: number
  /** Order date */
  orderDate: string
  /** Estimated delivery date */
  estimatedDelivery: string
}

/**
 * Order details interface (for detailed view)
 */
export interface OrderDetails extends Order {
  /** Order items */
  items: OrderItem[]
  /** Shipping address */
  shippingAddress: ShippingAddress
  /** Tracking number */
  trackingNumber?: string
  /** Customer notes */
  notes?: string
  /** Seller notes */
  sellerNotes?: string
}

/**
 * Tracking history item interface
 */
export interface TrackingHistoryItem {
  /** Status at this point */
  status: OrderStatus
  /** Timestamp */
  timestamp: string | null
  /** Description */
  description: string
  /** Whether this step is completed */
  completed: boolean
}

/**
 * Order tracking interface
 */
export interface OrderTracking {
  /** Order ID */
  orderId: string
  /** Current status */
  status: OrderStatus
  /** Tracking number */
  trackingNumber: string
  /** Estimated delivery date */
  estimatedDelivery: string
  /** Current location */
  currentLocation: string
  /** Tracking history */
  trackingHistory: TrackingHistoryItem[]
}

/**
 * Order list response interface
 */
export interface OrderListResponse {
  /** Orders data */
  data: Order[]
  /** Total number of orders */
  total: number
  /** Current page */
  page: number
  /** Items per page */
  limit: number
  /** Total pages */
  totalPages: number
}

/**
 * Order cancellation request
 */
export interface OrderCancellationRequest {
  reason: string
}

/**
 * Order cancellation response
 */
export interface OrderCancellationResponse {
  message: string
  orderId: string
  refundAmount?: number
  refundStatus?: 'processing' | 'completed' | 'failed'
}

/**
 * Checkout request
 */
export interface CheckoutRequest {
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  cardNumber?: string
  expiryMonth?: string
  expiryYear?: string
  cvv?: string
  cardholderName?: string
  notes?: string
}

/**
 * Checkout response
 */
export interface CheckoutResponse {
  message: string
  orderId: string
  transactionId: string
  total: number
}

/**
 * Order list query parameters
 */
export interface OrderListParams extends BaseListParams, DateRangeParams {
  status?: OrderStatus
}
