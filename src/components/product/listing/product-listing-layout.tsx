'use client'

import type { Campaign } from '@/types/customer-campaign'
import type { Category } from '@/types/customer-category'
import type { Product } from '@/types/customer-product'

import { ProductListingPage } from './product-listing-page'

/**
 * Product Listing Layout Props
 */
interface ProductListingLayoutProps {
  /** Initial products to display */
  initialProducts: Product[]
  /** Page title */
  title: string
  /** Page description */
  description: string
  /** Show campaign indicators */
  showCampaigns?: boolean
  /** Initial search query */
  initialSearchQuery?: string
  /** Available categories for filtering */
  categories?: Category[]
  /** Total number of products */
  totalProducts?: number
  /** Total number of pages */
  totalPages?: number
  /** Category campaigns to display */
  campaigns?: Campaign[]
  /** Total number of campaigns */
  totalCampaigns?: number
  /** API filter data */
  filterData?: {
    categories: Category[]
    priceRanges: Array<{
      min: number
      max: number
      label: string
      productCount: number
    }>
    tags: Array<{
      name: string
      count: number
    }>
    sellers: Array<{
      _id: string
      name: string
      productCount: number
    }>
  }
  /** Initial category filter */
  initialCategory?: string
  /** Initial seller filter */
  initialSeller?: string
  /** Initial campaign filter */
  initialCampaign?: string
}

/**
 * Product Listing Layout Component
 *
 * Common layout for all product listing pages (category, campaign, search).
 * Provides consistent structure and functionality across different listing types.
 *
 * Features:
 * - Consistent layout and styling
 * - Search functionality
 * - Filtering and sorting
 * - Pagination
 * - Campaign indicators
 * - Category campaigns display
 * - Responsive design
 *
 * @example
 * ```tsx
 * <ProductListingLayout
 *   initialProducts={products}
 *   title="Electronics"
 *   description="Latest electronic devices"
 *   showCampaigns={true}
 *   campaigns={campaigns}
 *   totalProducts={100}
 *   totalPages={5}
 *   totalCampaigns={3}
 * />
 * ```
 */
export function ProductListingLayout({
  initialProducts,
  title,
  description,
  showCampaigns = true,
  initialSearchQuery = '',
  categories = [],
  totalProducts,
  totalPages,
  campaigns = [],
  totalCampaigns = 0,
  filterData,
  initialCategory,
  initialSeller,
  initialCampaign,
}: ProductListingLayoutProps) {
  return (
    <ProductListingPage
      initialProducts={initialProducts}
      title={title}
      description={description}
      showCampaigns={showCampaigns}
      initialSearchQuery={initialSearchQuery}
      categories={categories}
      totalProducts={totalProducts}
      totalPages={totalPages}
      campaigns={campaigns}
      totalCampaigns={totalCampaigns}
      filterData={filterData}
      initialCategory={initialCategory}
      initialSeller={initialSeller}
      initialCampaign={initialCampaign}
    />
  )
}
