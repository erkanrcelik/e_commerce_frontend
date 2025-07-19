'use client'

import { useState } from 'react'

import { useProductListing } from '@/hooks/use-product-listing'
import type { Category, Product } from '@/types/product'

import { ProductFilters } from './product-filters'
import { ProductGrid } from './product-grid'
import { ProductList } from './product-list'
import { ProductPagination } from './product-pagination'
import { ProductSearch } from './product-search'
import { ProductSort } from './product-sort'
import { ViewToggle } from './view-toggle'

/**
 * Product Listing Page Props
 */
interface ProductListingPageProps {
  /** Initial products to display */
  initialProducts?: Product[]
  /** Available categories for filtering */
  categories?: Category[]
  /** Page title */
  title?: string
  /** Page description */
  description?: string
  /** Show campaign indicators */
  showCampaigns?: boolean
  /** Initial search query */
  initialSearchQuery?: string
}

/**
 * Product Listing Page Component
 * 
 * Main product listing page with comprehensive filtering, sorting, and pagination.
 * 
 * Features:
 * - Grid and list view options
 * - Advanced filtering by category, price, rating
 * - Sorting by price, rating, newest
 * - Search functionality with real-time results
 * - Pagination with configurable page sizes
 * - Campaign indicators for promotional products
 * - Responsive design for all screen sizes
 * - URL state management for filters
 * 
 * @example
 * ```tsx
 * <ProductListingPage
 *   title="All Products"
 *   description="Browse our complete collection"
 *   showCampaigns={true}
 * />
 * ```
 */
export function ProductListingPage({
  initialProducts = [],
  categories = [],
  title = "All Products",
  description = "Browse our complete collection of products",
  showCampaigns = true,
  initialSearchQuery = ''
}: ProductListingPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const {
    filteredProducts,
    loading,
    filters,
    sort,
    search,
    pagination,
    updateFilters,
    updateSort,
    updateSearch,
    updatePagination,
    clearFilters
  } = useProductListing(initialProducts, initialSearchQuery)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <ProductSearch
            value={search.query}
            onChange={updateSearch}
            placeholder="Search products..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <ProductFilters
              categories={categories}
              filters={filters}
              onUpdateFilters={updateFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              {/* Results Count */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Sort */}
                <ProductSort
                  value={sort}
                  onChange={updateSort}
                />

                {/* View Toggle */}
                <ViewToggle
                  value={viewMode}
                  onChange={setViewMode}
                />
              </div>
            </div>

            {/* Products Display */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                {/* Products Grid/List */}
                {viewMode === 'grid' ? (
                  <ProductGrid
                    products={filteredProducts}
                    showCampaigns={showCampaigns}
                  />
                ) : (
                  <ProductList
                    products={filteredProducts}
                    showCampaigns={showCampaigns}
                  />
                )}

                {/* Pagination */}
                <div className="mt-8">
                  <ProductPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => updatePagination({ page })}
                  />
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 