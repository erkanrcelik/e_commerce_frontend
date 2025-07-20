import type { Metadata } from 'next'

import { ProductListingLayout } from '@/components/product/listing'
import { getProducts } from '@/services/product.service'

export const metadata: Metadata = {
  title: 'Product Search - playableFactory',
  description: 'Find and compare the products you are looking for.',
}

/**
 * Search Page
 * 
 * Global search page with product listing.
 * 
 * Features:
 * - Search functionality
 * - Advanced filtering and sorting
 * - Pagination
 * - Search results display
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const searchQuery = resolvedSearchParams.q || ''
  
  const productsResponse = await getProducts({
    search: searchQuery,
    page: 1,
    limit: 12
  })

  return (
    <ProductListingLayout
      initialProducts={productsResponse.products}
      title={searchQuery ? `Search results for "${searchQuery}"` : 'Product Search'}
      description={searchQuery ? `Products related to "${searchQuery}"` : 'Find and compare the products you are looking for'}
      showCampaigns={true}
      initialSearchQuery={searchQuery}
    />
  )
} 