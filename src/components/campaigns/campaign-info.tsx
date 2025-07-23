'use client'

import { Calendar, Clock, Store, Tag } from 'lucide-react'

import type { Campaign } from '@/types/customer-campaign'

/**
 * Campaign Info Props
 */
interface CampaignInfoProps {
  /** Campaign data to display */
  campaign: Campaign
}

/**
 * Campaign Info Component
 *
 * Displays detailed campaign information including description, dates, and seller info.
 *
 * Features:
 * - Campaign description
 * - Start and end dates
 * - Remaining days
 * - Minimum order amount
 * - Seller information (if applicable)
 * - Applicable categories
 *
 * @example
 * ```tsx
 * <CampaignInfo campaign={campaignData} />
 * ```
 */
export function CampaignInfo({ campaign }: CampaignInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Campaign Description */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About This Campaign
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {campaign.description}
            </p>
          </div>

          {/* Campaign Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Campaign Details
            </h3>

            <div className="space-y-4">
              {/* Campaign Period */}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Campaign Period
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {new Date(campaign.startDate).toLocaleDateString('en-US')} -{' '}
                    {new Date(campaign.endDate).toLocaleDateString('en-US')}
                  </div>
                </div>
              </div>

              {/* Remaining Days */}
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Time Remaining
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {campaign.remainingDays} days left
                  </div>
                </div>
              </div>

              {/* Minimum Order */}
              {campaign.minOrderAmount && (
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Minimum Order
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      ${campaign.minOrderAmount}
                    </div>
                  </div>
                </div>
              )}

              {/* Seller Info */}
              {campaign.seller && (
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Seller
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {campaign.seller.storeName}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Applicable Categories */}
        {campaign.applicableItems?.categories &&
          campaign.applicableItems.categories.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Applicable Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {campaign.applicableItems.categories.map(category => (
                  <span
                    key={category._id}
                    className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
