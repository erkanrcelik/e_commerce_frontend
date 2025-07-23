'use client'

import { Filter } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CustomerProductService } from '@/services/customer-product.service'
import type { Campaign } from '@/types/customer-campaign'
import type { Category } from '@/types/customer-category'
import type { Product, ProductListParams } from '@/types/customer-product'

import { ProductFilters } from './product-filters'
import { ProductGrid } from './product-grid'
import { ProductList } from './product-list'
import { ProductPagination } from './product-pagination'
import { ProductSearch } from './product-search'
import { ProductSort } from './product-sort'
import { ViewToggle } from './view-toggle'

/**
 * Product Filters Interface
 */
interface ProductFilters {
  search: string
  categories: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  onSale: boolean
  sortBy: string
  sortOrder: 'asc' | 'desc'
  tags?: string[]
  sellers?: string[]
}

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
  /** Total number of products */
  totalProducts?: number
  /** Total number of pages */
  totalPages?: number
  /** Category campaigns to display */
  campaigns?: Campaign[]
  /** Total number of campaigns */
  totalCampaigns?: number
  /** Initial category filter */
  initialCategory?: string
  /** Initial seller filter */
  initialSeller?: string
  /** Initial campaign filter */
  initialCampaign?: string
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
}

/**
 * Product Listing Page Component
 *
 * Main product listing page with comprehensive filtering, sorting, and pagination.
 * Uses server-side filtering via API for better performance and SEO.
 *
 * Features:
 * - Server-side filtering and search via API
 * - Grid and list view options
 * - Advanced filtering by category, price, rating, seller
 * - Sorting by price, rating, newest, name
 * - Search functionality with real-time results
 * - Pagination with configurable page sizes
 * - Campaign indicators for promotional products
 * - Category campaigns display
 * - Responsive design for all screen sizes
 * - Mobile filter sheet
 * - URL state management for filters
 *
 * @example
 * ```tsx
 * <ProductListingPage
 *   title="All Products"
 *   description="Browse our complete collection"
 *   showCampaigns={true}
 *   campaigns={campaigns}
 *   totalCampaigns={3}
 *   initialCategory="68802381d7d0a3256b36f628"
 * />
 * ```
 */
