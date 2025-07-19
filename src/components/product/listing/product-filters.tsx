'use client'

import { Filter, X } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import type { ProductFilters } from '@/hooks/use-product-listing'
import type { Category } from '@/types/product'

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
}

/**
 * Product Filters Component
 * 
 * Sidebar filters for product listing with category, price, rating, and stock filters.
 * 
 * Features:
 * - Category multi-select
 * - Price range slider
 * - Rating filter
 * - Stock and sale filters
 * - Clear all filters
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <ProductFilters
 *   categories={categories}
 *   filters={filters}
 *   onUpdateFilters={updateFilters}
 *   onClearFilters={clearFilters}
 * />
 * ```
 */
export function ProductFilters({
  categories,
  filters,
  onUpdateFilters,
  onClearFilters,
  className
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const activeFiltersCount = [
    filters.categories.length > 0,
    filters.minPrice !== null,
    filters.maxPrice !== null,
    filters.minRating !== null,
    filters.inStock !== null,
    filters.onSale !== null
  ].filter(Boolean).length

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId)
    
    onUpdateFilters({ categories: newCategories })
  }

  const handlePriceChange = (values: number[]) => {
    onUpdateFilters({
      minPrice: values[0],
      maxPrice: values[1]
    })
  }

  const handleRatingChange = (rating: number | null) => {
    onUpdateFilters({ minRating: rating })
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
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
          <X className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-0' : 'rotate-90'}`} />
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
          <Card className="p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Price Range Filter */}
          <Card className="p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
            <div className="space-y-4">
              <Slider
                value={[filters.minPrice || 0, filters.maxPrice || 1000]}
                onValueChange={handlePriceChange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>${filters.minPrice || 0}</span>
                <span>${filters.maxPrice || 1000}</span>
              </div>
            </div>
          </Card>

          {/* Rating Filter */}
          <Card className="p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Minimum Rating</h4>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.minRating === rating}
                    onCheckedChange={(checked) => 
                      handleRatingChange(checked ? rating : null)
                    }
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-normal cursor-pointer flex items-center gap-1"
                  >
                    {rating}+ stars
                    <div className="flex gap-0.5">
                      {Array.from({ length: rating }).map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Stock Filter */}
          <Card className="p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Availability</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock === true}
                  onCheckedChange={(checked) => 
                    onUpdateFilters({ inStock: checked ? true : null })
                  }
                />
                <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="on-sale"
                  checked={filters.onSale === true}
                  onCheckedChange={(checked) => 
                    onUpdateFilters({ onSale: checked ? true : null })
                  }
                />
                <Label htmlFor="on-sale" className="text-sm font-normal cursor-pointer">
                  On Sale
                </Label>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
} 