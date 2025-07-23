'use client'

import { ArrowUp } from 'lucide-react'

/**
 * Back to Top Button Component
 *
 * Provides smooth scroll to top functionality.
 * Helps users quickly return to page top from footer.
 *
 * Features:
 * - Smooth scroll animation
 * - Accessible button
 * - Hover effects
 * - Full-width design
 *
 * @example
 * ```tsx
 * <BackToTop />
 * ```
 */
export function BackToTop() {
  /**
   * Handle scroll to top action
   * Uses smooth scroll behavior for better user experience
   */
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="bg-gray-700 hover:bg-gray-600 transition-colors">
      <div className="container mx-auto px-4">
        <button
          onClick={handleScrollToTop}
          className="w-full py-4 flex items-center justify-center gap-2 text-white hover:text-orange-400 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-700"
          aria-label="Scroll back to top of page"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-sm font-medium">Back to top</span>
        </button>
      </div>
    </div>
  )
}
