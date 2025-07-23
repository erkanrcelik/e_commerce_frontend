import api from '@/lib/axios'
import type {
  Campaign,
  CampaignListParams,
  CampaignListResponse,
} from '@/types/customer-campaign'

/**
 * Customer Campaign Service
 *
 * Handles all campaign-related API calls for customers.
 * Fetches campaigns, trending campaigns, and campaign details.
 */
export class CustomerCampaignService {
  /**
   * Get all campaigns with filtering and pagination
   *
   * @param params - Query parameters for campaigns
   * @returns Promise<CampaignListResponse> - Paginated campaigns response
   *
   * @example
   * ```typescript
   * const campaigns = await CustomerCampaignService.getAllCampaigns({
   *   page: 1,
   *   limit: 20,
   *   type: 'seller',
   *   sortBy: 'discountValue',
   *   sortOrder: 'desc'
   * })
   * ```
   */
  static async getAllCampaigns(
    params?: CampaignListParams
  ): Promise<CampaignListResponse> {
    try {
      const response = await api.get<CampaignListResponse>('/campaigns', {
        params,
      })

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get trending campaigns
   *
   * @param params - Query parameters for trending campaigns
   * @returns Promise<Campaign[]> - Array of trending campaigns
   *
   * @example
   * ```typescript
   * const trending = await CustomerCampaignService.getTrendingCampaigns({ limit: 6 })
   * ```
   */
  static async getTrendingCampaigns(params?: {
    limit?: number
  }): Promise<Campaign[]> {
    try {
      // Trending campaigns için özel endpoint yok, genel campaigns endpoint'ini kullan
      const response = await api.get<CampaignListResponse>('/campaigns', {
        params: {
          ...params,
          sortBy: 'discountValue',
          sortOrder: 'desc',
          isActive: true,
        },
      })

      return response.data.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get campaign by ID
   *
   * @param campaignId - Campaign ID
   * @returns Promise<Campaign> - Campaign details
   *
   * @example
   * ```typescript
   * const campaign = await CustomerCampaignService.getCampaignById('64abc123def456789')
   * ```
   */
  static async getCampaignById(campaignId: string): Promise<Campaign> {
    try {
      const response = await api.get<Campaign>(`/campaigns/${campaignId}`)

      return response.data
    } catch (error) {
      throw error
    }
  }
}
