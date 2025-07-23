import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductListingLayout } from '@/components/product/listing/product-listing-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomerProductService } from '@/services/customer-product.service'
import { CustomerSellerService } from '@/services/customer-seller.service'

interface SellerPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: SellerPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    let seller = null

    // Check if slug is a valid ObjectId (24 hex characters)
    const objectIdRegex = /^[0-9a-fA-F]{24}$/
    if (objectIdRegex.test(slug)) {
      try {
        // Try to get seller directly by ID
        seller = await CustomerSellerService.getSellerProfile(slug)
      } catch (error) {
        console.error('  Failed to get seller by ID in metadata:', error)
        // Seller not found by ID, will try search below
      }
    }

    // If not found by ID, search by storeName
    if (!seller) {
      const sellersResponse = await CustomerSellerService.searchSellers({
        query: slug,
        limit: 1,
      })

      seller =
        sellersResponse?.data?.length > 0 ? sellersResponse?.data[0] : null
    }

    if (!seller) {
      return {
        title: 'Seller Not Found - playableFactory',
        description: 'The seller you are looking for was not found.',
      }
    }

    return {
      title: `${seller.storeName} - playableFactory`,
      description:
        seller.description || `Discover products from ${seller.storeName}`,
      keywords: [seller.storeName, 'seller', 'store', 'products'],
    }
  } catch (error) {
    console.error('  Failed to generate seller metadata:', error)
    return {
      title: 'Seller - playableFactory',
      description: 'Seller information and products',
    }
  }
}

/**
 * Seller Profile Page
 *
 * Dynamic seller profile page with comprehensive seller information.
 * Uses the unified products API for consistent filtering and search.
 * Only shows data that is returned by the API.
 *
 * Features:
 * - Seller profile information
 * - Seller products listing with unified products API
 * - Seller campaigns
 * - Contact information
 * - Product filtering and sorting
 */
