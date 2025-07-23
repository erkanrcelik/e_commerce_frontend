'use client'

import { Calendar, Clock, Store, Tag, Zap } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import type { Campaign } from '@/types/customer-campaign'

/**
 * Campaign Detail Header Props
 */
interface CampaignDetailHeaderProps {
  /** Campaign data to display */
  campaign: Campaign
}

/**
 * Campaign Detail Header Component
 *
 * Displays campaign banner and basic information at the top of the page.
 * Uses only API data for consistent display across all campaigns.
 *
 * Features:
 * - Campaign banner image with fallback
 * - Campaign name and discount information
 * - Campaign type and status indicators
 * - Share and follow buttons
 * - Responsive design with improved readability
 * - API-only data usage
 *
 * @example
 * ```tsx
 * <CampaignDetailHeader campaign={campaignData} />
 * ```
 */
export function CampaignDetailHeader({ campaign }: CampaignDetailHeaderProps) {
  // Share functionality will be implemented later

  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Calculate discount display
  const getDiscountDisplay = () => {
    if (campaign.discountType === 'percentage') {
      return `${campaign.discountValue}% OFF`
    } else {
      return `$${campaign.discountValue} OFF`
    }
  }

  // Get campaign type display
  const getCampaignTypeDisplay = () => {
    return campaign.type === 'platform'
      ? 'Platform Campaign'
      : 'Seller Campaign'
  }

  // Get campaign type icon
  const getCampaignTypeIcon = () => {
    return campaign.type === 'platform' ? (
      <Zap className="w-4 h-4" />
    ) : (
      <Store className="w-4 h-4" />
    )
  }

  return (
    <div className="relative">
      {/* Campaign Banner */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        {campaign.imageUrl ? (
          <Image
            src={campaign.imageUrl}
            alt={campaign.name}
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600" />
        )}

        {/* Enhanced Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content with Better Contrast */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            {/* Campaign Type Badge */}
            <div className="mb-4">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-medium">
                <span className="flex items-center gap-2">
                  {getCampaignTypeIcon()}
                  {getCampaignTypeDisplay()}
                </span>
              </Badge>
            </div>

            {/* Campaign Name */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
              {campaign.name}
            </h1>

            {/* Campaign Description */}
            {campaign.description && (
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto drop-shadow-md">
                {campaign.description}
              </p>
            )}

            {/* Discount Badge */}
            <div className="mb-6">
              <Badge className="text-xl md:text-2xl font-bold px-6 py-3 bg-red-500 hover:bg-red-600 shadow-lg">
                {getDiscountDisplay()}
              </Badge>
            </div>

            {/* Campaign Dates */}
            <div className="mb-6 text-white/80">
              <div className="flex items-center justify-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>From {formatDate(campaign.startDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>To {formatDate(campaign.endDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Status - Top Right */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">
              {campaign.remainingDays} days left
            </span>
          </div>
        </div>

        {/* Campaign Status - Top Left */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
            {campaign.isActive ? (
              <Badge className="bg-green-500 text-white text-xs">Active</Badge>
            ) : (
              <Badge className="bg-gray-500 text-white text-xs">Inactive</Badge>
            )}
          </div>
        </div>

        {/* Min Order Amount - Bottom Left */}
        {campaign.minOrderAmount && (
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Tag className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                Min. Order: ${campaign.minOrderAmount}
              </span>
            </div>
          </div>
        )}

        {/* Seller Info - Bottom Right */}
        {campaign.seller && (
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Store className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                {campaign.seller.storeName}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