export function ProductListingPage({
  initialProducts = [],
  categories = [],
  title = 'All Products',
  description = 'Browse our complete collection of products',
  showCampaigns = true,
  initialSearchQuery = '',
  totalProducts,
  totalPages,
  initialCategory,
  initialSeller,
  initialCampaign,
  filterData,
}: ProductListingPageProps) {
  // Local state for client-side interactions
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPagesState, setTotalPagesState] = useState(totalPages || 1)
  const [totalProductsState, setTotalProductsState] = useState(
    totalProducts || 0
  )
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  const [filters, setFilters] = useState<ProductFilters>({
    search: initialSearchQuery,
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [0, 10000],
    rating: 0,
    inStock: false,
    onSale: false,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })

  /**
   * Convert filters to API parameters
   */
  const getApiParams = useCallback(
    (currentFilters: ProductFilters, page: number = 1): ProductListParams => {
      const params: ProductListParams = {
        page,
        limit: 20,
        sortBy: currentFilters.sortBy as any,
        sortOrder: currentFilters.sortOrder,
      }

      // Search
      if (currentFilters.search) {
        params.search = currentFilters.search
      }

      // Category (use first category if multiple selected)
      if (currentFilters.categories.length > 0) {
        params.category = currentFilters.categories[0]
      }

      // Price range
      if (currentFilters.priceRange[0] > 0) {
        params.minPrice = currentFilters.priceRange[0]
      }
      if (currentFilters.priceRange[1] < 10000) {
        params.maxPrice = currentFilters.priceRange[1]
      }

      // Stock filter
      if (currentFilters.inStock) {
        params.inStock = true
      }

      // Sale filter
      if (currentFilters.onSale) {
        params.hasDiscount = true
      }

      // Tags filter
      if (currentFilters.tags && currentFilters.tags.length > 0) {
        params.tags = currentFilters.tags.join(',')
      }

      // Seller filter
      if (initialSeller) {
        params.seller = initialSeller
      } else if (currentFilters.sellers && currentFilters.sellers.length > 0) {
        params.seller = currentFilters.sellers[0]
      }

      return params
    },
    [initialSeller]
  )

  /**
   * Fetch products from API
   */
  const fetchProducts = useCallback(
    async (currentFilters: ProductFilters, page: number = 1) => {
      setLoading(true)

      try {
        let response

        // Use campaign-specific endpoint if campaign is specified
        if (initialCampaign) {
          response = await CustomerProductService.getProductsByCampaign(
            initialCampaign,
            {
              page,
              limit: 20,
            }
          )
        } else {
          // Use regular products endpoint with filters
          const apiParams = getApiParams(currentFilters, page)
          response = await CustomerProductService.getProducts(apiParams)
        }

        setProducts(response.data)
        setTotalPagesState(response.totalPages)
        setTotalProductsState(response.total)
        setCurrentPage(page)
      } catch (error: unknown) {
        console.error('Load products error:', error)
        // Fallback to initial products on error
        setProducts(initialProducts)
      } finally {
        setLoading(false)
      }
    },
    [initialCampaign, getApiParams, initialProducts]
  )

  /**
   * Update filters and fetch new data
   */
  const updateFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      const updatedFilters = { ...filters, ...newFilters }
      setFilters(updatedFilters)
      fetchProducts(updatedFilters, 1) // Reset to first page
    },
    [filters, fetchProducts]
  )

  /**
   * Reset all filters
   */
  const resetFilters = useCallback(() => {
    const defaultFilters: ProductFilters = {
      search: '',
      categories: initialCategory ? [initialCategory] : [],
      priceRange: [0, 10000] as [number, number],
      rating: 0,
      inStock: false,
      onSale: false,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      tags: [],
      sellers: [],
    }
    setFilters(defaultFilters)
    fetchProducts(defaultFilters, 1)
  }, [initialCategory, fetchProducts])

  /**
   * Handle page change
   */
  const handlePageChange = useCallback(
    (page: number) => {
      fetchProducts(filters, page)
    },
    [filters, fetchProducts]
  )

  /**
   * Handle search change
   */
  const handleSearchChange = (search: {
    query: string
    isSearching: boolean
  }) => {
    updateFilters({ search: search.query })
  }

  /**
   * Handle sort change
   */
  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    updateFilters({ sortBy, sortOrder })
  }

  // Set initial search query
  useEffect(() => {
    if (initialSearchQuery) {
      setFilters(prev => ({ ...prev, search: initialSearchQuery }))
    }
  }, [initialSearchQuery])

  // Initialize products when component mounts
  useEffect(() => {
    setProducts(initialProducts)
  }, [initialProducts, setProducts])

  /**
   * Count active filters
   */
  const activeFiltersCount = [
    filters.search.length > 0,
    filters.categories.length > 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000,
    filters.rating > 0,
    filters.inStock,
    filters.onSale,
  ].filter(Boolean).length

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
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
            )}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <ProductSearch
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <ProductFilters
              categories={categories}
              filters={filters}
              onUpdateFilters={updateFilters}
              onClearFilters={resetFilters}
              filterData={filterData}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              {/* Results Count */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {loading
                  ? 'Loading...'
                  : `${totalProductsState} products found`}
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-purple-600">
                    ({activeFiltersCount} filter
                    {activeFiltersCount === 1 ? '' : 's'} applied)
                  </span>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <div className="lg:hidden">
                  <Sheet
                    open={isFilterSheetOpen}
                    onOpenChange={setIsFilterSheetOpen}
                  >
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Filter className="w-4 h-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <span className="ml-1 px-1.5 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="left"
                      className="w-[300px] sm:w-[400px]"
                    >
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <ProductFilters
                          categories={categories}
                          filters={filters}
                          onUpdateFilters={newFilters => {
                            updateFilters(newFilters)
                            // Close sheet after filter update on mobile
                            setTimeout(() => setIsFilterSheetOpen(false), 500)
                          }}
                          onClearFilters={() => {
                            resetFilters()
                            setIsFilterSheetOpen(false)
                          }}
                          filterData={filterData}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Sort */}
                <ProductSort
                  value={{ field: filters.sortBy, order: filters.sortOrder }}
                  onChange={sort => handleSortChange(sort.field, sort.order)}
                />

                {/* View Toggle */}
                <ViewToggle value={view} onChange={setView} />
              </div>
            </div>

            {/* Products Display */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48 sm:h-64 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                {/* Products Grid/List */}
                {view === 'grid' ? (
                  <ProductGrid
                    products={products}
                    showCampaigns={showCampaigns}
                  />
                ) : (
                  <ProductList
                    products={products}
                    showCampaigns={showCampaigns}
                  />
                )}

                {/* Pagination */}
                {totalPagesState > 1 && (
                  <div className="mt-8">
                    <ProductPagination
                      currentPage={currentPage}
                      totalPages={totalPagesState}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={resetFilters}
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
