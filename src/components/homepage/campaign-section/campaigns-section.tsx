'use client'

import type { Campaign } from '@/types/campaign'

import { CampaignCard } from './campaign-card'

/**
 * Campaigns Section Props
 */
interface CampaignsSectionProps {
  /** Array of campaigns to display */
  campaigns: Campaign[]
  /** Section title */
  title?: string
  /** Section subtitle */
  subtitle?: string
  /** Maximum number of campaigns to show */
  maxCampaigns?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * Campaigns Section Component
 * 
 * Displays active campaigns and special offers in a 2-column grid layout.
 * Used to showcase promotional content and drive conversions.
 * 
 * Features:
 * - 2-column responsive grid layout
 * - Configurable campaign limit
 * - Section header with view all link
 * - Campaign click tracking
 * - Responsive design
 * - Gradient background
 * 
 * @example
 * ```tsx
 * <CampaignsSection
 *   campaigns={activeCampaigns}
 *   title="Special Offers"
 *   subtitle="Don't miss these amazing deals"
 *   maxCampaigns={2}
 * />
 * ```
 */
export function CampaignsSection({ 
  campaigns, 
  maxCampaigns = 2,
  className
}: CampaignsSectionProps) {
  // Limit campaigns to display
  const limitedCampaigns = campaigns.slice(0, maxCampaigns)

  return (
    <section className={`py-6 bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
       
        {/* Campaigns Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {limitedCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 