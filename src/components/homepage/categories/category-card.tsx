import Image from 'next/image'
import Link from 'next/link'

import type { Category } from '@/types/product'

/**
 * Category Card Props
 */
interface CategoryCardProps {
  /** Category data to display */
  category: Category
  /** Additional CSS classes */
  className?: string
  /** Click handler for analytics */
  onClick?: (category: Category) => void
}

/**
 * Category Card Component
 * 
 * Displays a single category with image and overlay text.
 * Features hover effects and responsive design.
 * 
 * Features:
 * - Category image with placeholder fallback
 * - Overlay text with smooth transitions
 * - Hover animations and effects
 * - Responsive sizing
 * - Yellow text highlight on hover
 * - Border effect on hover
 * 
 * @example
 * ```tsx
 * <CategoryCard
 *   category={categoryData}
 *   onClick={(category) => trackClick(category)}
 * />
 * ```
 */
export function CategoryCard({ 
  category, 
  className,
  onClick 
}: CategoryCardProps) {
  /**
   * Handle category card click
   */
  const handleCategoryClick = () => {
    if (onClick) {
      onClick(category)
    }
    // Analytics tracking could go here
    // console.log('Category clicked:', category.name)
  }

  return (
    <Link 
      href={`/categories/${category.slug}`} 
      onClick={handleCategoryClick}
      className={`group block ${className || ''}`}
    >
      <div className="relative h-[140px] sm:h-[160px] lg:h-[180px] overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
        {/* Category Image */}
        <Image
          src={category.image || '/placeholder-category.jpg'}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 300px"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
        
        {/* Category Name Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl text-center px-4 group-hover:text-yellow-300 transition-colors duration-300">
            {category.name}
          </h3>
        </div>
        
        {/* Hover Effect Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-colors duration-300" />
      </div>
    </Link>
  )
} 