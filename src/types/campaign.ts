/**
 * Campaign type enumeration
 */
export type CampaignType = 'flash_sale' | 'daily_deal' | 'seasonal' | 'category_discount' | 'free_shipping' | 'bundle_offer'

/**
 * Campaign status enumeration
 */
export type CampaignStatus = 'active' | 'scheduled' | 'expired' | 'paused'

/**
 * Campaign discount type
 */
export type DiscountType = 'percentage' | 'fixed_amount' | 'buy_one_get_one' | 'free_shipping'

/**
 * Campaign interface
 */
export interface Campaign {
  id: string
  title: string
  description: string
  shortDescription?: string
  
  // Campaign details
  type: CampaignType
  status: CampaignStatus
  discountType: DiscountType
  discountValue: number
  
  // Media
  bannerImage?: string
  thumbnailImage?: string
  
  // Targeting
  categoryIds?: string[]
  productIds?: string[]
  minOrderAmount?: number
  maxDiscountAmount?: number
  
  // Usage limits
  usageLimit?: number
  usedCount: number
  userUsageLimit?: number
  
  // Date & Time
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  
  // Display
  priority: number
  showOnHomepage: boolean
  isFeatured: boolean
  backgroundColor?: string
  textColor?: string
  
  // SEO
  slug: string
  metaTitle?: string
  metaDescription?: string
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