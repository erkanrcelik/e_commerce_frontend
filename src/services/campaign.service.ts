import api from '@/lib/axios'
import type {
  Campaign,
  HomepageCampaigns,
  NewsletterResponse,
  NewsletterSubscription
} from '@/types/campaign'

/**
 * Campaign API service
 * Handles all campaign-related API calls
 */
export class CampaignService {
  /**
   * Get homepage campaigns (daily deals, flash sales, featured offers)
   */
  static async getHomepageCampaigns(): Promise<HomepageCampaigns> {
    try {
      const response = await api.get<HomepageCampaigns>('/campaigns/homepage')
      return response.data
    } catch (error) {
      console.error('Get homepage campaigns API error:', error)
      throw error
    }
  }

  /**
   * Get active campaigns
   */
  static async getActiveCampaigns(limit = 10): Promise<Campaign[]> {
    try {
      const response = await api.get<{ campaigns: Campaign[] }>('/campaigns/active', {
        params: { limit }
      })
      return response.data.campaigns
    } catch (error) {
      console.error('Get active campaigns API error:', error)
      throw error
    }
  }

  /**
   * Get daily deals
   */
  static async getDailyDeals(limit = 6): Promise<Campaign[]> {
    try {
      const response = await api.get<{ campaigns: Campaign[] }>('/campaigns/daily-deals', {
        params: { limit }
      })
      return response.data.campaigns
    } catch (error) {
      console.error('Get daily deals API error:', error)
      throw error
    }
  }

  /**
   * Get flash sales
   */
  static async getFlashSales(limit = 6): Promise<Campaign[]> {
    try {
      const response = await api.get<{ campaigns: Campaign[] }>('/campaigns/flash-sales', {
        params: { limit }
      })
      return response.data.campaigns
    } catch (error) {
      console.error('Get flash sales API error:', error)
      throw error
    }
  }

  /**
   * Get campaign by slug
   */
  static async getCampaignBySlug(slug: string): Promise<Campaign> {
    try {
      const response = await api.get<{ campaign: Campaign }>(`/campaigns/${slug}`)
      return response.data.campaign
    } catch (error) {
      console.error('Get campaign by slug API error:', error)
      throw error
    }
  }
}

/**
 * Newsletter API service
 * Handles newsletter subscription
 */
export class NewsletterService {
  /**
   * Subscribe to newsletter
   */
  static async subscribe(subscription: NewsletterSubscription): Promise<NewsletterResponse> {
    try {
      const response = await api.post<NewsletterResponse>('/newsletter/subscribe', subscription)
      return response.data
    } catch (error) {
      console.error('Newsletter subscription API error:', error)
      throw error
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  static async unsubscribe(email: string): Promise<NewsletterResponse> {
    try {
      const response = await api.post<NewsletterResponse>('/newsletter/unsubscribe', { email })
      return response.data
    } catch (error) {
      console.error('Newsletter unsubscribe API error:', error)
      throw error
    }
  }

  /**
   * Check subscription status
   */
  static async checkSubscription(email: string): Promise<{ subscribed: boolean }> {
    try {
      const response = await api.get<{ subscribed: boolean }>('/newsletter/status', {
        params: { email }
      })
      return response.data
    } catch (error) {
      console.error('Check newsletter subscription API error:', error)
      throw error
    }
  }
} 