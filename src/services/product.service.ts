import api from '@/lib/axios'
import type { Product, ProductListResponse } from '@/types/product'

/**
 * Product API service
 * Handles all product-related API calls
 */
export class ProductService {
  /**
   * Get featured products for homepage
   */
  static async getFeaturedProducts(limit = 8): Promise<Product[]> {
    try {
      const response = await api.get<ProductListResponse>('/products/featured', {
        params: { limit }
      })
      return response.data.products
    } catch (error) {
      console.error('Get featured products API error:', error)
      throw error
    }
  }

  /**
   * Get new arrival products
   */
  static async getNewArrivals(limit = 8): Promise<Product[]> {
    try {
      const response = await api.get<ProductListResponse>('/products/new-arrivals', {
        params: { limit }
      })
      return response.data.products
    } catch (error) {
      console.error('Get new arrivals API error:', error)
      throw error
    }
  }

  /**
   * Get popular/best selling products
   */
  static async getPopularProducts(limit = 8): Promise<Product[]> {
    try {
      const response = await api.get<ProductListResponse>('/products/popular', {
        params: { limit }
      })
      return response.data.products
    } catch (error) {
      console.error('Get popular products API error:', error)
      throw error
    }
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(
    categoryId: string, 
    limit = 12,
    page = 1
  ): Promise<ProductListResponse> {
    try {
      const response = await api.get<ProductListResponse>('/products', {
        params: { 
          categoryId,
          limit,
          page
        }
      })
      return response.data
    } catch (error) {
      console.error('Get products by category API error:', error)
      throw error
    }
  }

  /**
   * Get single product by slug
   */
  static async getProductBySlug(slug: string): Promise<Product> {
    try {
      const response = await api.get<{ product: Product }>(`/products/${slug}`)
      return response.data.product
    } catch (error) {
      console.error('Get product by slug API error:', error)
      throw error
    }
  }

  /**
   * Search products
   */
  static async searchProducts(
    query: string,
    limit = 20,
    page = 1
  ): Promise<ProductListResponse> {
    try {
      const response = await api.get<ProductListResponse>('/products/search', {
        params: {
          q: query,
          limit,
          page
        }
      })
      return response.data
    } catch (error) {
      console.error('Search products API error:', error)
      throw error
    }
  }

  /**
   * Get products with filters
   */
  static async getProductsWithFilters(filters: {
    category?: string
    minPrice?: number
    maxPrice?: number
    tags?: string[]
    sortBy?: 'price' | 'name' | 'rating' | 'newest'
    sortOrder?: 'asc' | 'desc'
    limit?: number
    page?: number
  }): Promise<ProductListResponse> {
    try {
      const response = await api.get<ProductListResponse>('/products', {
        params: filters
      })
      return response.data
    } catch (error) {
      console.error('Get products with filters API error:', error)
      throw error
    }
  }
} 