export default async function SellerPageComponent({ params }: SellerPageProps) {
  const { slug } = await params

  try {
    // First, try to get seller directly by ID if slug looks like an ObjectId
    let sellerProfile = null
    let sellerId = null

    // Check if slug is a valid ObjectId (24 hex characters)
    const objectIdRegex = /^[0-9a-fA-F]{24}$/
    if (objectIdRegex.test(slug)) {
      try {
        sellerProfile = await CustomerSellerService.getSellerProfile(slug)
        sellerId = slug
      } catch (error) {
        console.error('  Failed to get seller by ID:', error)
      }
    }

    // If not found by ID, search by storeName
    if (!sellerProfile) {
      try {
        const sellersResponse = await CustomerSellerService.searchSellers({
          query: slug,
          limit: 1,
        })

        const seller =
          sellersResponse?.data?.length > 0 ? sellersResponse?.data[0] : null

        if (!seller) {
          notFound()
        }

        // Use the correct ID field (try both id and _id)
        const sellerWithId = seller as { id?: string; _id?: string }
        sellerId = sellerWithId.id || sellerWithId._id || ''

        if (!sellerId) {
          notFound()
        }

        // Fetch seller's public profile
        sellerProfile = await CustomerSellerService.getSellerProfile(sellerId)
      } catch (error: unknown) {
        console.error('  Failed to search seller by storeName:', error)
        notFound()
      }
    }

    // Fetch seller's products using the unified products API
    const sellerProductsResponse =
      await CustomerProductService.getProductsBySeller(sellerId as string, {
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })

    // Fetch seller's campaigns (with error handling)
    let sellerCampaignsResponse: { data: any[]; total: number } = {
      data: [],
      total: 0,
    }
    try {
      sellerCampaignsResponse = await CustomerSellerService.getSellerCampaigns(
        sellerId as string,
        {
          limit: 5,
        }
      )
    } catch (error) {
      console.error('  Failed to fetch seller campaigns:', error)
      // Continue without campaigns
    }

    // Fetch filter data for the seller
    let filterData
    try {
      filterData = await CustomerProductService.getProductFilters()
    } catch (error) {
      console.error('  Failed to fetch filter data:', error)
      filterData = null
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Seller Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {sellerProfile.storeName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {sellerProfile.description}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {sellerProductsResponse.total} products
                  </span>
                  {sellerProfile.averageRating &&
                  sellerProfile.averageRating > 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {sellerProfile.averageRating.toFixed(1)} ★
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({sellerProfile.reviewCount || 0} reviews)
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      No reviews yet
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Contact: {sellerProfile.phoneNumber || 'Not available'}
                </div>
                {sellerProfile.website && (
                  <a
                    href={sellerProfile.website || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Seller Content with Tabs */}
        <div className="bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="products">
                  Products ({sellerProductsResponse.total})
                </TabsTrigger>
                <TabsTrigger value="profile">Store Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-6">
                <ProductListingLayout
                  initialProducts={sellerProductsResponse.data}
                  title={`Products from ${sellerProfile.storeName}`}
                  description={`Browse all products from ${sellerProfile.storeName}`}
                  showCampaigns={false}
                  totalProducts={sellerProductsResponse.total}
                  totalCampaigns={sellerCampaignsResponse.total || 0}
                  filterData={filterData}
                  initialSeller={sellerId || undefined}
                />
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Seller Information */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      About {sellerProfile.storeName}
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Contact Information
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          {sellerProfile.sellerName && (
                            <div>
                              <span className="font-medium">Seller:</span>{' '}
                              {sellerProfile.sellerName}
                            </div>
                          )}
                          {sellerProfile.email && (
                            <div>
                              <span className="font-medium">Email:</span>{' '}
                              {sellerProfile.email}
                            </div>
                          )}
                          {sellerProfile.phoneNumber && (
                            <div>
                              <span className="font-medium">Phone:</span>{' '}
                              {sellerProfile.phoneNumber}
                            </div>
                          )}
                          {sellerProfile.website && (
                            <div>
                              <span className="font-medium">Website:</span>{' '}
                              <a
                                href={sellerProfile.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 dark:text-purple-400 hover:underline"
                              >
                                {sellerProfile.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {sellerProfile.address && (
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Address
                          </h3>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <div>{sellerProfile.address.street}</div>
                            <div>
                              {sellerProfile.address.city},{' '}
                              {sellerProfile.address.state}
                            </div>
                            <div>
                              {sellerProfile.address.country}{' '}
                              {sellerProfile.address.postalCode}
                            </div>
                          </div>
                        </div>
                      )}

                      {sellerProfile.businessHours && (
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Business Hours
                          </h3>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {Object.entries(sellerProfile.businessHours).map(
                              ([day, hours]) => (
                                <div key={day} className="flex justify-between">
                                  <span className="capitalize">{day}:</span>
                                  <span>
                                    {hours.closed
                                      ? 'Closed'
                                      : `${hours.open} - ${hours.close}`}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Seller Stats & Social Media */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Store Statistics
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {sellerProductsResponse.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Products
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {sellerCampaignsResponse.total || 0}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Campaigns
                            </div>
                          </div>
                        </div>
                      </div>

                      {sellerProfile.socialMedia && (
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Social Media
                          </h3>
                          <div className="flex space-x-4">
                            {sellerProfile.socialMedia.facebook && (
                              <a
                                href={sellerProfile.socialMedia.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Facebook
                              </a>
                            )}
                            {sellerProfile.socialMedia.instagram && (
                              <a
                                href={sellerProfile.socialMedia.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-pink-600 hover:text-pink-700"
                              >
                                Instagram
                              </a>
                            )}
                            {sellerProfile.socialMedia.twitter && (
                              <a
                                href={sellerProfile.socialMedia.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-500"
                              >
                                Twitter
                              </a>
                            )}
                            {sellerProfile.socialMedia.linkedin && (
                              <a
                                href={sellerProfile.socialMedia.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-800"
                              >
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  } catch (error: unknown) {
    console.error('  Failed to fetch seller data:', error)
    notFound()
  }
}
