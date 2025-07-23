import { useCallback } from 'react'

import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from '@/features/wishlist/wishlistSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

/**
 * Custom hook for wishlist management
 */
export function useWishlist() {
  const dispatch = useAppDispatch()
  const { items: wishlist, isLoading: wishlistLoading } = useAppSelector(
    state => state.wishlist
  )
  const { user } = useAppSelector(state => state.auth)

  /**
   * Load wishlist from API (sadece login olduğunda çağrılmalı)
   */
  const loadWishlist = useCallback(() => {
    if (user) {
      dispatch(fetchWishlist())
    }
  }, [user, dispatch])

  /**
   * Add product to wishlist
   */
  const addToWishlistHandler = async (productId: string) => {
    if (!user) {
      return Promise.reject(new Error('Please login to add items to wishlist'))
    }
    await dispatch(addToWishlist(productId))
  }

  /**
   * Remove product from wishlist
   */
  const removeFromWishlistHandler = async (productId: string) => {
    if (!user) {
      return Promise.reject(
        new Error('Please login to remove items from wishlist')
      )
    }
    await dispatch(removeFromWishlist(productId))
  }

  /**
   * Check if product is in wishlist
   */
  const isInWishlist = (productId: string) => {
    if (!productId || !wishlist || wishlist.length === 0) {
      return false
    }

    const isInWishlist = wishlist.some(item => item.productId._id === productId)

    return isInWishlist
  }

  return {
    wishlist,
    wishlistLoading,
    loadWishlist,
    addToWishlist: addToWishlistHandler,
    removeFromWishlist: removeFromWishlistHandler,
    isInWishlist,
  }
}
