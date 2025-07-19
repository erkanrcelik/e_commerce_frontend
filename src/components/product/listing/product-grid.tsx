'use client'

import type { Product } from '@/types/product'

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
 * Displays products in a responsive grid layout.
 * 
 * Features:
 * - Responsive grid layout
 * - Campaign indicators
 * - Hover effects
 * - Loading states
 * 
 * @example
 * ```tsx
 * <ProductGrid
 *   products={filteredProducts}
 *   showCampaigns={true}
 * />
 * ```
 */
export function ProductGrid({
  products,
  className
}: ProductGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className || ''}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showQuickView={true}
          showWishlist={true}
        />
      ))}
    </div>
  )
} 