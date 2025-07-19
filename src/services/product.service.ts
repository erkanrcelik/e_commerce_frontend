import { getAllProducts, getProductsByCategory as getMockProductsByCategory } from '@/data/mock-products'
import { throwApiError } from '@/lib/api-error'
import type { Product, ProductListResponse } from '@/types/product'

/**
 * Product Service
 * 
 * Handles product-related API operations with simple error handling
 */
export class ProductService {
  /**
   * Get all products with optional filtering
   */
  static async getProducts(params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
    minRating?: number
    inStock?: boolean
    onSale?: boolean
  }): Promise<ProductListResponse> {
    try {
      let products = getAllProducts()

      // Filter by category
      if (params?.category) {
        products = getMockProductsByCategory(params.category)
      }

      // Pagination
      const page = params?.page || 1
      const limit = params?.limit || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = products.slice(startIndex, endIndex)

      return {
        products: paginatedProducts,
        pagination: {
          total: products.length,
          page,
          limit,
          totalPages: Math.ceil(products.length / limit),
          hasNext: endIndex < products.length,
          hasPrev: page > 1
        }
      }
    } catch (error) {
      console.error('Failed to get products:', error)
      throw throwApiError('Ürünler yüklenirken bir hata oluştu.')
    }
  }

  /**
   * Get products by category
   */
  static async getProductsByCategory(categorySlug: string, params?: {
    page?: number
    limit?: number
    search?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
    minRating?: number
    inStock?: boolean
    onSale?: boolean
  }): Promise<ProductListResponse> {
    try {
      return ProductService.getProducts({
        ...params,
        category: categorySlug
      })
    } catch (error) {
      console.error('Failed to get category products:', error)
      throw error
    }
  }

  /**
   * Get product by slug
   */
  static async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const products = getAllProducts()
      const product = products.find(product => product.slug === slug)
      
      return product || null
    } catch (error) {
      console.error('Failed to get product:', error)
      return null
    }
  }

  /**
   * Get featured products
   */
  static async getFeaturedProducts(limit = 8): Promise<Product[]> {
    try {
      const products = getAllProducts()
      return products
        .filter(product => product.isFeatured)
        .slice(0, limit)
    } catch (error) {
      console.error('Failed to get featured products:', error)
      throw throwApiError('Öne çıkan ürünler yüklenirken bir hata oluştu.')
    }
  }

  /**
   * Get new products
   */
  static async getNewProducts(limit = 8): Promise<Product[]> {
    try {
      const products = getAllProducts()
      return products
        .filter(product => product.isNew)
        .slice(0, limit)
    } catch (error) {
      console.error('Failed to get new products:', error)
      throw throwApiError('Yeni ürünler yüklenirken bir hata oluştu.')
    }
  }

  /**
   * Get best seller products
   */
  static async getBestSellerProducts(limit = 8): Promise<Product[]> {
    try {
      const products = getAllProducts()
      return products
        .filter(product => product.isBestSeller)
        .slice(0, limit)
    } catch (error) {
      console.error('Failed to get best seller products:', error)
      throw throwApiError('Çok satan ürünler yüklenirken bir hata oluştu.')
    }
  }

  /**
   * Get on sale products
   */
  static async getOnSaleProducts(limit = 8): Promise<Product[]> {
    try {
      const products = getAllProducts()
      return products
        .filter(product => product.isOnSale)
        .slice(0, limit)
    } catch (error) {
      console.error('Failed to get on sale products:', error)
      throw throwApiError('İndirimli ürünler yüklenirken bir hata oluştu.')
    }
  }

  /**
   * Get products by campaign
   */
  static async getProductsByCampaign(campaignId: string, params?: {
    page?: number
    limit?: number
    search?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
    minRating?: number
    inStock?: boolean
    onSale?: boolean
  }): Promise<ProductListResponse> {
    try {
      const products = getAllProducts()
      const campaignProducts = products.filter(product => 
        product.tags.includes('campaign') || product.isOnSale
      )
      
      const page = params?.page || 1
      const limit = params?.limit || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = campaignProducts.slice(startIndex, endIndex)

      return {
        products: paginatedProducts,
        pagination: {
          total: campaignProducts.length,
          page,
          limit,
          totalPages: Math.ceil(campaignProducts.length / limit),
          hasNext: endIndex < campaignProducts.length,
          hasPrev: page > 1
        }
      }
    } catch (error) {
      console.error('Failed to get campaign products:', error)
      throw throwApiError('Kampanya ürünleri yüklenirken bir hata oluştu.')
    }
  }
}

// Export individual functions for easier imports
export const getProducts = ProductService.getProducts
export const getProductsByCategory = ProductService.getProductsByCategory
export const getProductsByCampaign = ProductService.getProductsByCampaign
export const getProductBySlug = ProductService.getProductBySlug
export const getFeaturedProducts = ProductService.getFeaturedProducts
export const getNewProducts = ProductService.getNewProducts
export const getBestSellerProducts = ProductService.getBestSellerProducts
export const getOnSaleProducts = ProductService.getOnSaleProducts 