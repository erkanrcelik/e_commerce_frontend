import { SectionHeader } from '@/components/custom/section-header'
import { ProductCarousel } from '@/components/product/shared/product-carousel'
import type { Product } from '@/types/customer-product'

/**
 * New Arrivals Props
 */
interface NewArrivalsProps {
  /** New arrival products to display */
  products: Product[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
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
export function NewArrivals({
  products,
  title = 'New Arrivals',
  subtitle,
}: NewArrivalsProps) {
  // Don't render if no products
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="mt-12">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  )
}
