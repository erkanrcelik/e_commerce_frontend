
import { SectionHeader } from '@/components/custom/section-header'
import { ProductCarousel } from '@/components/product/shared/product-carousel'
import type { Product } from '@/types/product'

/**
 * New Arrivals Props
 */
interface NewArrivalsProps {
  /** New arrival products to display */
  products: Product[]
}

/**
 * New Arrivals Component
 * 
 * Displays new arrival products in a carousel format.
 * 
 * Features:
 * - Product carousel with navigation
 * - New arrival highlighting
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <NewArrivals products={newProducts} />
 * ```
 */
export function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Yeni Gelenler"
        />
        
        <div className="mt-12">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  )
} 