import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { ProductListingLayout } from '@/components/product/listing'
import { CustomerProductService } from '@/services/customer-product.service'

export const metadata: Metadata = {
  title: 'Search - playableFactory',
  description: 'Find products, categories, sellers, and campaigns.',
}

/**
 * Search Page
 *
 * Global search page that displays product results using unified products API.
 * Redirects to all products page when search query is empty.
 *
 * Features:
 * - Unified products API integration
 * - Advanced search functionality
 * - Filter and sort capabilities
 * - Responsive design
 * - Redirect to all products when no search query
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const searchQuery = resolvedSearchParams.q || ''

  // If search query is empty or only whitespace, redirect to all products page
  if (!searchQuery.trim()) {
    redirect('/products')
  }

  let productsResponse = null
  let filterData = null

  try {
    // Get product search results using the unified products API
    productsResponse = await CustomerProductService.searchProducts(
      searchQuery,
      {
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }
    )

    // Fetch filter data
    try {
      filterData = await CustomerProductService.getProductFilters()
    } catch (error) {
      console.error('  Failed to fetch filter data:', error)
      filterData = null
    }
  } catch (error) {
    console.error('Failed to fetch search results:', error)
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800">
        <ProductListingLayout
          initialProducts={productsResponse?.data || []}
          title={`Search Results for "${searchQuery}"`}
          description={`Found ${productsResponse?.total || 0} products matching "${searchQuery}"`}
          showCampaigns={true}
          totalProducts={productsResponse?.total || 0}
          totalPages={productsResponse?.totalPages || 1}
          filterData={filterData}
          initialSearchQuery={searchQuery}
        />
      </div>
    </div>
  )
}
