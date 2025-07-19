import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

/**
 * Section Header Props
 */
interface SectionHeaderProps {
  /** Section title */
  title: string
  /** Optional subtitle/description */
  subtitle?: string
  /** "View all" link URL */
  viewAllHref?: string
  /** Custom "View all" link text */
  viewAllText?: string
  /** Hide view all link */
  hideViewAll?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Section Header Component
 * 
 * Reusable header component for sections with title, subtitle and optional "view all" link.
 * Used across multiple sections like Featured Products, New Arrivals, etc.
 * 
 * Features:
 * - Configurable title and subtitle
 * - Optional "view all" link with hover animations
 * - Responsive typography
 * - Purple theme integration
 * - Flexible layout
 * 
 * @example
 * ```tsx
 * <SectionHeader
 *   title="Featured Products"
 *   subtitle="Discover our handpicked selection"
 *   viewAllHref="/products"
 *   viewAllText="View All"
 * />
 * ```
 */
export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllText = "View All",
  hideViewAll = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-8 ${className || ''}`}>
      {/* Title and Subtitle */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* View All Link */}
      {!hideViewAll && viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          {viewAllText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
} 