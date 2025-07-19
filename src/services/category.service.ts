import api from '@/lib/axios'
import type { Category } from '@/types/product'

/**
 * Category API service
 * Handles all category-related API calls
 */
export class CategoryService {
  /**
   * Get all categories
   */
  static async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<{ categories: Category[] }>('/categories')
      return response.data.categories
    } catch (error) {
      console.error('Get categories API error:', error)
      throw error
    }
  }

  /**
   * Get featured categories for homepage
   */
  static async getFeaturedCategories(limit = 8): Promise<Category[]> {
    try {
      const response = await api.get<{ categories: Category[] }>('/categories/featured', {
        params: { limit }
      })
      return response.data.categories
    } catch (error) {
      console.error('Get featured categories API error:', error)
      throw error
    }
  }

  /**
   * Get category by slug
   */
  static async getCategoryBySlug(slug: string): Promise<Category> {
    try {
      const response = await api.get<{ category: Category }>(`/categories/${slug}`)
      return response.data.category
    } catch (error) {
      console.error('Get category by slug API error:', error)
      throw error
    }
  }

  /**
   * Get parent categories (top level)
   */
  static async getParentCategories(): Promise<Category[]> {
    try {
      const response = await api.get<{ categories: Category[] }>('/categories/parents')
      return response.data.categories
    } catch (error) {
      console.error('Get parent categories API error:', error)
      throw error
    }
  }

  /**
   * Get subcategories by parent ID
   */
  static async getSubcategories(parentId: string): Promise<Category[]> {
    try {
      const response = await api.get<{ categories: Category[] }>(`/categories/${parentId}/subcategories`)
      return response.data.categories
    } catch (error) {
      console.error('Get subcategories API error:', error)
      throw error
    }
  }
} 