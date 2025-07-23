import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { Product } from '@/types/customer-product'

import { ProductCard } from './product-card'

/**
 * Related Products Props
 */
interface RelatedProductsProps {
  /** Related products to display */
  products: Product[]
}

/**
 * Related Products Component
 *
 * Displays related products in a carousel format using ProductCard.
 *
 * Features:
 * - Product carousel with ProductCard
 * - Navigation arrows
 * - Responsive design
 *
 * @example
 * ```tsx
 * <RelatedProducts products={relatedProducts} />
 * ```
 */
export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Related Products
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            showWishlist={true}
            showAddToCart={true}
          />
        ))}
      </div>
    </div>
  )
}
