
import dynamic from 'next/dynamic'

import { CustomerCampaignService } from '@/services/customer-campaign.service'
import { CustomerHomepageService } from '@/services/customer-homepage.service'
import { CustomerSellerService } from '@/services/customer-seller.service'
import { Suspense } from 'react'

// Lazy load the homepage content component
const HomepageContent = dynamic(
  () => import('@/components/homepage/homepage-content').then(mod => ({ default: mod.HomepageContent })),
  {
    loading: () => (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto max-w-md"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto max-w-lg"></div>
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: true, // Keep SSR enabled for SEO
  }
)

/**
 * Homepage
 *
 * Main homepage with hero carousel, featured products, categories, and campaigns.
 * Uses SSR for better SEO and performance.
 * Only shows data that is returned by the API.
 *
 * Features:
 * - Hero carousel with promotional content
 * - Featured products section
 * - Categories grid
 * - Sellers carousel
 * - Campaign sections
 * - New arrivals
 * - Product recommendations
 * - Responsive design
 * - SEO optimized
 */
export default async function HomePage() {
  try {
    // Get public homepage data (authentication will be handled client-side)
    const homepageData = await CustomerHomepageService.getHomepageData()

    // Get campaigns
    const campaignsResponse = await CustomerCampaignService.getAllCampaigns({
      page: 1,
      limit: 6,
      sortBy: 'discountValue',
      sortOrder: 'desc',
    })

    // Get sellers for carousel
    const sellersResponse = await CustomerSellerService.getAllSellers({
      limit: 10,
    })

    // Extract data with fallbacks
    const featuredProducts = homepageData.featuredProducts?.products || []
    const categories = homepageData.categories?.items || []
    const newArrivals = homepageData.newArrivals?.products || []
    const popularProducts = homepageData.popularProducts?.products || []
    const specialOffers = homepageData.specialOffers?.products || []
    const sellers = sellersResponse.data || []
    const campaigns = campaignsResponse.data || []

    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto max-w-md"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto max-w-lg"></div>
              </div>
            </div>
          </div>
        </div>
      }>
        <HomepageContent 
          homepageData={homepageData}
          campaigns={campaigns}
          sellers={sellers}
        />
      </Suspense>
    )
  } catch (error) {


    // Return a basic homepage structure even if data fetch fails
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to playableFactory
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover amazing products and deals
            </p>
          </div>
        </div>
      </div>
    )
  }
}
