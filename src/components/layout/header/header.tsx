'use client'

import { Zap } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { useLayoutVisibility } from '@/hooks/use-layout'
import { CustomerCategoryService } from '@/services/customer-category.service'
import type { Category } from '@/types/customer-category'

// Import header sub-components
import Image from 'next/image'
import { ShoppingCartMenu } from './cart-menu'
import { MobileMenu } from './mobile-menu'
import { MobileSearchButton } from './mobile-search-button'
import { SearchBar } from './search-bar'
import { UserAccountMenu } from './user-menu'

/**
 * Header Props
 */
interface HeaderProps {
  /** Override layout configuration */
  layoutOverride?: {
    showTopBanner?: boolean
    showNavigation?: boolean
  }
}

/**
 * Header Component
 *
 * Main navigation header containing logo, search, user actions, and navigation.
 * Responsive design with mobile menu support and category navigation.
 * Features scroll-based navigation hiding for better UX.
 *
 * Features:
 * - Logo and branding
 * - Search functionality with category filtering
 * - User authentication menu
 * - Shopping cart with item count
 * - Mobile-responsive navigation
 * - Category navigation bar
 * - Conditional top banner and navigation
 * - Scroll-based navigation hiding with improved debounce
 *
 * @example
 * ```tsx
 * // Default header (follows route-based config)
 * <Header />
 *
 * // Override specific elements
 * <Header layoutOverride={{ showTopBanner: false }} />
 * ```
 */
export function Header({ layoutOverride }: HeaderProps = {}) {
  const { showTopBanner, showNavigation } = useLayoutVisibility(layoutOverride)
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  /**
   * Improved scroll handler with higher threshold and better debouncing
   */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    // Increased threshold to prevent small scroll movements from triggering
    const shouldBeScrolled = scrollY > 100

    // Only update state if the value actually changed
    setIsScrolled(prev => {
      if (prev !== shouldBeScrolled) {
        return shouldBeScrolled
      }
      return prev
    })
  }, [])

  /**
   * Handle scroll event with improved debounce to prevent excessive re-renders
   */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let lastScrollY = window.scrollY

    const debouncedScrollHandler = () => {
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(currentScrollY - lastScrollY)

      // Only trigger if scroll difference is significant (prevents micro-movements)
      if (scrollDifference > 5) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          handleScroll()
          lastScrollY = currentScrollY
        }, 50) // Increased debounce time to 50ms
      }
    }

    window.addEventListener('scroll', debouncedScrollHandler, { passive: true })

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler)
      clearTimeout(timeoutId)
    }
  }, [handleScroll])

  /**
   * Load categories on component mount
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await CustomerCategoryService.getCategories({
          limit: 10,
        })
        setCategories(categoriesData.data)
      } catch (error) {
        console.error('Load user data error:', error)
        // Handle error
      }
    }

    loadCategories()
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      {/* Top Banner - Conditional */}
      {showTopBanner && (
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-10 text-white text-sm">
              <Zap className="w-4 h-4 mr-2" />
              <span className="font-medium">
                Free shipping on orders over $50 • 30-day returns
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <MobileMenu />

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="playableFactory"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  playableFactory
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Digital Experiences
                </div>
              </div>
            </Link>
          </div>

          {/* Center Section - Search (Hidden on mobile) */}
          <div className="hidden md:block flex-1 max-w-2xl mx-4">
            <SearchBar />
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <div className="md:hidden">
              <MobileSearchButton />
            </div>

            {/* Shopping Cart */}
            <ShoppingCartMenu />

            {/* User Account */}
            <UserAccountMenu />
          </div>
        </div>
      </div>

      {/* Quick Navigation - Conditional and Scroll-based */}
      {showNavigation && (
        <div
          className={`border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 transition-all duration-500 ease-in-out overflow-hidden ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
          }`}
          style={{
            willChange: 'max-height, opacity',
            transform: 'translateZ(0)', // Force hardware acceleration
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-12">
              {/* Centered Categories List */}
              <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                {/* All Categories Link */}
                <Link
                  href="/categories"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors whitespace-nowrap"
                >
                  All Categories
                </Link>

                {/* Category Links */}
                {categories.slice(0, 10).map(category => (
                  <Link
                    key={category._id}
                    href={`/categories/${category._id}`}
                    className="text-sm font-medium hover:text-purple-600 transition-colors whitespace-nowrap"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
