
import { SectionHeader } from '@/components/custom/section-header'
import { ProductCarousel } from '@/components/product/shared/product-carousel'
import type { Product } from '@/types/product'

/**
 * Featured Products Props
 */
interface FeaturedProductsProps {
  /** Featured products to display */
  products: Product[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
}

/**
 * Featured Products Component
 * 
 * Displays featured products in a carousel format.
 * 
 * Features:
 * - Product carousel with navigation
 * - Featured product highlighting
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <FeaturedProducts products={featuredProducts} />
 * ```
 */
export function FeaturedProducts({ products, title = "Featured Products", subtitle }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
        />
        
        <div className="mt-12">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  )
} 