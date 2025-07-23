import type { BaseListParams } from './api'

/**
 * Seller types based on API documentation
 */

/**
 * Seller address information
 */
export interface SellerAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

/**
 * Seller data structure from public API documentation
 */
export interface Seller {
  /** Seller ID from API */
  id: string
  /** Store name */
  storeName: string
  /** Store description */
  description: string
  /** Store logo URL */
  logoUrl?: string
  /** Contact phone number */
  phoneNumber?: string
  /** Store website URL */
  website?: string
  /** Store address information */
  address?: SellerAddress
  /** Business hours for each day */
  businessHours?: {
    [key: string]: {
      open: string | null
      close: string | null
      closed: boolean
    }
  }
  /** Social media links */
  socialMedia?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  /** Seller's full name */
  sellerName: string
  /** Seller's email address */
  email?: string
  /** Average rating (for backward compatibility) */
  averageRating?: number
  /** Review count (for backward compatibility) */
  reviewCount?: number
  /** Product count (for backward compatibility) */
  productCount?: number
  /** Verification status (for backward compatibility) */
  isVerified?: boolean
  /** Active status (for backward compatibility) */
  isActive?: boolean
  /** Creation date (for backward compatibility) */
  createdAt?: string
}

/**
 * Seller products query parameters
 */
export interface SellerProductsParams extends BaseListParams {
  sellerId: string
}

/**
 * Seller campaigns query parameters
 */
export interface SellerCampaignsParams extends BaseListParams {
  sellerId: string
}
