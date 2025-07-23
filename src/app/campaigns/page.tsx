import type { Metadata } from 'next'

import { CampaignsPage } from '@/components/campaigns/campaigns-page'
import { CustomerCampaignService } from '@/services/customer-campaign.service'

export const metadata: Metadata = {
  title: 'All Campaigns - playableFactory',
  description: 'Aktif kampanyaları keşfedin ve indirimli ürünleri bulun',
  keywords: ['kampanya', 'indirim', 'fırsat', 'alışveriş'],
}

/**
 * All Campaigns Page
 *
 * Displays all active campaigns with filtering and search.
 *
 * Features:
 * - Campaign grid layout
 * - Campaign filtering by type (platform/seller)
 * - Search functionality
 * - Campaign statistics
 */
export default async function CampaignsPageComponent() {
  try {
    // Fetch all campaigns
    const campaignsResponse = await CustomerCampaignService.getAllCampaigns({
      page: 1,
      limit: 50, // Get more campaigns for the campaigns page
      sortBy: 'discountValue',
      sortOrder: 'desc',
    })

    return <CampaignsPage campaigns={campaignsResponse.data} />
  } catch (error) {
    console.error('Failed to fetch campaigns:', error)
    return <CampaignsPage campaigns={[]} />
  }
}
