'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { Product } from '@/types/product'

/**
 * Product filters interface
 */
export interface ProductFilters {
  categories: string[]
  minPrice: number | null
  maxPrice: number | null
  minRating: number | null
  inStock: boolean | null
  onSale: boolean | null
}

/**
 * Sort options interface
 */
export interface SortOption {
  field: 'price' | 'name' | 'rating' | 'createdAt'
  order: 'asc' | 'desc'
}

/**
 * Search interface
 */
export interface SearchState {
  query: string
  isSearching: boolean
}

/**
 * Pagination interface
 */
export interface PaginationState {
  page: number
  limit: number
  totalPages: number
  totalItems: number
}

/**
 * Product listing state interface
 */
export interface ProductListingState {
  products: Product[]
  filteredProducts: Product[]
  loading: boolean
  filters: ProductFilters
  sort: SortOption
  search: SearchState
  pagination: PaginationState
}

/**
 * Product listing hook
 * 
 * Manages product listing state including filtering, sorting, search, and pagination.
 * Syncs state with URL parameters for shareable links.
 * 
 * Features:
 * - URL state management
 * - Real-time filtering and sorting
 * - Search functionality
 * - Pagination
 * - Loading states
 * - Debounced search
 * 
 * @example
 * ```tsx
 * const {
 *   products,
 *   filteredProducts,
 *   filters,
 *   sort,
 *   search,
 *   pagination,
 *   updateFilters,
 *   updateSort,
 *   updateSearch,
 *   updatePagination,
 *   clearFilters
 * } = useProductListing(initialProducts)
 * ```
 */
export function useProductListing(initialProducts: Product[] = [], initialSearchQuery: string = '') {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // State
  const [products] = useState<Product[]>(initialProducts)
  const [loading] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    minPrice: null,
    maxPrice: null,
    minRating: null,
    inStock: null,
    onSale: null
  })
  const [sort, setSort] = useState<SortOption>({
    field: 'createdAt',
    order: 'desc'
  })
  const [search, setSearch] = useState<SearchState>({
    query: initialSearchQuery,
    isSearching: false
  })
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 12,
    totalPages: 1,
    totalItems: 0
  })

  // Initialize from URL params
  useEffect(() => {
    const urlFilters = {
      categories: searchParams.get('categories')?.split(',') || [],
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
      minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : null,
      inStock: searchParams.get('inStock') === 'true' ? true : searchParams.get('inStock') === 'false' ? false : null,
      onSale: searchParams.get('onSale') === 'true' ? true : searchParams.get('onSale') === 'false' ? false : null
    }

    const urlSort = {
      field: (searchParams.get('sortBy') as SortOption['field']) || 'createdAt',
      order: (searchParams.get('sortOrder') as SortOption['order']) || 'desc'
    }

    const urlSearch = {
      query: searchParams.get('q') || '',
      isSearching: false
    }

    const urlPagination = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 12,
      totalPages: 1,
      totalItems: 0
    }

    setFilters(urlFilters)
    setSort(urlSort)
    setSearch(urlSearch)
    setPagination(urlPagination)
  }, [searchParams])

  // Update URL when state changes
  const updateURL = useCallback((newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (search.query) {
      const query = search.query.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.name.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category?.id || '')
      )
    }

    // Price filter
    if (filters.minPrice !== null) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!)
    }

    // Rating filter
    if (filters.minRating !== null) {
      filtered = filtered.filter(product => product.averageRating >= filters.minRating!)
    }

    // Stock filter
    if (filters.inStock !== null) {
      filtered = filtered.filter(product => product.isInStock === filters.inStock)
    }

    // Sale filter
    if (filters.onSale !== null) {
      filtered = filtered.filter(product => product.isOnSale === filters.onSale)
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sort.field) {
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'rating':
          aValue = a.averageRating
          bValue = b.averageRating
          break
        case 'createdAt':
          aValue = new Date(a.createdAt || '').getTime()
          bValue = new Date(b.createdAt || '').getTime()
          break
        default:
          return 0
      }

      if (sort.order === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [products, search.query, filters, sort])

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    
    // Update URL
    updateURL({
      categories: updatedFilters.categories.length > 0 ? updatedFilters.categories.join(',') : null,
      minPrice: updatedFilters.minPrice?.toString() || null,
      maxPrice: updatedFilters.maxPrice?.toString() || null,
      minRating: updatedFilters.minRating?.toString() || null,
      inStock: updatedFilters.inStock?.toString() || null,
      onSale: updatedFilters.onSale?.toString() || null
    })
  }, [filters, updateURL])

  // Update sort
  const updateSort = useCallback((newSort: SortOption) => {
    setSort(newSort)
    updateURL({
      sortBy: newSort.field,
      sortOrder: newSort.order
    })
  }, [updateURL])

  // Update search
  const updateSearch = useCallback((newSearch: Partial<SearchState>) => {
    const updatedSearch = { ...search, ...newSearch }
    setSearch(updatedSearch)
    
    updateURL({
      q: updatedSearch.query || null
    })
  }, [search, updateURL])

  // Update pagination
  const updatePagination = useCallback((newPagination: Partial<PaginationState>) => {
    const updatedPagination = { ...pagination, ...newPagination }
    setPagination(updatedPagination)
    
    updateURL({
      page: updatedPagination.page.toString(),
      limit: updatedPagination.limit.toString()
    })
  }, [pagination, updateURL])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      categories: [],
      minPrice: null,
      maxPrice: null,
      minRating: null,
      inStock: null,
      onSale: null
    })
    setSearch({ query: '', isSearching: false })
    setPagination({ page: 1, limit: 12, totalPages: 1, totalItems: 0 })
    
    // Clear URL params
    router.push(pathname)
  }, [router, pathname])

  return {
    products,
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
  }
} 