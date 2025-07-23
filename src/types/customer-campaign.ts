import type { Category } from './customer-category'
import type { Seller } from './customer-seller'

/**
 * Campaign type enumeration
 */
export type CampaignType = 'platform' | 'seller'

/**
 * Campaign discount type
 */
export type DiscountType = 'percentage' | 'amount'

/**
 * Campaign applicable items structure
 */
export interface CampaignApplicableItems {
  allProducts: boolean
  categories?: Category[]
  products?: string[]
}

/**
 * Campaign interface
 */
export interface Campaign {
  _id: string
  name: string
  description: string
  type: CampaignType
  discountType: DiscountType
  discountValue: number
  startDate: string
  endDate: string
  imageUrl?: string
  minOrderAmount?: number
  isActive: boolean
  applicableItems: CampaignApplicableItems
  seller?: Seller
  remainingDays: number
  isExpired: boolean
  createdAt?: string
}

/**
 * Campaign list response
 */
export interface CampaignListResponse {
  data: Campaign[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Campaign list query parameters
 */
export interface CampaignListParams {
  page?: number
  limit?: number
  type?: CampaignType
  discountType?: DiscountType
  categoryId?: string
  productId?: string
  minDiscount?: number
  maxDiscount?: number
  search?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'discountValue' | 'endDate' | 'name'
  sortOrder?: 'asc' | 'desc'
}

/**
 * Product campaigns response
 */
export interface ProductCampaignsResponse {
  data: Campaign[]
  total: number
}

/**
 * Trending campaigns response
 */
export interface TrendingCampaignsResponse {
  data: Campaign[]
  total: number
}

/**
 * Homepage campaigns response
 */
export interface HomepageCampaigns {
  dailyDeals: Campaign[]
  flashSales: Campaign[]
  featuredOffers: Campaign[]
}

/**
 * Newsletter subscription interface
 */
export interface NewsletterSubscription {
  email: string
  firstName?: string
  preferences?: string[]
}

/**
 * Newsletter response interface
 */
export interface NewsletterResponse {
  success: boolean
  message: string
}
