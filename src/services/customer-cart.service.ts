import api from '@/lib/axios'
import type { CartResponse } from '@/types/customer-cart'

/**
 * Customer Cart Service
 *
 * Handles all cart-related API calls for customers.
 * Uses the cart API endpoints with authentication.
 */
export class CustomerCartService {
  /**
   * Get cart screen data with recommendations
   *
   * @param params - Query parameters for cart screen
   * @returns Promise<CartScreenData> - Cart screen data with recommendations
   *
   * @example
   * ```typescript
   * const cartScreen = await CustomerCartService.getCartScreen({ limit: 6 })
   * ```
   */
  static async getCartScreen(params?: {
    limit?: number
  }): Promise<{
    cart: CartResponse
    recommendations: {
      frequentlyBoughtTogether: any[]
      personalized: any[]
      popular: any[]
    }
  }> {
    try {
      const response = await api.get('/cart/screen', { params })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Add product to cart
   *
   * @param productId - Product ID to add
   * @param quantity - Quantity to add
   * @returns Promise<CartResponse> - Updated cart data
   *
   * @example
   * ```typescript
   * const cart = await CustomerCartService.addToCart('68803a86952fa1d828dbcafe', 2)
   * ```
   */
  static async addToCart(
    productId: string,
    quantity: number
  ): Promise<CartResponse> {
    try {
      const response = await api.post<CartResponse>('/cart/add', {
        productId,
        quantity,
      })

      return response.data
    } catch (error: unknown) {
      console.error('  Apply coupon error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to apply coupon'
      throw new Error(errorMessage)
    }
  }

  /**
   * Get current cart
   *
   * @returns Promise<CartResponse> - Current cart data
   *
   * @example
   * ```typescript
   * const cart = await CustomerCartService.getCart()
   * ```
   */
  static async getCart(): Promise<CartResponse> {
    try {
      const response = await api.get<CartResponse>('/cart')

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Update cart item quantity
   *
   * @param productId - Product ID to update
   * @param quantity - New quantity
   * @returns Promise<CartResponse> - Updated cart data
   *
   * @example
   * ```typescript
   * const cart = await CustomerCartService.updateCartItem('68803a86952fa1d828dbcafe', 3)
   * ```
   */
  static async updateCartItem(
    productId: string,
    quantity: number
  ): Promise<CartResponse> {
    try {
      const response = await api.put<CartResponse>(`/cart/items/${productId}`, {
        quantity,
      })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Remove item from cart
   *
   * @param productId - Product ID to remove
   * @returns Promise<CartResponse> - Updated cart data
   *
   * @example
   * ```typescript
   * const cart = await CustomerCartService.removeFromCart('68803a86952fa1d828dbcafe')
   * ```
   */
  static async removeFromCart(productId: string): Promise<CartResponse> {
    try {
      const response = await api.delete<CartResponse>(
        `/cart/items/${productId}`
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Clear entire cart
   *
   * @returns Promise<{ message: string }> - Success message
   *
   * @example
   * ```typescript
   * await CustomerCartService.clearCart()
   * ```
   */
  static async clearCart(): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>('/cart')

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Checkout cart
   *
   * @param checkoutData - Checkout information
   * @returns Promise<any> - Order creation response
   *
   * @example
   * ```typescript
   * const order = await CustomerCartService.checkout({
   *   shippingAddress: { ... },
   *   billingAddress: { ... },
   *   paymentMethod: { ... }
   * })
   * ```
   */
  static async checkout(checkoutData: {
    shippingAddress: {
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
    billingAddress: {
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
    paymentMethod: {
      type: 'credit_card' | 'debit_card' | 'paypal'
      cardNumber?: string
      cardHolderName?: string
      expiryDate?: string
      cvv?: string
    }
    notes?: string
  }): Promise<any> {
    try {
      const response = await api.post('/cart/checkout', checkoutData)

      return response.data
    } catch (error) {
      throw error
    }
  }
}

// Export individual functions for easier imports
export const getCartScreen = CustomerCartService.getCartScreen
export const addToCart = CustomerCartService.addToCart
export const getCart = CustomerCartService.getCart
export const updateCartItem = CustomerCartService.updateCartItem
export const removeFromCart = CustomerCartService.removeFromCart
export const clearCart = CustomerCartService.clearCart
export const checkout = CustomerCartService.checkout
