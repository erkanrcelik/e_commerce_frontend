'use client'


import { SectionHeader } from '@/components/custom/section-header'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Category } from '@/types/product'

import { CategoryCard } from './category-card'

/**
 * Categories Carousel Section Props
 */
interface CategoriesCarouselProps {
  /** Array of categories to display */
  categories: Category[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * Categories Grid/Carousel Section Component
 * 
 * Displays product categories in a horizontal scrollable carousel using Shadcn Carousel.
 * Used to showcase product categories with engaging visual design.
 * 
 * Features:
 * - Horizontal category carousel using Shadcn
 * - Section header with view all link
 * - Category click tracking
 * - Responsive design
 * - Touch/swipe support
 * - Navigation buttons positioned on sides
 * - Mobile scroll hint
 * 
 * @example
 * ```tsx
 * <CategoriesGrid
 *   categories={featuredCategories}
 *   title="Shop by Category"
 *   subtitle="Explore our product range"
 * />
 * ```
 */
export function CategoriesGrid({ 
  categories, 
  title = "Shop by Category", 
  subtitle,
  className
}: CategoriesCarouselProps) {
  return (
    <section className={`py-6 bg-gray-50 dark:bg-gray-900 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllHref="/categories"
          viewAllText="View All"
        />

        {/* Categories Carousel */}
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
            <CarouselContent className="-ml-4">
              {categories.map((category) => (
                <CarouselItem 
                  key={category.id} 
                  className="pl-4 basis-[200px] sm:basis-[250px] lg:basis-[300px]"
                >
                  <CategoryCard 
                    category={category} 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 border shadow-lg hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 border shadow-lg hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm" />
          </Carousel>
        </div>
      </div>
    </section>
  )
} 