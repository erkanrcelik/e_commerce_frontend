import { getAllCategories as getMockCategories, getProductsByCategory as getMockProductsByCategory } from '@/data/mock-products'
import { throwApiError } from '@/lib/api-error'
import type { Category } from '@/types/product'

/**
 * Category Service
 * 
 * Handles category-related operations with simple error handling
 */
export class CategoryService {
  /**
   * Get all categories
   */
  static async getAllCategories(): Promise<Category[]> {
    try {
      return getMockCategories()
    } catch (error) {
      console.error('Failed to get categories:', error)
      throw throwApiError('Kategoriler yüklenirken bir hata oluştu.')
    }
  }

  /**
   * Get category by slug
   */
  static async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const categories = getMockCategories()
      const category = categories.find((cat: Category) => cat.slug === slug)
      
      if (!category) {
        throw throwApiError('Kategori bulunamadı.', 404)
      }
      
      return category
    } catch (error) {
      console.error('Failed to get category:', error)
      throw error
    }
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(categorySlug: string) {
    try {
      const products = getMockProductsByCategory(categorySlug)
      
      if (products.length === 0) {
        throw throwApiError('Bu kategoride ürün bulunamadı.', 404)
      }
      
      return {
        products,
        pagination: {
          total: products.length,
          page: 1,
          limit: 12,
          totalPages: Math.ceil(products.length / 12),
          hasNext: false,
          hasPrev: false
        }
      }
    } catch (error) {
      console.error('Failed to get category products:', error)
      throw error
    }
  }
}

// Export individual functions for easier imports
export const getAllCategories = CategoryService.getAllCategories
export const getCategoryBySlug = CategoryService.getCategoryBySlug 