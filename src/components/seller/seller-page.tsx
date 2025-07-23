'use client'

import {
  Building2,
  Calendar,
  CheckCircle,
  MapPin,
  Star,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { ProductListingPage } from '@/components/product/listing'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Campaign } from '@/types/customer-campaign'
import type { Product } from '@/types/customer-product'
import type { Seller } from '@/types/customer-seller'


/**
 * Seller Page Props
 */
interface SellerPageProps {
  /** Seller information from API */
  seller: Seller
  /** Seller's products from API */
  products: Product[]
  /** Total number of products */
  totalProducts?: number
  /** Total number of pages */
  totalPages?: number
  /** Seller's campaigns from API */
  campaigns?: Campaign[]
  /** Total number of campaigns */
  totalCampaigns?: number
}

/**
 * Seller Page Component
 *
 * Comprehensive seller page with profile and product listing.
 * Only displays data that is returned by the API.
 *
 * Features:
 * - Seller profile header with API data
 * - Statistics and ratings from API
 * - Product listing with filters
 * - Campaign display
 * - Conditional rendering based on API data availability
 *
 * @example
 * ```tsx
 * <SellerPage
 *   seller={seller}
 *   products={products}
 *   campaigns={campaigns}
 * />
 * ```
 */
export function SellerPage({
  seller,
  products,
  totalProducts,
  totalPages,
  campaigns = [],
  totalCampaigns = 0,
}: SellerPageProps) {
  const [activeTab, setActiveTab] = useState<
    'products' | 'about' | 'campaigns'
  >('products')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-purple-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              {seller.storeName}
            </li>
          </ol>
        </nav>

        {/* Seller Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                {seller.logoUrl ? (
                  <Image
                    src={seller.logoUrl}
                    alt={seller.storeName}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-white" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {seller.storeName}
                  </h1>
                  {seller.isVerified && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                {seller.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {seller.description}
                  </p>
                )}

                {/* Seller Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{seller.averageRating?.toFixed(1)}</span>
                    <span>({seller.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{seller.productCount} products</span>
                  </div>
                  {totalCampaigns > 0 && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{totalCampaigns} campaigns</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Products ({totalProducts || products.length})
              </button>
              {campaigns.length > 0 && (
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'campaigns'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Campaigns ({totalCampaigns})
                </button>
              )}
              <button
                onClick={() => setActiveTab('about')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'about'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'products' && (
          <ProductListingPage
            initialProducts={products}
            title={`${seller.storeName} Products`}
            description={`Browse products from ${seller.storeName}`}
            showCampaigns={false}
            totalProducts={totalProducts}
            totalPages={totalPages}
          />
        )}

        {activeTab === 'campaigns' && campaigns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <Card key={campaign._id} className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-blue-600 relative">
                  {campaign.imageUrl && (
                    <Image
                      src={campaign.imageUrl}
                      alt={campaign.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">
                      {campaign.discountType === 'percentage'
                        ? `${campaign.discountValue}% OFF`
                        : `$${campaign.discountValue} OFF`}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {campaign.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{campaign.remainingDays} days left</span>
                    <Link
                      href={`/campaigns/${campaign._id}`}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      View Campaign
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About {seller.storeName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {seller.description || 'No additional information available.'}
            </p>

            {/* Contact Information */}
            {seller.phoneNumber && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Contact
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {seller.phoneNumber}
                </p>
              </div>
            )}

            {/* Address */}
            {seller.address && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  Address
                </h3>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="text-gray-600 dark:text-gray-400">
                    <p>{seller.address.street}</p>
                    <p>
                      {seller.address.city}, {seller.address.state}{' '}
                      {seller.address.postalCode}
                    </p>
                    <p>{seller.address.country}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
