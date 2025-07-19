import type { Metadata } from 'next'

import { ProductListingLayout } from '@/components/product/product-listing-layout'
import { getCampaignBySlug } from '@/services/campaign.service'
import { getProductsByCampaign } from '@/services/product.service'

interface CampaignPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CampaignPageProps): Promise<Metadata> {
  const { slug } = await params
  const campaign = await getCampaignBySlug(slug)
  
  if (!campaign) {
    return {
      title: 'Campaign Not Found - playableFactory',
      description: 'The requested campaign could not be found.',
    }
  }

  return {
    title: `${campaign.title} - playableFactory`,
    description: campaign.description || `Special offers and deals on ${campaign.title}`,
    keywords: [campaign.title, 'campaign', 'deals', 'offers', 'sale'],
  }
}

/**
 * Campaign Page
 * 
 * Dynamic campaign page with promotional product listing.
 * 
 * Features:
 * - Campaign-specific product listing
 * - Advanced filtering and sorting
 * - Search functionality
 * - Pagination
 * - Campaign indicators and badges
 */
export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params
  const campaign = await getCampaignBySlug(slug)
  
  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Campaign Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested campaign could not be found.
          </p>
        </div>
      </div>
    )
  }

  const productsResponse = await getProductsByCampaign(campaign.id)

  return (
    <ProductListingLayout
      initialProducts={productsResponse.products}
      title={campaign.title}
      description={campaign.description || `Special offers and deals on ${campaign.title}`}
      showCampaigns={true}
    />
  )
} 