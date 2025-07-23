'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CustomerSearchService } from '@/services/customer-search.service'

/**
 * Search Suggestion Item
 */
interface SearchSuggestion {
  text: string
  type: 'product' | 'category' | 'seller'
  count?: number
}

/**
 * Search Bar Component
 *
 * Provides product search functionality with real-time API suggestions.
 * Features include search input, autocomplete dropdown, and search button.
 *
 * @example
 * ```tsx
 * <SearchBar />
 * ```
 */
export function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Debounced search function
  const searchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setIsLoading(true)
    try {
      // Search for products, categories, and sellers
      const [productsResponse, categoriesResponse, sellersResponse] =
        await Promise.all([
          CustomerSearchService.searchProducts({
            query,
            page: 1,
            limit: 3,
          }).catch(() => ({
            products: [],
            categories: [],
            sellers: [],
            campaigns: [],
            totalResults: {
              products: 0,
              categories: 0,
              sellers: 0,
              campaigns: 0,
            },
          })),
          CustomerSearchService.searchCategories({
            query,
            page: 1,
            limit: 2,
          }).catch(() => ({
            products: [],
            categories: [],
            sellers: [],
            campaigns: [],
            totalResults: {
              products: 0,
              categories: 0,
              sellers: 0,
              campaigns: 0,
            },
          })),
          CustomerSearchService.searchSellers({
            query,
            page: 1,
            limit: 2,
          }).catch(() => ({
            products: [],
            categories: [],
            sellers: [],
            campaigns: [],
            totalResults: {
              products: 0,
              categories: 0,
              sellers: 0,
              campaigns: 0,
            },
          })),
        ])

      const newSuggestions: SearchSuggestion[] = []

      // Add product suggestions
      productsResponse.products?.forEach(product => {
        newSuggestions.push({
          text: product.name,
          type: 'product',
          count: product.stock,
        })
      })

      // Add category suggestions
      categoriesResponse.categories?.forEach(category => {
        newSuggestions.push({
          text: category.name,
          type: 'category',
          count: category.productCount,
        })
      })

      // Add seller suggestions
      sellersResponse.sellers?.forEach(seller => {
        newSuggestions.push({
          text: seller.storeName,
          type: 'seller',
          count: seller.productCount,
        })
      })

      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
    } catch (error) {
      console.error('Search suggestions error:', error)
      setSuggestions([])
      setShowSuggestions(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update suggestions when query changes with debounce
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    debounceTimeoutRef.current = setTimeout(() => {
      searchSuggestions(searchQuery)
    }, 300)

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [searchQuery, searchSuggestions])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSearch(suggestions[selectedIndex].text)
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.text)
    handleSearch(suggestion.text)
  }

  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'product':
        return '📦'
      case 'category':
        return '📂'
      case 'seller':
        return '🏪'
      default:
        return '🔍'
    }
  }

  const getSuggestionLabel = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'product':
        return 'Product'
      case 'category':
        return 'Category'
      case 'seller':
        return 'Seller'
      default:
        return 'Search'
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-lg">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search products, categories, sellers..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-12 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Button
          type="button"
          size="sm"
          onClick={() => handleSearch()}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-purple-600 hover:bg-purple-700"
        >
          <Search className="h-3 w-3" />
        </Button>
      </div>

      {/* Autocomplete Suggestions */}
      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              Searching...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.text}`}
                className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {getSuggestionIcon(suggestion.type)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {suggestion.text}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getSuggestionLabel(suggestion.type)}
                      </span>
                    </div>
                  </div>
                  {suggestion.count !== undefined && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {suggestion.count}
                    </span>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
}
