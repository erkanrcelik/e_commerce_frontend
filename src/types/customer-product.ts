import type { BaseListParams, PriceRangeParams } from './api'
import type { Category } from './customer-category'

/**
 * Product variant interface
 */
export interface ProductVariant {
  name: string
  price: number
  stock: number
}

/**
 * Product specifications interface
 */
export interface ProductSpecifications {
  [key: string]: string
}

/**
 * Seller information in product
 */
export interface ProductSeller {
  _id: string
  firstName: string
  lastName: string
}

/**
 * Product interface based on API documentation
 */
export interface Product {
  _id: string
  name: string
  description: string
  price: number
  discountedPrice?: number
  imageUrls: string[]
  averageRating: number
  reviewCount: number
  stock: number
  variants?: ProductVariant[]
  specifications?: ProductSpecifications
  category: Category
  seller?: ProductSeller // Optional for backward compatibility
  sellerId?: ProductSeller // New field from API
  isFeatured: boolean
  hasDiscount: boolean
  discountPercentage?: number
  tags?: string[]
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Product list query parameters for the new products API
 */
export interface ProductListParams extends BaseListParams, PriceRangeParams {
  /** Search term for product name, description, or tags */
  search?: string
  /** Category ID filter */
  category?: string
  /** Seller ID filter */
  seller?: string
  /** Comma-separated tags filter */
  tags?: string
  /** Filter products with discount */
  hasDiscount?: boolean
  /** Filter products in stock */
  inStock?: boolean
  /** Filter featured products */
  isFeatured?: boolean
  /** Sort by field */
  sortBy?:
    | 'name'
    | 'price'
    | 'createdAt'
    | 'updatedAt'
    | 'averageRating'
    | 'reviewCount'
  /** Sort order */
  sortOrder?: 'asc' | 'desc'
}
