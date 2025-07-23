'use client'

import { Filter, Store, Tag, X } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import type { ProductFilters } from '@/hooks/use-product-listing'
import type { Category } from '@/types/customer-category'

/**
 * API Filter Data Types
 */
interface PriceRange {
  min: number
  max: number
  label: string
  productCount: number
}

interface TagFilter {
  name: string
  count: number
}

interface SellerFilter {
  _id: string
  name: string
  productCount: number
}

interface FilterData {
  categories: Category[]
  priceRanges: PriceRange[]
  tags: TagFilter[]
  sellers: SellerFilter[]
}

/**
 * Product Filters Props
 */
interface ProductFiltersProps {
  /** Available categories for filtering */
  categories: Category[]
  /** Current filter state */
  filters: ProductFilters
  /** Filter update handler */
  onUpdateFilters: (filters: Partial<ProductFilters>) => void
  /** Clear all filters handler */
  onClearFilters: () => void
  /** Additional CSS classes */
  className?: string
  /** API filter data */
  filterData?: FilterData
  /** Show seller filter */
  showSellerFilter?: boolean
  /** Show price range filter */
  showPriceFilter?: boolean
  /** Show rating filter */
  showRatingFilter?: boolean
  /** Show stock filter */
  showStockFilter?: boolean
  /** Show sale filter */
  showSaleFilter?: boolean
  /** Show tags filter */
  showTagsFilter?: boolean
}

/**
 * Product Filters Component
 *
 * Sidebar filters for product listing with comprehensive filtering options.
 * Supports API-based filtering for better performance.
 *
 * Features:
 * - Category multi-select with product counts
 * - Price range slider with API ranges
 * - Rating filter
 * - Stock and sale filters
 * - Tags filter with counts
 * - Sellers filter with counts
 * - Clear all filters
 * - Responsive design
 * - API-optimized filtering
 *
 * @example
 * ```tsx
 * <ProductFilters
 *   categories={categories}
 *   filters={filters}
 *   onUpdateFilters={updateFilters}
 *   onClearFilters={clearFilters}
 *   filterData={apiFilterData}
 *   showPriceFilter={true}
 *   showStockFilter={true}
 * />
 * ```
 */
export function ProductFilters({
  categories,
  filters,
  onUpdateFilters,
  onClearFilters,
  className,
  filterData,
  showSellerFilter = false,
  showPriceFilter = true,
  showRatingFilter = true,
  showStockFilter = true,
  showSaleFilter = true,
  showTagsFilter = true,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const activeFiltersCount = [
    filters.search.length > 0,
    filters.categories.length > 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000,
    filters.rating > 0,
    filters.inStock,
    filters.onSale,
    (filters.tags?.length || 0) > 0,
    (filters.sellers?.length || 0) > 0,
  ].filter(Boolean).length

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId)

    onUpdateFilters({ categories: newCategories })
  }

  const handlePriceChange = (values: number[]) => {
    onUpdateFilters({
      priceRange: [values[0], values[1]] as [number, number],
    })
  }

  const handleRatingChange = (rating: number) => {
    onUpdateFilters({ rating: rating === filters.rating ? 0 : rating })
  }

  const handleTagChange = (tagName: string, checked: boolean) => {
    const currentTags = filters.tags || []
    const newTags = checked
      ? [...currentTags, tagName]
      : currentTags.filter(tag => tag !== tagName)

    onUpdateFilters({ tags: newTags })
  }

  const handleSellerChange = (sellerId: string, checked: boolean) => {
    const currentSellers = filters.sellers || []
    const newSellers = checked
      ? [...currentSellers, sellerId]
      : currentSellers.filter(id => id !== sellerId)

    onUpdateFilters({ sellers: newSellers })
  }

  // Get min and max prices from API data
  const getPriceRange = () => {
    if (filterData?.priceRanges && filterData.priceRanges.length > 0) {
      const min = Math.min(...filterData.priceRanges.map(r => r.min))
      const max = Math.max(...filterData.priceRanges.map(r => r.max))
      return [min, max] as [number, number]
    }
    return [0, 10000] as [number, number]
  }

  const priceRange = getPriceRange()

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1"
        >
          <X
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-0' : 'rotate-90'}`}
          />
        </Button>
      </div>

      {isExpanded && (
        <>
          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="w-full"
            >
              Clear all filters
            </Button>
          )}

          {/* Categories Filter */}
          {categories.length > 0 && (
            <Card className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Categories
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(category => (
                  <div
                    key={category._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category._id}`}
                        checked={filters.categories.includes(category._id)}
                        onCheckedChange={checked =>
                          handleCategoryChange(category._id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`category-${category._id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {category.name}
                      </Label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.productCount}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Price Range Filter */}
          {showPriceFilter && (
            <Card className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Price Range
              </h4>
              <div className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  max={priceRange[1]}
                  min={priceRange[0]}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>

                {/* Price Range Options from API */}
                {filterData?.priceRanges && (
                  <div className="space-y-2 mt-4">
                    <h5 className="text-xs font-medium text-gray-500 uppercase">
                      Quick Ranges
                    </h5>
                    {filterData.priceRanges.map((range, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <Label className="text-xs cursor-pointer">
                          {range.label}
                        </Label>
                        <Badge variant="secondary" className="text-xs">
                          {range.productCount}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Tags Filter */}
          {showTagsFilter && filterData?.tags && filterData.tags.length > 0 && (
            <Card className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterData.tags.map(tag => (
                  <div
                    key={tag.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag.name}`}
                        checked={filters.tags?.includes(tag.name) || false}
                        onCheckedChange={checked =>
                          handleTagChange(tag.name, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`tag-${tag.name}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {tag.name}
                      </Label>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tag.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Sellers Filter */}
          {showSellerFilter &&
            filterData?.sellers &&
            filterData.sellers.length > 0 && (
              <Card className="p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Sellers
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {filterData.sellers.map(seller => (
                    <div
                      key={seller._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`seller-${seller._id}`}
                          checked={
                            filters.sellers?.includes(seller._id) || false
                          }
                          onCheckedChange={checked =>
                            handleSellerChange(seller._id, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`seller-${seller._id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {seller.name}
                        </Label>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {seller.productCount}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}

          {/* Rating Filter */}
          {showRatingFilter && (
            <Card className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Minimum Rating
              </h4>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.rating === rating}
                      onCheckedChange={() => handleRatingChange(rating)}
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="text-sm font-normal cursor-pointer flex items-center gap-1"
                    >
                      {rating}+ stars
                      <div className="flex gap-0.5">
                        {Array.from({ length: rating }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Stock and Sale Filters */}
          {(showStockFilter || showSaleFilter) && (
            <Card className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Availability
              </h4>
              <div className="space-y-2">
                {showStockFilter && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={checked =>
                        onUpdateFilters({ inStock: !!checked })
                      }
                    />
                    <Label
                      htmlFor="in-stock"
                      className="text-sm font-normal cursor-pointer"
                    >
                      In Stock Only
                    </Label>
                  </div>
                )}
                {showSaleFilter && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="on-sale"
                      checked={filters.onSale}
                      onCheckedChange={checked =>
                        onUpdateFilters({ onSale: !!checked })
                      }
                    />
                    <Label
                      htmlFor="on-sale"
                      className="text-sm font-normal cursor-pointer"
                    >
                      On Sale Only
                    </Label>
                  </div>
                )}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
