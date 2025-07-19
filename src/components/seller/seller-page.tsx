'use client'

import {
    Building2,
    Calendar,
    CheckCircle,
    MapPin,
    RotateCcw,
    Shield,
    Star,
    Truck,
    Users
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { ProductListingPage } from '@/components/product/listing'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Product } from '@/types/product'

/**
 * Seller Interface
 */
interface Seller {
  id: string
  name: string
  slug: string
  description: string
  rating: number
  totalReviews: number
  totalProducts: number
  memberSince: string
  location: string
  phone: string
  email: string
  website: string
  verified: boolean
  responseTime: string
  shippingTime: string
  returnPolicy: string
  categories: string[]
}

/**
 * Seller Page Props
 */
interface SellerPageProps {
  /** Seller information */
  seller: Seller
  /** Seller's products */
  products: Product[]
}

/**
 * Seller Page Component
 * 
 * Comprehensive seller page with profile and product listing.
 * 
 * Features:
 * - Seller profile header
 * - Statistics and ratings
 * - Contact information
 * - Product listing with filters
 * - Seller policies
 * 
 * @example
 * ```tsx
 * <SellerPage
 *   seller={seller}
 *   products={products}
 * />
 * ```
 */
export function SellerPage({ seller, products }: SellerPageProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'reviews'>('products')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link href="/" className="hover:text-purple-600">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{seller.name}</li>
          </ol>
        </nav>

        {/* Seller Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {seller.name}
                  </h1>
                  {seller.verified && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {seller.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Member since: {seller.memberSince}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{seller.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {seller.rating}
                </div>
                <div className="flex items-center justify-center space-x-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(seller.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {seller.totalReviews} reviews
                </div>
              </div>
              
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {seller.totalProducts}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Products
                </div>
              </div>
              
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {seller.responseTime}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Response Time
                </div>
              </div>
              
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {seller.shippingTime}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Shipping Time
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'products', label: 'Products', count: products.length },
                { id: 'about', label: 'About', count: null },
                { id: 'reviews', label: 'Reviews', count: seller.totalReviews }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'products' | 'about' | 'reviews')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {tab.count}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
                    {activeTab === 'products' && (
          
              
              <ProductListingPage 
                initialProducts={products}
                title=""
                description=""
                showCampaigns={true}
                initialSearchQuery=""
              />

          )}

          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* About Section */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  About Store
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {seller.description}
                </p>
              </Card>

              {/* Policies */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Truck className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Shipping Policy
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Shipping time: {seller.shippingTime}
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <RotateCcw className="w-6 h-6 text-orange-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Return Policy
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Return time: {seller.returnPolicy}
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Security
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    SSL secured payment system
                  </p>
                </Card>
              </div>

              {/* Categories */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {seller.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Customer Reviews
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {seller.totalReviews} reviews found
                </p>
              </div>
              
              <Card className="p-6">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No reviews yet for this seller.
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 