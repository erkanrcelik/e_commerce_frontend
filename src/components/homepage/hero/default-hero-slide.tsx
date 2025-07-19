import { ArrowRight, Play, ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

/**
 * Default Hero Slide Props
 */
interface DefaultHeroSlideProps {
  /** Additional CSS classes */
  className?: string
}

/**
 * Default Hero Slide Component
 * 
 * Displays the default hero content when no campaigns are available.
 * Features brand messaging and general CTAs for the homepage.
 * 
 * Features:
 * - Gradient background with pattern
 * - Brand messaging and value proposition
 * - Trust indicators and statistics
 * - Multiple CTA buttons
 * - Floating product cards (desktop)
 * - Responsive typography
 * - Orange/amber brand colors
 * - Interactive animations
 * 
 * @example
 * ```tsx
 * <DefaultHeroSlide className="custom-styles" />
 * ```
 */
export function DefaultHeroSlide({ className }: DefaultHeroSlideProps) {
  return (
    <div className={`relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${className || ''}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by 50,000+ customers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:to-gray-100 bg-clip-text text-transparent">
              Discover
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
              Amazing Products
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:to-gray-100 bg-clip-text text-transparent">
              Every Day
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Shop the latest trends, discover unique finds, and enjoy unbeatable deals on thousands of products from trusted sellers worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="#featured-products">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-200 hover:border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950/30 font-semibold px-8 py-3 rounded-full transition-all duration-300"
              asChild
            >
              <Link href="#categories">
                <Play className="w-5 h-5 mr-2" />
                Explore Categories
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 