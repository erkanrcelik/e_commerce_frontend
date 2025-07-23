'use client'



import {
  ArrowRight,
  Calendar,
  Filter,
  Search,
  Store,
  Tag,
  TrendingUp,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Campaign } from '@/types/customer-campaign'

/**
 * Campaigns Page Props
 */
interface CampaignsPageProps {
  /** Campaigns to display */
  campaigns: Campaign[]
}

/**
 * Campaigns Page Component
 *
 * Displays all campaigns with filtering and search functionality.
 *
 * Features:
 * - Campaign grid layout
 * - Tabbed filtering (All, Platform, Seller)
 * - Search functionality
 * - Campaign statistics
 * - Responsive design
 *
 * @example
 * ```tsx
 * <CampaignsPage campaigns={campaigns} />
 * ```
 */
export function CampaignsPage({ campaigns }: CampaignsPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Filter campaigns based on search and tab
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || campaign.type === activeTab

    return matchesSearch && matchesTab
  })

  // Calculate statistics
  const totalCampaigns = campaigns.length
  const activeCampaigns = campaigns.filter(c => c.isActive).length
  const platformCampaigns = campaigns.filter(c => c.type === 'platform').length
  const sellerCampaigns = campaigns.filter(c => c.type === 'seller').length
  const avgDiscount =
    totalCampaigns > 0
      ? Math.round(
          campaigns.reduce((sum, c) => sum + c.discountValue, 0) /
            totalCampaigns
        )
      : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Campaigns
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover active campaigns and find discounted products
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {totalCampaigns}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Campaigns
            </div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {activeCampaigns}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Active Campaigns
            </div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              %{avgDiscount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Discount
            </div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {platformCampaigns + sellerCampaigns}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Platform + Seller
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Tabs for Campaign Types */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              All ({totalCampaigns})
            </TabsTrigger>
            <TabsTrigger value="platform" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Platform ({platformCampaigns})
            </TabsTrigger>
            <TabsTrigger value="seller" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Seller ({sellerCampaigns})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <CampaignsGrid campaigns={filteredCampaigns} />
          </TabsContent>

          <TabsContent value="platform" className="mt-6">
            <CampaignsGrid campaigns={filteredCampaigns} />
          </TabsContent>

          <TabsContent value="seller" className="mt-6">
            <CampaignsGrid campaigns={filteredCampaigns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/**
 * Campaigns Grid Component
 */
function CampaignsGrid({ campaigns }: { campaigns: Campaign[] }) {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Campaigns Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          No campaigns match your search criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map(campaign => (
        <Link key={campaign._id} href={`/campaigns/${campaign._id}`}>
          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Campaign Image */}
            <div className="aspect-video relative overflow-hidden">
              {campaign.imageUrl ? (
                <Image
                  src={campaign.imageUrl}
                  alt={campaign.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600" />
              )}
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white">
                  {campaign.discountType === 'percentage'
                    ? `${campaign.discountValue}% OFF`
                    : `$${campaign.discountValue} OFF`}
                </Badge>
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge
                  variant="secondary"
                  className="bg-white/90 text-gray-900"
                >
                  {campaign.type === 'platform' ? 'Platform' : 'Seller'}
                </Badge>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {campaign.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                  {campaign.description}
                </p>
              </div>

              {/* Campaign Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Ends:{' '}
                      {new Date(campaign.endDate).toLocaleDateString('en-US')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{campaign.remainingDays} days left</span>
                  </div>
                </div>

                {campaign.seller && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <Store className="w-4 h-4" />
                    <span>{campaign.seller.storeName}</span>
                  </div>
                )}

                {campaign.minOrderAmount && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <Tag className="w-4 h-4" />
                    <span>Min. Order: ${campaign.minOrderAmount}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                View Campaign
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
