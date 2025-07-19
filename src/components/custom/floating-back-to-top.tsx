'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

/**
 * Floating Back to Top Button Component
 * 
 * A floating action button that appears when user scrolls down and 
 * smoothly scrolls back to top when clicked. Always visible on bottom right.
 * 
 * Features:
 * - Appears after scrolling 300px
 * - Smooth scroll animation
 * - Fixed position (bottom right)
 * - Accessible design
 * - Hover effects
 * 
 * @example
 * ```tsx
 * <FloatingBackToTop />
 * ```
 */
export function FloatingBackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  /**
   * Handle scroll event to show/hide button
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsVisible(scrollTop > 300) // Show after 300px scroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Handle scroll to top action
   */
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Don't render if not visible
  if (!isVisible) return null

  return (
    <Button
      onClick={handleScrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 
        w-12 h-12 p-0 rounded-full 
        bg-gradient-to-r from-purple-600 to-blue-600 
        hover:from-purple-700 hover:to-blue-700 
        text-white shadow-lg hover:shadow-xl 
        transition-all duration-300 
        transform hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
      `}
      aria-label="Scroll back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  )
} 