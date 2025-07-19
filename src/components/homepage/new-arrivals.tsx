
import { SectionHeader } from '@/components/custom/section-header'
import { ProductCarousel } from '@/components/product/product-carousel'
import type { Product } from '@/types/product'

/**
 * New Arrivals Section Props
 */
interface NewArrivalsProps {
  /** Array of new arrival products to display */
  products: Product[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * New Arrivals Section Component
 * 
 * Displays new arrival products in a horizontal carousel layout.
 * Used to showcase the latest products added to the catalog.
 * 
 * Features:
 * - Horizontal product carousel
 * - Section header with view all link
 * - Responsive design
 * - Purple theme integration
 * - Product interaction callbacks
 * 
 * @example
 * ```tsx
 * <NewArrivals
 *   products={newProducts}
 *   title="New Arrivals"
 *   subtitle="Fresh products just landed"
 * />
 * ```
 */
export function NewArrivals({ 
  products, 
  title = "New Arrivals", 
  subtitle,
  className
}: NewArrivalsProps) {
  return (
    <section className={`py-6 bg-white dark:bg-gray-950 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllHref="/products/new"
          viewAllText="View All"
        />

        {/* Products Carousel */}
        <ProductCarousel
          products={products}
          showNavigation={true}
          className="!py-0"
        />
      </div>
    </section>
  )
} 