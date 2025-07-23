import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CategoryHeader } from '@/components/category/category-header'
import { ProductListingLayout } from '@/components/product/listing'
import { CustomerCategoryService } from '@/services/customer-category.service'
import { CustomerProductService } from '@/services/customer-product.service'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const category = await CustomerCategoryService.getCategoryBySlug(slug)

    if (!category) {
      return {
        title: 'Category Not Found - playableFactory',
        description: 'The requested category could not be found.',
      }
    }

    return {
      title: `${category.name} - playableFactory`,
      description: category.description || `Browse ${category.name} products`,
      keywords: [category.name, 'category', 'products', 'shop'],
    }
  } catch (error) {
    console.error('Failed to generate category metadata:', error)
    return {
      title: 'Category - playableFactory',
      description: 'Browse category products',
    }
  }
}

/**
 * Category Page
 *
 * Dynamic category page with header, product listing and campaigns.
 * Uses the unified products API for consistent filtering and search.
 * Only shows data that is returned by the API.
 *
 * Features:
 * - Category header with information and campaigns
 * - Category-specific product listing with unified products API
 * - Category campaigns display
 * - Advanced filtering and sorting
 * - Search functionality
 * - Pagination
 * - Category indicators and badges
 * - Conditional rendering based on API data availability
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  try {
    // Get category details
    let category = await CustomerCategoryService.getCategoryBySlug(slug)

    // If not found by slug, try direct ID lookup
    if (!category && slug.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        category = await CustomerCategoryService.getCategoryById(slug)
      } catch (error) {
        console.error('Failed to get category by ID:', error)
      }
    }

    if (!category) {
      notFound()
    }

    // Get products in this category using the unified products API
    const categoryProductsResponse =
      await CustomerProductService.getProductsByCategory(category._id, {
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })

    // Get category campaigns
    const categoryCampaignsResponse =
      await CustomerCategoryService.getCategoryCampaigns(category._id, {
        limit: 5,
      })

    // Fetch filter data for the category
    let filterData
    try {
      filterData = await CustomerProductService.getProductFilters()
    } catch (error) {
      console.error('Failed to fetch filter data:', error)
      filterData = null
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Category Header */}
        <CategoryHeader
          category={category}
          totalProducts={categoryProductsResponse.total}
          campaigns={categoryCampaignsResponse.data}
          totalCampaigns={categoryCampaignsResponse.total}
        />

        {/* Product Listing */}
        <div className="bg-white dark:bg-gray-800">
          <ProductListingLayout
            initialProducts={categoryProductsResponse.data}
            title={category.name}
            description={
              category.description || `Browse ${category.name} products`
            }
            showCampaigns={false}
            totalProducts={categoryProductsResponse.total}
            totalCampaigns={categoryCampaignsResponse.total}
            filterData={filterData}
            initialCategory={category._id}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Category page error:', error)

    // If it's a 404 error, show not found page
    if (
      error &&
      typeof error === 'object' &&
      'status' in error &&
      error.status === 404
    ) {
      notFound()
    }

    // For other errors, throw to show error page
    throw error
  }
}
