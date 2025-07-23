/**
 * Cart item interface
 */
export interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
  description?: string
  imageUrls?: string[]
  category?: {
    _id: string
    name: string
  }
  sellerId: string
  sellerName: string
  stock?: number
  hasDiscount?: boolean
  discountPercentage?: number
}

/**
 * Applied campaign interface
 */
export interface AppliedCampaign {
  campaignId: string
  campaignName: string
  discountAmount: number
  discountType: 'percentage' | 'fixed'
}

/**
 * Cart response interface
 */
export interface CartResponse {
  userId: string
  items: CartItem[]
  subtotal: number
  totalDiscount: number
  total: number
  appliedCampaigns: AppliedCampaign[]
}

/**
 * Checkout address interface
 */
export interface CheckoutAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

/**
 * Payment method interface
 */
export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'paypal'
  cardNumber?: string
  cardHolderName?: string
  expiryDate?: string
  cvv?: string
}

/**
 * Checkout request interface
 */
export interface CheckoutRequest {
  shippingAddress: CheckoutAddress
  billingAddress: CheckoutAddress
  paymentMethod: PaymentMethod
  notes?: string
}

/**
 * Checkout response interface
 */
export interface CheckoutResponse {
  message: string
  orderId: string
  transactionId: string
  total: number
  order: {
    _id: string
    userId: string
    items: CartItem[]
    shippingAddress: CheckoutAddress
    billingAddress: CheckoutAddress
    paymentStatus: 'paid' | 'pending' | 'failed'
    orderStatus:
      | 'pending'
      | 'processing'
      | 'shipped'
      | 'delivered'
      | 'cancelled'
    subtotal: number
    totalDiscount: number
    total: number
    appliedCampaigns: AppliedCampaign[]
    createdAt: string
  }
}
