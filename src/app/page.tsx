import { CampaignsSection } from '@/components/homepage/campaign-section/campaigns-section'
import { CategoriesGrid } from '@/components/homepage/categories/categories-grid'
import { FeaturedProducts } from '@/components/homepage/featured-products'
import { HeroCarousel } from '@/components/homepage/hero/hero-carousel'
import { NewArrivals } from '@/components/homepage/new-arrivals'
import { getHomepageData } from '@/lib/mock-data'

export default function Home() {
  // Get homepage data (in production this would be from API)
  const homepageData = getHomepageData()

  return (
    <main className="min-h-screen">
      {/* Hero Carousel Section */}
      <HeroCarousel 
        campaigns={homepageData.campaigns}
        autoplay={true}
      />

      {/* Featured Products Section */}
      <FeaturedProducts 
        products={homepageData.featuredProducts}
        title="Featured Products"
        subtitle="Discover our handpicked selection of premium products"
      />

      {/* Campaign Section 1 */}
      <CampaignsSection 
        campaigns={homepageData.campaigns.slice(0, 2)}
        title="Flash Deals"
        subtitle="Limited time offers you can't miss"
        maxCampaigns={2}
      />

      {/* Categories Grid Section */}
      <CategoriesGrid 
        categories={homepageData.featuredCategories}
        title="Shop by Category"
        subtitle="Explore our wide range of product categories"
      />

      {/* Campaign Section 2 */}
      <CampaignsSection 
        campaigns={homepageData.campaigns.slice(1, 3)}
        title="Daily Deals"
        subtitle="Fresh deals updated daily"
        maxCampaigns={2}
      />

      {/* New Arrivals Section */}
      <NewArrivals 
        products={homepageData.newArrivals}
        title="New Arrivals"
        subtitle="Fresh products just landed in our store"
      />

      {/* Campaign Section 3 */}
      <CampaignsSection 
        campaigns={homepageData.campaigns.slice(0, 2)}
        title="Weekend Specials"
        subtitle="Special offers for the weekend"
        maxCampaigns={2}
      />
    </main>
  )
}
