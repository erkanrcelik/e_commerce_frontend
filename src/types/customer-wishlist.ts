import type { Product } from './customer-product'

/**
 * Wishlist item interface
 */
export interface WishlistItem {
  /** Wishlist item ID */
  _id: string
  /** Product information - API returns productId object */
  productId: Product
  /** User notes for this item */
  notes?: string
  /** Date when item was added to wishlist */
  addedAt: string
}

/**
 * Create wishlist item request interface
 */
export interface CreateWishlistItemRequest {
  /** User notes for this item */
  notes?: string
}

/**
 * Update wishlist notes request interface
 */
export interface UpdateWishlistNotesRequest {
  /** User notes for this item */
  notes: string
}
