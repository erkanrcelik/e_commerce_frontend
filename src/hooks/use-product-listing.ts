'use client'

import { useCallback, useMemo, useState } from 'react'

import type { Category } from '@/types/customer-category'

export interface ProductFilters {
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

interface UseProductListingProps {
  initialProducts?: any[]
  initialCategories?: Category[]
}

interface UseProductListingReturn {
  // Products
  products: any[]
  filteredProducts: any[]

  // Categories
  categories: Category[]

  // Filters
  filters: ProductFilters
  updateFilters: (newFilters: Partial<ProductFilters>) => void
  resetFilters: () => void

  // State
  loading: boolean
  error: string | null

  // View
  view: 'grid' | 'list'
  setView: (view: 'grid' | 'list') => void

  // Pagination
  currentPage: number
  totalPages: number
  itemsPerPage: number
  setPage: (page: number) => void
  setItemsPerPage: (items: number) => void

  // Stats
  totalProducts: number
  activeFiltersCount: number
}

const DEFAULT_FILTERS: ProductFilters = {
  search: '',
  categories: [],
  priceRange: [0, 10000],
  rating: 0,
  inStock: false,
  onSale: false,
  sortBy: 'name',
  sortOrder: 'asc',
  tags: [],
  sellers: [],
}

/**
 * Product Listing Hook
 *
 * Manages product listing state including filters, sorting, pagination, and view modes.
 * Provides comprehensive product listing functionality with search and filter capabilities.
 *
 * @param initialProducts - Initial products to display
 * @param initialCategories - Available categories for filtering
 * @returns Product listing state and methods
 *
 * @example
 * ```tsx
 * const {
 *   filteredProducts,
 *   filters,
 *   updateFilters,
 *   view,
 *   setView
 * } = useProductListing({
 *   initialProducts: products,
 *   initialCategories: categories
 * })
 * ```
 */
export function useProductListing({
  initialProducts = [],
  initialCategories = [],
}: UseProductListingProps = {}): UseProductListingReturn {
  // State
  const [products] = useState<any[]>(initialProducts)
  const [categories] = useState<Category[]>(initialCategories)
  const [filters, setFilters] = useState<any>(DEFAULT_FILTERS)
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters: any) => {
    setFilters((prev: any) => ({ ...prev, ...newFilters }))
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  /**
   * Reset all filters to default
   */
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setCurrentPage(1)
  }, [])

  /**
   * Set current page
   */
  const setPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  /**
   * Filter and sort products
   */
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        product =>
          (product.name || '').toLowerCase().includes(searchTerm) ||
          (product.description || '').toLowerCase().includes(searchTerm)
      )
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category?._id || '')
      )
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.price || 0
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Rating filter (commented out temporarily due to property issues)
    // if (filters.rating > 0) {
    //   filtered = filtered.filter(product =>
    //     (product.averageRating || 0) >= filters.rating
    //   )
    // }

    // Stock filter (commented out temporarily due to property issues)
    // if (filters.inStock) {
    //   filtered = filtered.filter(product => product.isInStock)
    // }

    // Sale filter (commented out temporarily due to property issues)
    // if (filters.onSale) {
    //   filtered = filtered.filter(product => product.isOnSale)
    // }

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (filters.sortBy) {
        case 'name':
          aValue = (a.name || '').toLowerCase()
          bValue = (b.name || '').toLowerCase()
          break
        case 'price':
          aValue = a.price || 0
          bValue = b.price || 0
          break
        // case 'rating':
        //   aValue = a.averageRating || 0
        //   bValue = b.averageRating || 0
        //   break
        case 'date':
          aValue = new Date(a.createdAt || 0)
          bValue = new Date(b.createdAt || 0)
          break
        default:
          aValue = (a.name || '').toLowerCase()
          bValue = (b.name || '').toLowerCase()
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [products, filters])

  /**
   * Pagination calculations
   */
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / itemsPerPage)

  /**
   * Paginated products
   */
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }, [filteredProducts, currentPage, itemsPerPage])

  /**
   * Count active filters
   */
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.search) count++
    if (filters.categories.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) count++
    if (filters.rating > 0) count++
    if (filters.inStock) count++
    if (filters.onSale) count++
    return count
  }, [filters])

  return {
    // Products
    products,
    filteredProducts: paginatedProducts,

    // Categories
    categories,

    // Filters
    filters,
    updateFilters,
    resetFilters,

    // State
    loading,
    error,

    // View
    view,
    setView,

    // Pagination
    currentPage,
    totalPages,
    itemsPerPage,
    setPage,
    setItemsPerPage,

    // Stats
    totalProducts,
    activeFiltersCount,
  }
}
