'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * Product Pagination Props
 */
interface ProductPaginationProps {
  /** Current page number */
  currentPage: number
  /** Total number of pages */
  totalPages: number
  /** Page change handler */
  onPageChange: (page: number) => void
  /** Additional CSS classes */
  className?: string
}

/**
 * Product Pagination Component
 *
 * Pagination controls for product listing.
 *
 * Features:
 * - Previous/Next buttons
 * - Page number buttons
 * - Ellipsis for large page counts
 * - Responsive design
 *
 * @example
 * ```tsx
 * <ProductPagination
 *   currentPage={pagination.page}
 *   totalPages={pagination.totalPages}
 *   onPageChange={updatePagination}
 * />
 * ```
 */
export function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div
      className={`flex items-center justify-center gap-2 ${className || ''}`}
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Button
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="w-10 h-10 p-0"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
