import type { Metadata } from 'next'

import { CampaignsPage } from '@/components/campaigns/campaigns-page'
import { getAllCampaigns } from '@/services/campaign.service'

export const metadata: Metadata = {
  title: 'Tüm Kampanyalar - playableFactory',
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
 * - Campaign filtering
 * - Search functionality
 * - Campaign statistics
 */
export default async function CampaignsPageComponent() {
  const campaigns = await getAllCampaigns()

  return (
    <CampaignsPage campaigns={campaigns} />
  )
} 