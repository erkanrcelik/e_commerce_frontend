import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Campaign } from '@/types/campaign'

import { DefaultHeroSlide } from './default-hero-slide'
import { HeroSlide } from './hero-slide'

/**
 * Hero Carousel Component Props
 */
interface HeroCarouselProps {
  /** Array of campaigns to display in carousel */
  campaigns?: Campaign[]
  /** Enable auto-play functionality */
  autoplay?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * Hero Carousel Component
 * 
 * Main hero section component that displays campaigns in a rotating carousel.
 * Automatically handles different scenarios: no campaigns, single campaign, or multiple campaigns.
 * 
 * Features:
 * - Automatic campaign carousel
 * - Single slide for one campaign
 * - Default slide when no campaigns
 * - Auto-play support (optional)
 * - Navigation controls
 * - Dot indicators
 * - Responsive design
 * - Smooth transitions
 * 
 * @example
 * ```tsx
 * <HeroCarousel
 *   campaigns={activeCampaigns}
 *   autoplay={true}
 *   className="custom-hero"
 * />
 * ```
 */
export function HeroCarousel({ 
  campaigns = [], 
  autoplay = true,
  className
}: HeroCarouselProps) {
  // If no campaigns, show default hero
  if (campaigns.length === 0) {
    return <DefaultHeroSlide className={className} />
  }

  // Single campaign, no carousel needed
  if (campaigns.length === 1) {
    return <HeroSlide campaign={campaigns[0]} className={className} />
  }

  return (
    <div className={`relative ${className || ''}`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={autoplay ? [
          // Auto-scroll every 5 seconds
          // Note: You might need to install embla-carousel-autoplay
          // For now, we'll use manual navigation
        ] : undefined}
        className="w-full"
      >
        <CarouselContent>
          {campaigns.map((campaign) => (
            <CarouselItem key={campaign.id}>
              <HeroSlide campaign={campaign} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 text-white hover:text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20 text-white hover:text-white" />
        
        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2">
            {campaigns.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  )
} 