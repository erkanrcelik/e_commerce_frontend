import type { Metadata } from 'next'
import Link from 'next/link'

import { CampaignDetailHeader } from '@/components/campaigns/campaign-detail-header'
import { ProductListingLayout } from '@/components/product/listing'
import { CustomerCampaignService } from '@/services/customer-campaign.service'
import { CustomerProductService } from '@/services/customer-product.service'

interface CampaignPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    page?: string
    limit?: string
    categoryId?: string
    sortBy?: string
    sortOrder?: string
    search?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const campaign = await CustomerCampaignService.getCampaignById(slug)

    if (!campaign) {
      return {
        title: 'Campaign Not Found - playableFactory',
        description: 'The requested campaign could not be found.',
      }
    }

    return {
      title: `${campaign.name} - playableFactory`,
      description: campaign.description || `Discover ${campaign.name} deals`,
      keywords: [campaign.name, 'campaign', 'deals', 'discounts'],
    }
  } catch (error) {
    console.error('Failed to generate campaign metadata:', error)
    return {
      title: 'Campaign - playableFactory',
      description: 'Discover amazing deals and campaigns',
    }
  }
}

/**
 * Campaign Detail Page
 *
 * Displays campaign details and associated products using dedicated campaign endpoint.
 * Uses the unified campaign products API for consistent filtering and search.
 *
 * Features:
 * - Campaign banner and information
 * - Product grid with filtering
 * - Search and sorting functionality
 * - Pagination
 * - Campaign status indicators
 */
export default async function CampaignPage({
  params,
  searchParams,
}: CampaignPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  try {
    // Fetch campaign details
    const campaign = await CustomerCampaignService.getCampaignById(slug)

    // Check if campaign is expired
    if (campaign.isExpired) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Campaign Expired
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                This campaign has ended. Check out our other active campaigns
                for great deals!
              </p>
              <Link
                href="/campaigns"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                View All Campaigns
              </Link>
            </div>
          </div>
        </div>
      )
    }

    // Fetch campaign products using dedicated campaign endpoint
    const productsResponse = await CustomerProductService.getProductsByCampaign(
      campaign._id,
      {
        page: parseInt(queryParams.page || '1'),
        limit: parseInt(queryParams.limit || '20'),
      }
    )

    // Fetch filter data for the campaign
    let filterData
    try {
      filterData = await CustomerProductService.getProductFilters()
    } catch (error) {
      console.error('Failed to fetch filter data:', error)
      filterData = null
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Campaign Header */}
        <CampaignDetailHeader campaign={campaign} />

        {/* Products Section */}
        <div className="bg-white dark:bg-gray-800">
          <ProductListingLayout
            initialProducts={productsResponse.data}
            title={`${campaign.name} Products`}
            description={`Browse products available in the ${campaign.name} campaign`}
            showCampaigns={false}
            totalProducts={productsResponse.total}
            totalPages={productsResponse.totalPages}
            filterData={filterData}
            initialCampaign={campaign._id}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch campaign products:', error)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Campaign Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The requested campaign could not be found or may have been
              removed.
            </p>
            <Link
              href="/campaigns"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              View All Campaigns
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
