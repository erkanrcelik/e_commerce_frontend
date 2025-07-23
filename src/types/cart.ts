/**
 * Cart item structure
 */
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: {
    size?: string
    color?: string
  }
  maxQuantity?: number
}

/**
 * Cart state interface
 */
export interface CartState {
  items: CartItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  discount: number
  discountCode?: string
}

/**
 * Address information
 */
export interface Address {
  id: string
  type: 'billing' | 'shipping'
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

/**
 * Payment method information
 */
export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay'
  cardNumber?: string
  cardBrand?: string
  expiryMonth?: string
  expiryYear?: string
  isDefault: boolean
}

/**
 * Checkout step types
 */
export type CheckoutStep = 'cart' | 'billing' | 'payment' | 'review'

/**
 * Checkout state interface
 */
export interface CheckoutState {
  currentStep: CheckoutStep
  cart: CartState
  billingAddress?: Address
  shippingAddress?: Address
  paymentMethod?: PaymentMethod
  isSameAsBilling: boolean
}

/**
 * Order summary interface
 */
export interface OrderSummary {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  itemsCount: number
}
