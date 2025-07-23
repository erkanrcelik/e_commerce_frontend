import { CampaignsSection } from '@/components/homepage/campaign-section/campaigns-section'
import { CategoriesGrid } from '@/components/homepage/categories/categories-grid'
import { FeaturedProducts } from '@/components/homepage/featured-products'
import { HeroCarousel } from '@/components/homepage/hero/hero-carousel'
import { NewArrivals } from '@/components/homepage/new-arrivals'
import { SellersCarousel } from '@/components/homepage/sellers-carousel'
import type { Campaign } from '@/types/customer-campaign'
import type { HomepageData } from '@/types/customer-homepage'
import type { Seller } from '@/types/customer-seller'

/**
 * Homepage Content Props
 */
interface HomepageContentProps {
  /** Homepage data from API */
  homepageData: HomepageData
  /** Campaigns data */
  campaigns: Campaign[]
  /** Sellers data */
  sellers: Seller[]
}

/**
 * Homepage Content Component
 *
 * Renders the main homepage content with all sections.
 * This component is lazy loaded to improve initial page load performance.
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
 *
 * @example
 * ```tsx
 * <HomepageContent 
 *   homepageData={homepageData}
 *   campaigns={campaigns}
 *   sellers={sellers}
 * />
 * ```
 */
export function HomepageContent({ 
  homepageData, 
  campaigns, 
  sellers 
}: HomepageContentProps) {
  // Extract data with fallbacks
  const featuredProducts = homepageData.featuredProducts?.products || []
  const categories = homepageData.categories?.items || []
  const newArrivals = homepageData.newArrivals?.products || []
  const popularProducts = homepageData.popularProducts?.products || []
  const specialOffers = homepageData.specialOffers?.products || []

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Carousel */}
      <HeroCarousel campaigns={campaigns} />

      {/* Featured Products - Only show if products exist */}
      {featuredProducts.length > 0 && (
        <FeaturedProducts products={featuredProducts} />
      )}

      {/* Categories Grid - Only show if categories exist */}
      {categories.length > 0 && (
        <CategoriesGrid categories={categories} />
      )}

      {/* Sellers Carousel - Only show if sellers exist */}
      {sellers.length > 0 && (
        <SellersCarousel sellers={sellers} />
      )}

      {/* First Campaign Section - First 2 campaigns */}
      {campaigns.length >= 2 && (
        <CampaignsSection
          campaigns={campaigns}
          title="Flash Sales"
          subtitle="Limited time offers you don't want to miss"
          startIndex={0}
          limit={2}
        />
      )}

      {/* New Arrivals - Only show if products exist */}
      {newArrivals.length > 0 && (
        <NewArrivals products={newArrivals} />
      )}

      {/* Popular Products - Only show if products exist */}
      {popularProducts.length > 0 && (
        <FeaturedProducts 
          products={popularProducts} 
          title="Popular Products"
          subtitle="Most loved by our customers"
        />
      )}

      {/* Second Campaign Section - Last 2 campaigns */}
      {campaigns.length >= 4 && (
        <CampaignsSection
          campaigns={campaigns}
          title="Special Offers"
          subtitle="Exclusive deals for our valued customers"
          startIndex={2}
          limit={2}
        />
      )}

      {/* Special Offers - Only show if products exist */}
      {specialOffers.length > 0 && (
        <FeaturedProducts 
          products={specialOffers} 
          title="Special Offers"
          subtitle="Limited time deals and discounts"
        />
      )}

      {/* Third Campaign Section - Middle 2 campaigns */}
      {campaigns.length >= 6 && (
        <CampaignsSection
          campaigns={campaigns}
          title="Trending Deals"
          subtitle="Most popular campaigns this week"
          startIndex={4}
          limit={2}
        />
      )}
    </div>
  )
} 