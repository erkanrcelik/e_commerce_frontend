'use client'

import { Clock, Store, Tag, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Campaign } from '@/types/customer-campaign'

/**
 * Campaign Card Props
 */
interface CampaignCardProps {
  /** Campaign data to display */
  campaign: Campaign
  /** Additional CSS classes */
  className?: string
  /** Click handler for analytics */
  onClick?: (campaign: Campaign) => void
}

/**
 * Campaign Card Component
 *
 * Displays a single campaign with image, title, description and discount information.
 * Features hover effects and responsive design.
 *
 * Features:
 * - Campaign image with fallback gradient
 * - Overlay content with smooth transitions
 * - Campaign type badges (Platform, Seller)
 * - Discount percentage display
 * - Time-limited campaign indicators
 * - Hover animations and effects
 * - Responsive image sizing
 *
 * @example
 * ```tsx
 * <CampaignCard
 *   campaign={campaignData}
 *   onClick={(campaign) => trackClick(campaign)}
 * />
 * ```
 */
export function CampaignCard({
  campaign,
  className,
  onClick,
}: CampaignCardProps) {
  const isPlatformCampaign = campaign.type === 'platform'
  const isSellerCampaign = campaign.type === 'seller'
  const isLimitedTime =
    campaign.endDate && new Date(campaign.endDate) > new Date()

  /**
   * Handle campaign card click
   */
  const handleCampaignClick = () => {
    if (onClick) {
      onClick(campaign)
    }
    // Analytics tracking could go here
  }

  return (
    <Link href={`/campaigns/${campaign._id}`}>
      <Card
        className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${className || ''}`}
        onClick={handleCampaignClick}
      >
        <div className="relative h-48 overflow-hidden rounded-lg">
          {/* Campaign Image */}
          {campaign.imageUrl ? (
            <Image
              src={campaign.imageUrl}
              alt={campaign.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full bg-gradient-to-br rounded-lg"
              style={{
                background: `linear-gradient(135deg, #f97316, #f59e0b)`,
              }}
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors rounded-lg" />

          {/* Campaign Type Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 text-gray-900">
              {isPlatformCampaign && (
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Platform
                </span>
              )}
              {isSellerCampaign && (
                <span className="flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  Seller
                </span>
              )}
            </Badge>
          </div>

          {/* Discount Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-red-500 text-white">
              {campaign.discountType === 'percentage'
                ? `${campaign.discountValue}% OFF`
                : `$${campaign.discountValue} OFF`}
            </Badge>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
              {campaign.name}
            </h3>
            <p className="text-white/90 text-sm mb-4 line-clamp-2">
              {campaign.description}
            </p>

            {/* Campaign Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-white/80 text-xs">
                {isLimitedTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{campaign.remainingDays} days left</span>
                  </div>
                )}
                {campaign.minOrderAmount && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>Min ${campaign.minOrderAmount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
