import type { Category, Product } from '@/types/product'

/**
 * Mock Categories Data
 */
export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronic devices and gadgets',
    image: '/images/categories/electronics.jpg'
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Mobile phones and accessories',
    image: '/images/categories/smartphones.jpg'
  },
  {
    id: 'laptops',
    name: 'Laptops',
    slug: 'laptops',
    description: 'Portable computers and accessories',
    image: '/images/categories/laptops.jpg'
  },
  {
    id: 'headphones',
    name: 'Headphones',
    slug: 'headphones',
    description: 'Audio devices and accessories',
    image: '/images/categories/headphones.jpg'
  }
]

/**
 * Mock Products Data - Electronics Category
 */
export const mockElectronicsProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
    price: 1199.99,
    originalPrice: 1299.99,
    sku: 'IPHONE-15-PRO-MAX',
    stock: 45,
    isInStock: true,
    images: [
      { id: '1-1', url: '/images/products/iphone-15-pro-max-1.jpg', alt: 'iPhone 15 Pro Max', isPrimary: true, order: 1 },
      { id: '1-2', url: '/images/products/iphone-15-pro-max-2.jpg', alt: 'iPhone 15 Pro Max', isPrimary: false, order: 2 }
    ],
    categoryId: 'smartphones',
    category: { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' },
    tags: ['smartphone', 'apple', 'iphone', '5g'],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 1247,
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    isNew: true,
    isBestSeller: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    slug: 'macbook-air-m2',
    description: 'Ultra-thin laptop with M2 chip, all-day battery life, and stunning Retina display',
    price: 1099.99,
    sku: 'MACBOOK-AIR-M2',
    stock: 23,
    isInStock: true,
    images: [
      { id: '2-1', url: '/images/products/macbook-air-m2-1.jpg', alt: 'MacBook Air M2', isPrimary: true, order: 1 },
      { id: '2-2', url: '/images/products/macbook-air-m2-2.jpg', alt: 'MacBook Air M2', isPrimary: false, order: 2 }
    ],
    categoryId: 'laptops',
    category: { id: 'laptops', name: 'Laptops', slug: 'laptops' },
    tags: ['laptop', 'apple', 'macbook', 'm2'],
    reviews: [],
    averageRating: 4.9,
    totalReviews: 892,
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    isBestSeller: true,
    createdAt: '2023-12-10T10:00:00Z',
    updatedAt: '2023-12-10T10:00:00Z'
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Premium noise-canceling headphones with exceptional sound quality',
    price: 349.99,
    originalPrice: 399.99,
    sku: 'SONY-WH-1000XM5',
    stock: 67,
    isInStock: true,
    images: [
      { id: '3-1', url: '/images/products/sony-wh-1000xm5-1.jpg', alt: 'Sony WH-1000XM5', isPrimary: true, order: 1 },
      { id: '3-2', url: '/images/products/sony-wh-1000xm5-2.jpg', alt: 'Sony WH-1000XM5', isPrimary: false, order: 2 }
    ],
    categoryId: 'headphones',
    category: { id: 'headphones', name: 'Headphones', slug: 'headphones' },
    tags: ['headphones', 'sony', 'noise-canceling', 'wireless'],
    reviews: [],
    averageRating: 4.7,
    totalReviews: 1563,
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    isBestSeller: true,
    createdAt: '2023-11-20T10:00:00Z',
    updatedAt: '2023-11-20T10:00:00Z'
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Flagship Android phone with S Pen, advanced AI features, and pro-grade camera',
    price: 1299.99,
    sku: 'SAMSUNG-S24-ULTRA',
    stock: 34,
    isInStock: true,
    images: [
      { id: '4-1', url: '/images/products/samsung-s24-ultra-1.jpg', alt: 'Samsung Galaxy S24 Ultra', isPrimary: true, order: 1 },
      { id: '4-2', url: '/images/products/samsung-s24-ultra-2.jpg', alt: 'Samsung Galaxy S24 Ultra', isPrimary: false, order: 2 }
    ],
    categoryId: 'smartphones',
    category: { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' },
    tags: ['smartphone', 'samsung', 'android', 's-pen'],
    reviews: [],
    averageRating: 4.6,
    totalReviews: 743,
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    isBestSeller: false,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '5',
    name: 'Dell XPS 13 Plus',
    slug: 'dell-xps-13-plus',
    description: 'Premium ultrabook with 13th Gen Intel processor and edge-to-edge display',
    price: 1299.99,
    originalPrice: 1499.99,
    sku: 'DELL-XPS-13-PLUS',
    stock: 12,
    isInStock: true,
    images: [
      { id: '5-1', url: '/images/products/dell-xps-13-plus-1.jpg', alt: 'Dell XPS 13 Plus', isPrimary: true, order: 1 },
      { id: '5-2', url: '/images/products/dell-xps-13-plus-2.jpg', alt: 'Dell XPS 13 Plus', isPrimary: false, order: 2 }
    ],
    categoryId: 'laptops',
    category: { id: 'laptops', name: 'Laptops', slug: 'laptops' },
    tags: ['laptop', 'dell', 'xps', 'ultrabook'],
    reviews: [],
    averageRating: 4.5,
    totalReviews: 456,
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    isNew: false,
    isBestSeller: false,
    createdAt: '2023-10-15T10:00:00Z',
    updatedAt: '2023-10-15T10:00:00Z'
  },
  {
    id: '6',
    name: 'AirPods Pro 2nd Gen',
    slug: 'airpods-pro-2nd-gen',
    description: 'Active noise cancellation, spatial audio, and sweat and water resistance',
    price: 249.99,
    originalPrice: 279.99,
    sku: 'AIRPODS-PRO-2',
    stock: 89,
    isInStock: true,
    images: [
      { id: '6-1', url: '/images/products/airpods-pro-2-1.jpg', alt: 'AirPods Pro 2nd Gen', isPrimary: true, order: 1 },
      { id: '6-2', url: '/images/products/airpods-pro-2-2.jpg', alt: 'AirPods Pro 2nd Gen', isPrimary: false, order: 2 }
    ],
    categoryId: 'headphones',
    category: { id: 'headphones', name: 'Headphones', slug: 'headphones' },
    tags: ['earbuds', 'apple', 'airpods', 'wireless'],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 2341,
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    isNew: false,
    isBestSeller: true,
    createdAt: '2023-09-10T10:00:00Z',
    updatedAt: '2023-09-10T10:00:00Z'
  },
  {
    id: '7',
    name: 'iPad Pro 12.9-inch',
    slug: 'ipad-pro-12-9-inch',
    description: 'Most powerful iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support',
    price: 1099.99,
    sku: 'IPAD-PRO-12-9',
    stock: 28,
    isInStock: true,
    images: [
      { id: '7-1', url: '/images/products/ipad-pro-12-9-1.jpg', alt: 'iPad Pro 12.9-inch', isPrimary: true, order: 1 },
      { id: '7-2', url: '/images/products/ipad-pro-12-9-2.jpg', alt: 'iPad Pro 12.9-inch', isPrimary: false, order: 2 }
    ],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
    tags: ['tablet', 'apple', 'ipad', 'm2'],
    reviews: [],
    averageRating: 4.7,
    totalReviews: 678,
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    isNew: false,
    isBestSeller: true,
    createdAt: '2023-08-25T10:00:00Z',
    updatedAt: '2023-08-25T10:00:00Z'
  },
  {
    id: '8',
    name: 'Bose QuietComfort 45',
    slug: 'bose-quietcomfort-45',
    description: 'Premium comfort headphones with world-class noise cancellation',
    price: 329.99,
    originalPrice: 379.99,
    sku: 'BOSE-QC45',
    stock: 41,
    isInStock: true,
    images: [
      { id: '8-1', url: '/images/products/bose-qc45-1.jpg', alt: 'Bose QuietComfort 45', isPrimary: true, order: 1 },
      { id: '8-2', url: '/images/products/bose-qc45-2.jpg', alt: 'Bose QuietComfort 45', isPrimary: false, order: 2 }
    ],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
    tags: ['headphones', 'bose', 'noise-canceling', 'comfort'],
    reviews: [],
    averageRating: 4.6,
    totalReviews: 945,
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    isNew: false,
    isBestSeller: false,
    createdAt: '2023-07-20T10:00:00Z',
    updatedAt: '2023-07-20T10:00:00Z'
  },
  {
    id: '9',
    name: 'Google Pixel 8 Pro',
    slug: 'google-pixel-8-pro',
    description: 'AI-powered camera system, Google Tensor G3 chip, and advanced photo editing',
    price: 999.99,
    originalPrice: 1099.99,
    sku: 'GOOGLE-PIXEL-8-PRO',
    stock: 19,
    isInStock: true,
    images: [
      { id: '9-1', url: '/images/products/google-pixel-8-pro-1.jpg', alt: 'Google Pixel 8 Pro', isPrimary: true, order: 1 },
      { id: '9-2', url: '/images/products/google-pixel-8-pro-2.jpg', alt: 'Google Pixel 8 Pro', isPrimary: false, order: 2 }
    ],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
    tags: ['smartphone', 'google', 'pixel', 'android'],
    reviews: [],
    averageRating: 4.5,
    totalReviews: 567,
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    isNew: false,
    isBestSeller: false,
    createdAt: '2023-10-05T10:00:00Z',
    updatedAt: '2023-10-05T10:00:00Z'
  },
  {
    id: '10',
    name: 'Lenovo ThinkPad X1 Carbon',
    slug: 'lenovo-thinkpad-x1-carbon',
    description: 'Business ultrabook with Intel vPro, military-grade durability, and all-day battery',
    price: 1499.99,
    sku: 'LENOVO-X1-CARBON',
    stock: 8,
    isInStock: true,
    images: [
      { id: '10-1', url: '/images/products/lenovo-x1-carbon-1.jpg', alt: 'Lenovo ThinkPad X1 Carbon', isPrimary: true, order: 1 },
      { id: '10-2', url: '/images/products/lenovo-x1-carbon-2.jpg', alt: 'Lenovo ThinkPad X1 Carbon', isPrimary: false, order: 2 }
    ],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
    tags: ['laptop', 'lenovo', 'thinkpad', 'business'],
    reviews: [],
    averageRating: 4.4,
    totalReviews: 234,
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    isNew: false,
    isBestSeller: false,
    createdAt: '2023-09-15T10:00:00Z',
    updatedAt: '2023-09-15T10:00:00Z'
  },
  {
    id: '11',
    name: 'Samsung Galaxy Buds2 Pro',
    slug: 'samsung-galaxy-buds2-pro',
    description: 'Premium wireless earbuds with active noise cancellation and 360 Audio',
    price: 199.99,
    originalPrice: 229.99,
    sku: 'SAMSUNG-BUDS2-PRO',
    stock: 56,
    isInStock: true,
    images: [
      { id: '11-1', url: '/images/products/samsung-buds2-pro-1.jpg', alt: 'Samsung Galaxy Buds2 Pro', isPrimary: true, order: 1 },
      { id: '11-2', url: '/images/products/samsung-buds2-pro-2.jpg', alt: 'Samsung Galaxy Buds2 Pro', isPrimary: false, order: 2 }
    ],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
    tags: ['earbuds', 'samsung', 'wireless', 'noise-canceling'],
    reviews: [],
    averageRating: 4.3,
    totalReviews: 789,
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    isNew: false,
    isBestSeller: false,
    createdAt: '2023-08-10T10:00:00Z',
    updatedAt: '2023-08-10T10:00:00Z'
  },
  {
    id: '12',
    name: 'Apple Watch Series 9',
    slug: 'apple-watch-series-9',
    description: 'Advanced health monitoring, faster S9 chip, and new Double Tap gesture',
    price: 399.99,
    sku: 'APPLE-WATCH-SERIES-9',
    stock: 73,
    isInStock: true,
    images: [
      { id: '12-1', url: '/images/products/apple-watch-series-9-1.jpg', alt: 'Apple Watch Series 9', isPrimary: true, order: 1 },
      { id: '12-2', url: '/images/products/apple-watch-series-9-2.jpg', alt: 'Apple Watch Series 9', isPrimary: false, order: 2 }
    ],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
    tags: ['smartwatch', 'apple', 'health', 'fitness'],
    reviews: [],
    averageRating: 4.8,
    totalReviews: 1234,
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    isNew: true,
    isBestSeller: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  }
]

/**
 * Get products by category slug
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  return mockElectronicsProducts.filter(product => 
    product.category.slug === categorySlug
  )
}

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return mockElectronicsProducts
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find(category => category.slug === slug)
}

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return mockCategories
} 

/**
 * Get search suggestions based on query
 */
export function getSearchSuggestions(query: string, limit = 5): string[] {
  if (!query.trim()) return []
  
  const allProducts = getAllProducts()
  const suggestions = new Set<string>()
  
  const searchTerm = query.toLowerCase()
  
  // Add product names that match
  allProducts.forEach(product => {
    if (product.name.toLowerCase().includes(searchTerm)) {
      suggestions.add(product.name)
    }
  })
  
  // Add category names that match
  const categories = getAllCategories()
  categories.forEach(category => {
    if (category.name.toLowerCase().includes(searchTerm)) {
      suggestions.add(`${category.name} kategorisi`)
    }
  })
  
  // Add common search terms
  const commonTerms = ['telefon', 'laptop', 'kulaklık', 'tablet', 'akıllı', 'elektronik']
  commonTerms.forEach(term => {
    if (term.includes(searchTerm)) {
      suggestions.add(term)
    }
  })
  
  return Array.from(suggestions).slice(0, limit)
} 