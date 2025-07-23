'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/**
 * Product Filters Props
 */
interface ProductFiltersProps {
  /** Total number of products */
  totalProducts: number
  /** Current filter values */
  currentFilters: {
    page?: string
    limit?: string
    categoryId?: string
    sortBy?: string
    sortOrder?: string
    search?: string
    minPrice?: string
    maxPrice?: string
  }
}

/**
 * Product Filters Component
 *
 * Displays filtering and sorting options for campaign products.
 *
 * Features:
 * - Search functionality
 * - Price range filtering
 * - Sorting options
 * - Category filtering
 * - Results count display
 *
 * @example
 * ```tsx
 * <ProductFilters
 *   totalProducts={150}
 *   currentFilters={currentFilters}
 * />
 * ```
 */
export function ProductFilters({
  totalProducts,
  currentFilters,
}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '')

  const updateFilters = (newFilters: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString())

    // Update or remove parameters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 when filters change
    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  const handleSearch = () => {
    updateFilters({ search: searchTerm || undefined })
  }

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-')
    updateFilters({ sortBy, sortOrder })
  }

  const handlePriceRangeChange = (minPrice?: string, maxPrice?: string) => {
    updateFilters({
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    })
  }

  const clearFilters = () => {
    router.push('')
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h3>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {totalProducts} products found
        </div>

        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Search Products
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort By
          </label>
          <Select
            value={`${currentFilters.sortBy || 'createdAt'}-${currentFilters.sortOrder || 'desc'}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="createdAt-asc">Oldest First</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="averageRating-desc">Highest Rated</SelectItem>
              <SelectItem value="reviewCount-desc">Most Reviewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={currentFilters.minPrice || ''}
              onChange={e =>
                handlePriceRangeChange(e.target.value, currentFilters.maxPrice)
              }
            />
            <Input
              placeholder="Max"
              type="number"
              value={currentFilters.maxPrice || ''}
              onChange={e =>
                handlePriceRangeChange(currentFilters.minPrice, e.target.value)
              }
            />
          </div>
        </div>

        {/* Active Filters */}
        {(currentFilters.search ||
          currentFilters.minPrice ||
          currentFilters.maxPrice) && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active Filters
            </label>
            <div className="flex flex-wrap gap-2">
              {currentFilters.search && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                  Search: {currentFilters.search}
                </span>
              )}
              {currentFilters.minPrice && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                  Min: ${currentFilters.minPrice}
                </span>
              )}
              {currentFilters.maxPrice && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                  Max: ${currentFilters.maxPrice}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
