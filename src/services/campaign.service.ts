import { throwApiError } from '@/lib/api-error'
import type { Campaign } from '@/types/product'

/**
 * Campaign Service
 * 
 * Handles campaign-related API operations with simple error handling
 */
export class CampaignService {
  /**
   * Get all campaigns
   */
  static async getAllCampaigns(): Promise<Campaign[]> {
    try {
      const mockCampaigns: Campaign[] = [
        {
          id: 'summer-sale',
          title: 'Yaz İndirimi',
          slug: 'summer-sale',
          description: 'Yaz sezonu ürünlerinde %50\'ye varan indirimler',
          image: '/images/campaigns/summer-sale.jpg',
          startDate: '2024-06-01T00:00:00Z',
          endDate: '2024-08-31T23:59:59Z',
          isActive: true,
          discountPercentage: 50
        },
        {
          id: 'new-arrivals',
          title: 'Yeni Gelenler',
          slug: 'new-arrivals',
          description: 'En yeni ürünlerimizi keşfedin',
          image: '/images/campaigns/new-arrivals.jpg',
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          isActive: true,
          discountPercentage: 0
        },
        {
          id: 'electronics-sale',
          title: 'Elektronik İndirimi',
          slug: 'electronics-sale',
          description: 'Elektronik ürünlerde büyük indirim',
          image: '/images/campaigns/electronics-sale.jpg',
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          isActive: true,
          discountPercentage: 30
        }
      ]
      return mockCampaigns
    } catch (error) {
      console.error('Failed to get campaigns:', error)
      throw throwApiError('Kampanyalar yüklenirken bir hata oluştu.')
    }
  }

  /**
   * Get campaign by slug
   */
  static async getCampaignBySlug(slug: string): Promise<Campaign | null> {
    try {
      const campaigns = await this.getAllCampaigns()
      const campaign = campaigns.find(campaign => campaign.slug === slug)
      
      if (!campaign) {
        throw throwApiError('Kampanya bulunamadı.', 404)
      }
      
      return campaign
    } catch (error) {
      console.error('Failed to get campaign:', error)
      throw error
    }
  }
}

// Export individual functions for easier imports
export const getAllCampaigns = CampaignService.getAllCampaigns
export const getCampaignBySlug = CampaignService.getCampaignBySlug 