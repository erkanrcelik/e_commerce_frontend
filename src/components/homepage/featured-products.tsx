
import { SectionHeader } from '@/components/custom/section-header'
import { ProductCarousel } from '@/components/product/product-carousel'
import type { Product } from '@/types/product'

/**
 * Featured Products Section Props
 */
interface FeaturedProductsProps {
  /** Array of featured products to display */
  products: Product[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Featured Products Section Component
 * 
 * Displays featured products in a horizontal carousel layout.
 * Used to showcase the most important and popular products.
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
 * <FeaturedProducts
 *   products={featuredProducts}
 *   title="Featured Products"
 *   subtitle="Discover our handpicked selection"
 * />
 * ```
 */
export function FeaturedProducts({ 
  products, 
  title = "Featured Products", 
  subtitle,
  className 
}: FeaturedProductsProps) {
  return (
    <section className={`py-6 bg-white dark:bg-gray-950 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllHref="/products"
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