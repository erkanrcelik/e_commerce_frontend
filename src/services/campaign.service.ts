import { throwApiError } from '@/lib/api-error'
import type { Campaign } from '@/types/campaign'

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
          description: 'Yaz sezonu ürünlerinde %50\'ye varan indirimler',
          shortDescription: 'Yaz sezonu fırsatları',
          type: 'seasonal',
          status: 'active',
          discountType: 'percentage',
          discountValue: 50,
          bannerImage: '/images/campaigns/summer-sale.jpg',
          thumbnailImage: '/images/campaigns/summer-sale-thumb.jpg',
          categoryIds: ['electronics'],
          productIds: ['1', '2', '3'],
          usageLimit: 1000,
          usedCount: 200,
          userUsageLimit: 2,
          startDate: '2024-06-01T00:00:00Z',
          endDate: '2024-08-31T23:59:59Z',
          createdAt: '2024-05-01T10:00:00Z',
          updatedAt: '2024-06-01T10:00:00Z',
          priority: 1,
          showOnHomepage: true,
          isFeatured: true,
          slug: 'summer-sale',
          metaTitle: 'Yaz İndirimi',
          metaDescription: 'Yaz sezonu ürünlerinde büyük indirimler',
          isActive: true,
          discountPercentage: 50,
          productCount: 12,
          participantCount: 200,
          currentSales: 200,
          targetSales: 1000,
          category: 'Elektronik'
        },
        {
          id: 'new-arrivals',
          title: 'Yeni Gelenler',
          description: 'En yeni ürünlerimizi keşfedin',
          shortDescription: 'Yeni ürünler',
          type: 'daily_deal',
          status: 'active',
          discountType: 'percentage',
          discountValue: 0,
          bannerImage: '/images/campaigns/new-arrivals.jpg',
          thumbnailImage: '/images/campaigns/new-arrivals-thumb.jpg',
          categoryIds: ['smartphones'],
          productIds: ['4', '5'],
          usageLimit: 500,
          usedCount: 50,
          userUsageLimit: 1,
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-01-01T10:00:00Z',
          priority: 2,
          showOnHomepage: true,
          isFeatured: false,
          slug: 'new-arrivals',
          metaTitle: 'Yeni Gelenler',
          metaDescription: 'En yeni ürünlerimizi keşfedin',
          isActive: true,
          discountPercentage: 0,
          productCount: 8,
          participantCount: 50,
          currentSales: 50,
          targetSales: 500,
          category: 'Akıllı Telefonlar'
        },
        {
          id: 'electronics-sale',
          title: 'Elektronik İndirimi',
          description: 'Elektronik ürünlerde büyük indirim',
          shortDescription: 'Elektronik fırsatları',
          type: 'category_discount',
          status: 'active',
          discountType: 'percentage',
          discountValue: 30,
          bannerImage: '/images/campaigns/electronics-sale.jpg',
          thumbnailImage: '/images/campaigns/electronics-sale-thumb.jpg',
          categoryIds: ['electronics'],
          productIds: ['6', '7', '8'],
          usageLimit: 800,
          usedCount: 120,
          userUsageLimit: 1,
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          createdAt: '2024-01-01T10:00:00Z',
          updatedAt: '2024-01-01T10:00:00Z',
          priority: 3,
          showOnHomepage: false,
          isFeatured: false,
          slug: 'electronics-sale',
          metaTitle: 'Elektronik İndirimi',
          metaDescription: 'Elektronik ürünlerde büyük indirim',
          isActive: true,
          discountPercentage: 30,
          productCount: 15,
          participantCount: 120,
          currentSales: 120,
          targetSales: 800,
          category: 'Elektronik'
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