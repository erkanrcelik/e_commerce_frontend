'use client'

import type { Product } from '@/types/customer-product'

import { ProductCard } from '../shared/product-card'

/**
 * Product Grid Props
 */
interface ProductGridProps {
  /** Products to display */
  products: Product[]
  /** Show campaign indicators */
  showCampaigns?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Product Grid Component
 *
 * Displays products in a responsive grid layout optimized for mobile.
 *
 * Features:
 * - Mobile-first responsive grid (2 columns on mobile)
 * - Responsive grid layout
 * - Campaign indicators
 * - Hover effects
 * - Loading states
 * - Optimized spacing for mobile
 *
 * @example
 * ```tsx
 * <ProductGrid
 *   products={filteredProducts}
 *   showCampaigns={true}
 * />
 * ```
 */
export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-stretch ${className || ''}`}
    >
      {products.map(product => (
        <div key={product._id} className="h-full">
          <ProductCard
            product={product}
            showWishlist={true}
            showAddToCart={true}
          />
        </div>
      ))}
    </div>
  )
}
