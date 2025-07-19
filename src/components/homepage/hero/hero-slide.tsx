import { ArrowRight, Clock, Play, ShoppingBag, Star, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Campaign } from '@/types/campaign'

/**
 * Hero Slide Props
 */
interface HeroSlideProps {
  /** Campaign data to display */
  campaign: Campaign
  /** Additional CSS classes */
  className?: string
}

/**
 * Hero Slide Component
 * 
 * Displays a single campaign slide in the hero carousel.
 * Features rich content layout with campaign details and CTAs.
 * 
 * Features:
 * - Campaign image with gradient fallback
 * - Campaign type badges (Flash Sale, Daily Deal)
 * - Discount information display
 * - Multiple CTA buttons
 * - Trust indicators
 * - Floating product cards (desktop)
 * - Responsive design
 * - Interactive animations
 * 
 * @example
 * ```tsx
 * <HeroSlide
 *   campaign={campaignData}
 *   className="custom-styles"
 * />
 * ```
 */
export function HeroSlide({ campaign, className }: HeroSlideProps) {
  const isFlashSale = campaign.type === 'flash_sale'
  const isDailyDeal = campaign.type === 'daily_deal'

  return (
    <div className={`relative min-h-[45vh] lg:min-h-[55vh] flex items-center justify-center overflow-hidden ${className || ''}`}>
      {/* Background */}
      {campaign.bannerImage ? (
        <div className="absolute inset-0">
          <Image
            src={campaign.bannerImage}
            alt={campaign.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : (
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${campaign.backgroundColor || '#f97316'}, ${campaign.backgroundColor || '#f59e0b'})`,
          }}
        />
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8 text-white">
              {/* Campaign Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {isFlashSale && <Zap className="w-4 h-4" />}
                {isDailyDeal && <Clock className="w-4 h-4" />}
                <span>
                  {isFlashSale && 'Flash Sale'}
                  {isDailyDeal && 'Daily Deal'}
                  {!isFlashSale && !isDailyDeal && 'Special Offer'}
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {campaign.title}
                </h1>

                <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {campaign.description}
                </p>
              </div>

              {/* Discount Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <Badge className="text-2xl sm:text-3xl font-bold px-6 py-3 bg-red-500 hover:bg-red-600">
                  {campaign.discountType === 'percentage' 
                    ? `${campaign.discountValue}% OFF`
                    : `$${campaign.discountValue} OFF`
                  }
                </Badge>
                {campaign.usageLimit && (
                  <div className="text-white/80 text-sm">
                    <div className="font-semibold">Limited Time!</div>
                    <div>{campaign.usageLimit - campaign.usedCount} left</div>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href={`/campaigns/${campaign.slug}`}>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 hover:border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-3 rounded-full transition-all duration-300"
                  asChild
                >
                  <Link href="#featured-products">
                    <Play className="w-5 h-5 mr-2" />
                    Learn More
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Elements */}
            <div className="relative hidden lg:block">
              <div className="relative max-w-lg mx-auto">
                {/* Floating Product Cards */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="space-y-4">
                    {/* Featured Product Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">Premium Products</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Starting at $19.99</div>
                        </div>
                      </div>
                    </div>

                    {/* Rating Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300 ml-8">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">4.9</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">(50k+ reviews)</span>
                      </div>
                    </div>

                    {/* Campaign Info Card */}
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-4 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 mr-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {campaign.discountType === 'percentage' 
                            ? `${campaign.discountValue}% OFF`
                            : `$${campaign.discountValue} OFF`
                          }
                        </div>
                        <div className="text-sm opacity-90">Limited Time</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-gray-900 dark:text-white">Live deal!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 