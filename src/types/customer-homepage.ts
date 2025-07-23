import type { Category } from './customer-category'
import type { Product } from './customer-product'

/**
 * Homepage API response types
 */

/**
 * Homepage featured products section
 */
export interface HomepageFeaturedProducts {
  title: string
  products: Product[]
}

/**
 * Homepage new arrivals section
 */
export interface HomepageNewArrivals {
  title: string
  products: Product[]
}

/**
 * Homepage popular products section
 */
export interface HomepagePopularProducts {
  title: string
  products: Product[]
}

/**
 * Homepage special offers section
 */
export interface HomepageSpecialOffers {
  title: string
  products: Product[]
}

/**
 * Homepage categories section
 */
export interface HomepageCategories {
  title: string
  items: Category[]
}

/**
 * Complete homepage data response from /api/homepage
 */
export interface HomepageData {
  featuredProducts: HomepageFeaturedProducts
  newArrivals: HomepageNewArrivals
  popularProducts: HomepagePopularProducts
  specialOffers: HomepageSpecialOffers
  categories: HomepageCategories
}

/**
 * Homepage API query parameters
 */
export interface HomepageProductParams {
  limit?: number
}

/**
 * New arrivals specific parameters
 */
export interface NewArrivalsParams extends HomepageProductParams {
  days?: number
}

/**
 * Popular products specific parameters
 */
export interface PopularProductsParams extends HomepageProductParams {
  days?: number
}

/**
 * Category products parameters
 */
export interface CategoryProductsParams {
  categoryId: string
  limit?: number
}

/**
 * Seller products parameters
 */
export interface SellerProductsParams {
  sellerId: string
  limit?: number
}

/**
 * Related products parameters
 */
export interface RelatedProductsParams {
  productId: string
  limit?: number
}
