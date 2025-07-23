import { useEffect } from 'react'

import {
  addItemToCart,
  clearCartAsync,
  fetchCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from '@/features/cart/cartSlice'

import { useAppDispatch, useAppSelector } from './redux'

/**
 * Custom hook for cart operations
 *
 * Provides cart state and operations with automatic loading states
 * and error handling.
 *
 * @example
 * ```tsx
 * const {
 *   cart,
 *   isLoading,
 *   error,
 *   addToCart,
 *   updateQuantity,
 *   removeFromCart,
 *   clearCart
 * } = useCart()
 * ```
 */
export function useCart() {
  const dispatch = useAppDispatch()
  const {
    items,
    total,
    subtotal,
    totalDiscount,
    appliedCampaigns,
    isLoading,
    error,
  } = useAppSelector(state => state.cart)
  const { user } = useAppSelector(state => state.auth)

  /**
   * Fetch cart on mount if user is authenticated
   */
  useEffect(() => {
    if (user) {
      dispatch(fetchCart())
    }
  }, [dispatch, user])

  /**
   * Add item to cart
   */
  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      throw new Error('User must be authenticated to add items to cart')
    }
    return await dispatch(addItemToCart({ productId, quantity })).unwrap()
  }

  /**
   * Update cart item quantity
   */
  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) {
      throw new Error('User must be authenticated to update cart')
    }
    return await dispatch(
      updateCartItemQuantity({ productId, quantity })
    ).unwrap()
  }

  /**
   * Remove item from cart
   */
  const removeFromCart = async (productId: string) => {
    if (!user) {
      throw new Error('User must be authenticated to remove items from cart')
    }
    return await dispatch(removeItemFromCart(productId)).unwrap()
  }

  /**
   * Clear entire cart
   */
  const clearCart = async () => {
    if (!user) {
      throw new Error('User must be authenticated to clear cart')
    }
    return await dispatch(clearCartAsync()).unwrap()
  }

  /**
   * Get cart item by product ID
   */
  const getCartItem = (productId: string) => {
    return items.find(item => item.productId === productId)
  }

  /**
   * Get total number of items in cart
   */
  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  /**
   * Check if cart is empty
   */
  const isEmpty = items.length === 0

  return {
    // State
    items,
    total,
    subtotal,
    totalDiscount,
    appliedCampaigns,
    isLoading,
    error,
    isEmpty,

    // Computed
    getCartItem,
    getTotalItems,

    // Actions
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,

    // User state
    isAuthenticated: !!user,
  }
}
