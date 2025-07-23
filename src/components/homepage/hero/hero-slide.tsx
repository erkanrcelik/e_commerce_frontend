import Link from 'next/link'

import type { Campaign } from '@/types/customer-campaign'

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
 * Simple design with campaign image and name overlay.
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
  return (
    <Link href={`/campaigns/${campaign._id}`}>
      <div
        className={`relative min-h-[45vh] lg:min-h-[55vh] flex items-center justify-center overflow-hidden cursor-pointer ${className || ''}`}
      >
        {/* Background Image */}
        {campaign.imageUrl ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${campaign.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, #f97316, #f59e0b)`,
            }}
          />
        )}

        {/* Campaign Name Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            {campaign.name}
          </h1>
        </div>
      </div>
    </Link>
  )
}
