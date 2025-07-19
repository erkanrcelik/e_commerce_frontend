'use client'

import {
  ArrowRight,
  Calendar,
  Filter,
  Search,
  Tag,
  TrendingUp,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { Campaign } from '@/types/campaign'

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
 * - Search functionality
 * - Campaign filtering
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Filter campaigns based on search and category
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || campaign.type === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(campaigns.map(c => c.type)))]

  // Calculate statistics
  const totalCampaigns = campaigns.length
  const activeCampaigns = campaigns.filter(c => c.isActive || c.status === 'active').length
  const totalDiscount = campaigns.reduce((sum, c) => sum + (c.discountPercentage || c.discountValue), 0)
  const avgDiscount = totalCampaigns > 0 ? Math.round(totalDiscount / totalCampaigns) : 0

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
              {campaigns.reduce((sum, c) => sum + (c.productCount || 0), 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Products
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <Link key={campaign.id} href={`/campaigns/${campaign.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Campaign Image */}
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">
                      {campaign.discountPercentage || campaign.discountValue}% Off
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      {campaign.productCount || 0} products
                    </Badge>
                  </div>
                </div>

                {/* Campaign Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {campaign.title}
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
                        <span>Ends: {new Date(campaign.endDate).toLocaleDateString('en-US')}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{campaign.participantCount || campaign.usedCount} participants</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Tag className="w-4 h-4" />
                        <span>{campaign.category}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>{campaign.isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {campaign.currentSales && campaign.targetSales
                          ? Math.round((campaign.currentSales / campaign.targetSales) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            campaign.currentSales && campaign.targetSales
                              ? Math.min((campaign.currentSales / campaign.targetSales) * 100, 100)
                              : 0
                          }%`
                        }}
                      />
                    </div>
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

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
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
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 