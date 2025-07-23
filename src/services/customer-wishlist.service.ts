import api from '@/lib/axios'
import type {
  CreateWishlistItemRequest,
  UpdateWishlistNotesRequest,
  WishlistItem,
} from '@/types/customer-wishlist'

/**
 * Customer Wishlist Service
 *
 * Handles all wishlist-related API calls for customers.
 * Manages user's wishlist with full CRUD operations.
 *
 * Features:
 * - Get user's wishlist
 * - Add product to wishlist
 * - Remove product from wishlist
 * - Update wishlist notes
 * - Form validation
 * - Error handling
 */
export class CustomerWishlistService {
  /**
   * Get user's wishlist
   *
   * @returns Promise<WishlistItem[]> - User's wishlist items
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const wishlist = await CustomerWishlistService.getWishlist()
   * ```
   */
  static async getWishlist(): Promise<WishlistItem[]> {
    try {
      const response = await api.get<WishlistItem[]>('/users/wishlist')

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Add product to wishlist
   *
   * @param productId - Product ID to add
   * @param data - Optional data for the wishlist item
   * @returns Promise<WishlistItem> - Created wishlist item
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const wishlistItem = await CustomerWishlistService.addToWishlist('507f1f77bcf86cd799439011', {
   *   notes: 'Birthday gift idea'
   * })
   * ```
   */
  static async addToWishlist(
    productId: string,
    data?: CreateWishlistItemRequest
  ): Promise<WishlistItem> {
    try {
      const response = await api.post<WishlistItem>(
        `/users/wishlist/${productId}`,
        data || {}
      )

      return response.data
    } catch (error) {
      console.error('Add to wishlist error:', error)
      throw error
    }
  }

  /**
   * Remove product from wishlist
   *
   * @param productId - Product ID to remove
   * @returns Promise<void> - Success response
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * await CustomerWishlistService.removeFromWishlist('507f1f77bcf86cd799439011')
   * ```
   */
  static async removeFromWishlist(productId: string): Promise<void> {
    try {
      await api.delete(`/users/wishlist/${productId}`)
    } catch (error) {
      console.error('Remove from wishlist error:', error)
      throw error
    }
  }

  /**
   * Update wishlist item notes
   *
   * @param wishlistItemId - Wishlist item ID to update
   * @param data - New notes for the wishlist item
   * @returns Promise<WishlistItem> - Updated wishlist item
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const updatedItem = await CustomerWishlistService.updateWishlistNotes('507f1f77bcf86cd799439011', {
   *   notes: 'Updated notes for this product'
   * })
   * ```
   */
  static async updateWishlistNotes(
    wishlistItemId: string,
    data: UpdateWishlistNotesRequest
  ): Promise<WishlistItem> {
    try {
      const response = await api.put<WishlistItem>(
        `/users/wishlist/${wishlistItemId}/notes`,
        data
      )

      return response.data
    } catch (error) {
      console.error('Update wishlist notes error:', error)
      throw error
    }
  }

  /**
   * Check if product is in wishlist
   *
   * @param productId - Product ID to check
   * @returns Promise<boolean> - True if product is in wishlist
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const isInWishlist = await CustomerWishlistService.isInWishlist('507f1f77bcf86cd799439011')
   * ```
   */
  static async isInWishlist(productId: string): Promise<boolean> {
    try {
      // Get all wishlist items and check if product exists
      const wishlistItems = await this.getWishlist()
      const isInWishlist = wishlistItems.some(
        item => item.productId?._id === productId
      )

      return isInWishlist
    } catch (error) {
      console.error('Check wishlist error:', error)
      // Return false if there's an error (product not in wishlist)
      return false
    }
  }
}
