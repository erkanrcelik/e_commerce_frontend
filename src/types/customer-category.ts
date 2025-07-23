import type { BaseListParams } from './api'

/**
 * Category data structure from API documentation
 */
export interface Category {
  _id: string
  name: string
  description?: string
  image?: string
  imageUrl?: string
  isActive: boolean
  productCount: number
  createdAt?: string
  updatedAt?: string
  __v?: number
}

/**
 * Category list parameters for API calls
 */
export interface CategoryListParams extends BaseListParams {
  isActive?: boolean
  search?: string
}
