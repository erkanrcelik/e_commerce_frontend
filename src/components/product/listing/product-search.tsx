'use client'

import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/**
 * Product Search Props
 */
interface ProductSearchProps {
  /** Search query value */
  value: string
  /** Search change handler */
  onChange: (search: { query: string; isSearching: boolean }) => void
  /** Input placeholder */
  placeholder?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Product Search Component
 *
 * Search input with debounced search functionality.
 *
 * Features:
 * - Debounced search to avoid excessive API calls
 * - Loading state during search
 * - Clear button functionality
 * - Responsive design
 *
 * @example
 * ```tsx
 * <ProductSearch
 *   value={search.query}
 *   onChange={updateSearch}
 *   placeholder="Search products..."
 * />
 * ```
 */
export function ProductSearch({
  value,
  onChange,
  placeholder = 'Search products...',
  className,
}: ProductSearchProps) {
  const [localValue, setLocalValue] = useState(value)
  const [isSearching, setIsSearching] = useState(false)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        setIsSearching(true)
        onChange({ query: localValue, isSearching: true })

        // Simulate search delay
        setTimeout(() => {
          setIsSearching(false)
          onChange({ query: localValue, isSearching: false })
        }, 300)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [localValue, value, onChange])

  const handleClear = () => {
    setLocalValue('')
    onChange({ query: '', isSearching: false })
  }

  return (
    <div className={`relative ${className || ''}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          value={localValue}
          onChange={e => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-12 h-12 text-lg"
        />
        {localValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        )}
      </div>

      {/* Search indicator */}
      {isSearching && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
