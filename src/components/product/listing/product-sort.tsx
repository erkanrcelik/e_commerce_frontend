'use client'

import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { SortOption } from '@/hooks/use-product-listing'

/**
 * Product Sort Props
 */
interface ProductSortProps {
  /** Current sort value */
  value: SortOption
  /** Sort change handler */
  onChange: (sort: SortOption) => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Product Sort Component
 * 
 * Dropdown for sorting products by different criteria.
 * 
 * Features:
 * - Sort by price, name, rating, newest
 * - Ascending and descending order
 * - Visual indicators for current sort
 * 
 * @example
 * ```tsx
 * <ProductSort
 *   value={sort}
 *   onChange={updateSort}
 * />
 * ```
 */
export function ProductSort({
  value,
  onChange,
  className
}: ProductSortProps) {
  const sortOptions = [
    { field: 'createdAt' as const, order: 'desc' as const, label: 'Newest First' },
    { field: 'createdAt' as const, order: 'asc' as const, label: 'Oldest First' },
    { field: 'price' as const, order: 'asc' as const, label: 'Price: Low to High' },
    { field: 'price' as const, order: 'desc' as const, label: 'Price: High to Low' },
    { field: 'name' as const, order: 'asc' as const, label: 'Name: A to Z' },
    { field: 'name' as const, order: 'desc' as const, label: 'Name: Z to A' },
    { field: 'rating' as const, order: 'desc' as const, label: 'Highest Rated' },
    { field: 'rating' as const, order: 'asc' as const, label: 'Lowest Rated' },
  ]

  const currentOption = sortOptions.find(
    option => option.field === value.field && option.order === value.order
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          Sort by: {currentOption?.label || 'Newest First'}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={`${option.field}-${option.order}`}
            onClick={() => onChange({ field: option.field, order: option.order })}
            className={`
              cursor-pointer
              ${value.field === option.field && value.order === option.order
                ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300'
                : ''
              }
            `}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 