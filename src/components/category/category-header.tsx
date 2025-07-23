'use client'

import {
    Building2,
    Calendar,
    Clock,
    Package,
    Store,
    Tag,
    Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Campaign } from '@/types/customer-campaign'
import type { Category } from '@/types/customer-category'

/**
 * Category Header Props
 */
interface CategoryHeaderProps {
  /** Category information from API */
  category: Category
  /** Total number of products in category */
  totalProducts: number
  /** Category campaigns */
  campaigns?: Campaign[]
  /** Total number of campaigns */
  totalCampaigns?: number
}

/**
 * Category Header Component
 *
 * Displays category information with statistics and navigation.
 * Shows category details, product count, and related campaigns.
 * Uses only API data for consistent display across all categories.
 *
 * Features:
 * - Category name and description from API
 * - Product count from API
 * - Campaign information from API
 * - Breadcrumb navigation
 * - Responsive design with improved readability
 * - API-only data usage
 *
 * @example
 * ```tsx
 * <CategoryHeader
 *   category={category}
 *   totalProducts={150}
 *   campaigns={campaigns}
 *   totalCampaigns={3}
 * />
 * ```
 */
export function CategoryHeader({
  category,
  totalProducts,
  campaigns = [],
  totalCampaigns = 0,
}: CategoryHeaderProps) {
  // Format campaign discount display
  const getDiscountDisplay = (campaign: Campaign) => {
    if (campaign.discountType === 'percentage') {
      return `${campaign.discountValue}% OFF`
    } else {
      return `$${campaign.discountValue} OFF`
    }
  }

  // Get campaign type display
  const getCampaignTypeDisplay = (campaign: Campaign) => {
    return campaign.type === 'platform' ? 'Platform' : 'Seller'
  }

  // Get campaign type icon
  const getCampaignTypeIcon = (campaign: Campaign) => {
    return campaign.type === 'platform' ? (
      <Zap className="w-3 h-3" />
    ) : (
      <Store className="w-3 h-3" />
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/categories"
                className="hover:text-purple-600 transition-colors"
              >
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category Header with Enhanced Design */}
        <div className="flex items-start space-x-6">
          {/* Category Image/Icon */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
            {category.image || category.imageUrl ? (
              <Image
                src={category.image || category.imageUrl || ''}
                alt={category.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Tag className="w-10 h-10 text-white" />
              </div>
            )}
          </div>

          {/* Category Information */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-3">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h1>
              {category.isActive && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1">
                  Active
                </Badge>
              )}
            </div>

            {/* Category Description */}
            {category.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed max-w-3xl">
                {category.description}
              </p>
            )}

            {/* Category Statistics */}
            <div className="flex items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="font-medium">{totalProducts} products</span>
              </div>
              {totalCampaigns > 0 && (
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">
                    {totalCampaigns} campaigns
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Campaign Cards with Enhanced Design */}
        {campaigns.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Active Campaigns
              </h2>
              <Link
                href="/campaigns"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                View All Campaigns →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.slice(0, 3).map(campaign => (
                <Card
                  key={campaign._id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  {/* Campaign Image Section */}
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 relative overflow-hidden">
                    {campaign.imageUrl && (
                      <Image
                        src={campaign.imageUrl}
                        alt={campaign.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Campaign Type Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-gray-900 text-xs font-medium">
                        <span className="flex items-center gap-1">
                          {getCampaignTypeIcon(campaign)}
                          {getCampaignTypeDisplay(campaign)}
                        </span>
                      </Badge>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-500 text-white font-bold">
                        {getDiscountDisplay(campaign)}
                      </Badge>
                    </div>

                    {/* Remaining Days */}
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
                        <Clock className="w-3 h-3" />
                        <span>{campaign.remainingDays} days left</span>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                      {campaign.name}
                    </h3>

                    {campaign.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
                        {campaign.description}
                      </p>
                    )}

                    {/* Campaign Details */}
                    <div className="space-y-2 mb-4">
                      {/* Campaign Dates */}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(campaign.startDate).toLocaleDateString()} -{' '}
                          {new Date(campaign.endDate).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Seller Info if Available */}
                      {campaign.seller && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Store className="w-3 h-3" />
                          <span>{campaign.seller.storeName}</span>
                        </div>
                      )}
                    </div>

                    {/* View Campaign Link */}
                    <Link
                      href={`/campaigns/${campaign._id}`}
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                    >
                      View Campaign
                      <span className="text-xs">→</span>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
