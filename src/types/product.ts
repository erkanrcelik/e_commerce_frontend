/**
 * Product category interface
 */
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
}

/**
 * Product variant interface (color, size, etc.)
 */
export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
  stock?: number
}

/**
 * Product review interface
 */
export interface ProductReview {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
  verified: boolean
}

/**
 * Product image interface
 */
export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

/**
 * Main product interface
 */
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number
  discount?: number
  discountPercentage?: number
  sku: string
  stock: number
  lowStockThreshold?: number
  isInStock: boolean
  
  // Media
  images: ProductImage[]
  thumbnailImage?: string
  
  // Category & Tags
  categoryId: string
  category: Category
  tags: string[]
  
  // Variants
  variants?: ProductVariant[]
  
  // Reviews & Rating
  reviews: ProductReview[]
  averageRating: number
  totalReviews: number
  
  // SEO & Meta
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  
  // Status & Flags
  isActive: boolean
  isFeatured: boolean
  isOnSale: boolean
  isNew: boolean
  isBestSeller: boolean
  
  // Dates
  createdAt: string
  updatedAt: string
  publishedAt?: string
  
  // Shipping & Dimensions
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  shippingClass?: string
}

/**
 * Product list response for API
 */
export interface ProductListResponse {
  products: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  filters?: {
    categories: Category[]
    priceRange: {
      min: number
      max: number
    }
    brands: string[]
    tags: string[]
  }
}

/**
 * Product card props for UI components
 */
export interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'grid' | 'list'
  showQuickView?: boolean
  showWishlist?: boolean
  showCompare?: boolean
  className?: string
  onAddToCart?: (product: Product) => void
  onQuickView?: (product: Product) => void
  onWishlist?: (product: Product) => void
  onCompare?: (product: Product) => void
} 