'use client'

import type { Campaign } from '@/types/customer-campaign'

import { CampaignCard } from './campaign-card'

/**
 * Campaigns Section Props
 */
interface CampaignsSectionProps {
  /** Array of campaigns to display */
  campaigns: Campaign[]
  /** Section title */
  title: string
  /** Section subtitle */
  subtitle?: string
  /** Start index for campaign selection */
  startIndex?: number
  /** Number of campaigns to show (default: 2) */
  limit?: number
  /** Additional CSS classes */
  className?: string
}

/**
 * Campaigns Section Component
 *
 * Displays a section with 2 campaign cards in a grid layout.
 * Can be configured to show different campaigns by adjusting startIndex.
 *
 * @example
 * ```tsx
 * <CampaignsSection
 *   campaigns={allCampaigns}
 *   title="Flash Sales"
 *   subtitle="Limited time offers"
 *   startIndex={0}
 *   limit={2}
 * />
 * ```
 */
export function CampaignsSection({
  campaigns,
  title,
  subtitle,
  startIndex = 0,
  limit = 2,
  className,
}: CampaignsSectionProps) {
  // Select campaigns based on startIndex and limit
  const selectedCampaigns = campaigns.slice(startIndex, startIndex + limit)

  if (selectedCampaigns.length === 0) {
    return null
  }

  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-900 ${className || ''}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {selectedCampaigns.map(campaign => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  )
}
