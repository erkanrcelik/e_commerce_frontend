'use client'

import type { Category, Product } from '@/types/product'

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
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <ProductListingLayout
 *   initialProducts={products}
 *   title="Electronics"
 *   description="Latest electronic devices"
 *   showCampaigns={true}
 * />
 * ```
 */
export function ProductListingLayout({
  initialProducts,
  title,
  description,
  showCampaigns = true,
  initialSearchQuery = '',
  categories = []
}: ProductListingLayoutProps) {
  return (
    <ProductListingPage
      initialProducts={initialProducts}
      title={title}
      description={description}
      showCampaigns={showCampaigns}
      initialSearchQuery={initialSearchQuery}
      categories={categories}
    />
  )
} 