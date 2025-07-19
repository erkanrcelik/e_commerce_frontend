'use client'

import { Clock, Tag, Zap } from 'lucide-react'
import Image from 'next/image'

import { Card } from '@/components/ui/card'
import type { Campaign } from '@/types/campaign'

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
 * - Campaign type badges (Flash Sale, etc.)
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
  onClick 
}: CampaignCardProps) {
  const isFlashSale = campaign.type === 'flash_sale'
  const isLimitedTime = campaign.endDate && new Date(campaign.endDate) > new Date()

  /**
   * Handle campaign card click
   */
  const handleCampaignClick = () => {
    if (onClick) {
      onClick(campaign)
    }
    // Analytics tracking could go here
    // console.log('Campaign clicked:', campaign.title)
  }

  return (
    <Card 
      className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${className || ''}`}
      onClick={handleCampaignClick}
    >
      <div className="relative h-48 overflow-hidden rounded-lg">
        {/* Campaign Image */}
        {campaign.bannerImage ? (
          <Image
            src={campaign.bannerImage}
            alt={campaign.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div 
            className="w-full h-full bg-gradient-to-br rounded-lg"
            style={{ 
              background: `linear-gradient(135deg, ${campaign.backgroundColor || '#f97316'}, ${campaign.backgroundColor || '#f59e0b'})`,
            }}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors rounded-lg" />
        
        {/* Campaign Type Badge */}
        <div className="absolute top-4 left-4">
          {isFlashSale && (
            <span className="inline-flex items-center gap-1 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
              <Zap className="w-3 h-3" />
              Flash Sale
            </span>
          )}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
            {campaign.title}
          </h3>
          <p className="text-white/90 text-sm mb-4 line-clamp-2">
            {campaign.description}
          </p>
          
          {/* Campaign Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-white/80 text-xs">
              {campaign.discountValue && (
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>{campaign.discountValue}% OFF</span>
                </div>
              )}
              {isLimitedTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Limited Time</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 