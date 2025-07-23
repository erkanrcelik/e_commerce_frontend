import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductListingLayout } from '@/components/product/listing'
import { CustomerProductService } from '@/services/customer-product.service'

export const metadata: Metadata = {
  title: 'All Products - playableFactory',
  description:
    'Browse our complete collection of products from all categories.',
}

/**
 * All Products Page
 *
 * Displays all products using the unified products API.
 * Shows complete product catalog with filtering and sorting capabilities.
 *
 * Features:
 * - All products display
 * - Advanced filtering and sorting
 * - Search functionality
 * - Responsive design
 * - Product listing with campaigns
 */
export default async function ProductsPage() {
  let productsResponse = null
  let filterData = null

  try {
    // Get all products
    productsResponse = await CustomerProductService.getProducts({
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    })

    // Fetch filter data
    try {
      filterData = await CustomerProductService.getProductFilters()
    } catch (error) {
      console.error('  Failed to fetch filter data:', error)
      filterData = null
    }
  } catch (error) {
    console.error('  Failed to fetch products:', error)
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800">
        <ProductListingLayout
          initialProducts={productsResponse?.data || []}
          title="All Products"
          description="Browse our complete collection of products from all categories"
          showCampaigns={true}
          totalProducts={productsResponse?.total || 0}
          totalPages={productsResponse?.totalPages || 1}
          filterData={filterData}
        />
      </div>
    </div>
  )
}
