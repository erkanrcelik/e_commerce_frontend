'use client'


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Product } from '@/types/product'

import { ProductCard } from './product-card'

/**
 * Product Carousel Props
 */
interface ProductCarouselProps {
  /** Array of products to display in the carousel */
  products: Product[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Whether to show navigation arrows */
  showNavigation?: boolean
  /** Additional CSS classes */
  className?: string
  /** Callback when a product is added to cart */
  onAddToCart?: (product: Product) => void
  /** Callback when quick view is triggered */
  onQuickView?: (product: Product) => void
  /** Callback when wishlist is toggled */
  onWishlist?: (product: Product) => void
}

/**
 * Product Carousel Component
 * 
 * Displays a horizontal scrollable list of products in a carousel format.
 * Supports responsive design with different item counts per screen size.
 * 
 * @example
 * ```tsx
 * <ProductCarousel
 *   products={products}
 *   title="Related Products"
 *   subtitle="You might also like these"
 *   itemsPerView={{
 *     mobile: 1,
 *     tablet: 2,
 *     desktop: 4,
 *     large: 5
 *   }}
 *   showNavigation={true}
 *   onAddToCart={handleAddToCart}
 * />
 * ```
 */
export function ProductCarousel({
  products,
  title,
  subtitle,
  showNavigation = true,
  className,
  onAddToCart,
  onQuickView,
  onWishlist,
}: ProductCarouselProps) {
  // Don't render if no products
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className={`py-8 ${className || ''}`}>
      <div className="w-full">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-300">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Product Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              skipSnaps: false,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product, index) => (
                <CarouselItem
                  key={`product-${product.id}-${index}`}
                  className="pl-2 md:pl-4 basis-[240px] sm:basis-[260px] md:basis-[280px] lg:basis-[240px]"
                >
                  <div className="h-full">
                    <ProductCard
                      product={product}
                      onAddToCart={onAddToCart}
                      onQuickView={onQuickView}
                      onWishlist={onWishlist}
                      className="h-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            {showNavigation && products.length > 1 && (
              <>
                <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 border shadow-lg hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm" />
                <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 border shadow-lg hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm" />
              </>
            )}
          </Carousel>
        </div>

      
      </div>
    </section>
  )
}

/**
 * Product Carousel Container Props
 */
interface ProductCarouselContainerProps {
  /** Array of products to display */
  products: Product[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Maximum number of products to show */
  maxProducts?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * Product Carousel Container
 * 
 * A wrapper component that provides default styling and responsive behavior
 * for the ProductCarousel component with common e-commerce use cases.
 * 
 * @example
 * ```tsx
 * <ProductCarouselContainer
 *   products={relatedProducts}
 *   title="Related Products"
 *   maxProducts={20}
 * />
 * ```
 */
export function ProductCarouselContainer({
  products,
  title = "Featured Products",
  subtitle,
  maxProducts = 20,
  className,
}: ProductCarouselContainerProps) {
  // Limit products to maxProducts
  const limitedProducts = products.slice(0, maxProducts)

  return (
    <div className={`bg-white dark:bg-gray-950 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductCarousel
          products={limitedProducts}
          title={title}
          subtitle={subtitle}
          showNavigation={true}
        />
      </div>
    </div>
  )
} 