'use client'

import { Building2, Mail, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CustomerSellerService } from '@/services/customer-seller.service'
import type { ProductSeller } from '@/types/customer-product'
import type { Seller } from '@/types/customer-seller'
import Image from 'next/image'

/**
 * Seller Info Component Props
 */
interface SellerInfoProps {
  /** Seller data from product API */
  seller: ProductSeller | null
}

/**
 * Seller Info Component
 *
 * Displays detailed seller information for a product with link to seller page.
 * Fetches detailed seller profile from API.
 *
 * @example
 * ```tsx
 * <SellerInfo seller={seller} />
 * ```
 */
export function SellerInfo({ seller }: SellerInfoProps) {
  const [sellerProfile, setSellerProfile] = useState<Seller | null>(null)

  useEffect(() => {
    if (!seller?._id) return

    const fetchSellerProfile = async () => {
      try {
        const sellerData = await CustomerSellerService.getSellerProfile(seller._id)
        setSellerProfile(sellerData)
      } catch (error) {
        console.error(' Fetch seller profile error:', error)
      }
    }

    fetchSellerProfile()
  }, [seller?._id])

  if (!seller) {
    return null
  }

  const sellerName = `${seller.firstName} ${seller.lastName}`

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              {sellerProfile?.logoUrl ? (
                <Image
                  src={sellerProfile.logoUrl}
                  alt={sellerProfile.storeName}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building2 className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {sellerProfile?.storeName || sellerName}
              </h3>
              <p className="text-sm text-muted-foreground">
                &quot;{sellerProfile?.description || 'Product Seller'}&quot;
              </p>
            </div>
          </div>
          <Link href={`/seller/${seller._id}`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              View Store
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Seller Details */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">
              About This Seller
            </h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {sellerProfile ? (
                <>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>
                      {sellerProfile.isVerified ? 'Verified Seller' : 'Seller'}
                    </span>
                  </div>
                  {sellerProfile.averageRating &&
                    sellerProfile.averageRating > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{sellerProfile.averageRating.toFixed(1)}</span>
                        </div>
                        <span>({sellerProfile.reviewCount || 0} reviews)</span>
                      </div>
                    )}
                  {sellerProfile.productCount && (
                    <div className="flex items-center gap-2">
                      <span>•</span>
                      <span>{sellerProfile.productCount} products</span>
                    </div>
                  )}
                  {sellerProfile.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{sellerProfile.phoneNumber}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>Verified Seller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Contact available</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Seller Information
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {sellerProfile ? (
                <>
                  <p>{sellerProfile.description}</p>
                  {sellerProfile.website && (
                    <p className="mt-2">
                      <a
                        href={sellerProfile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        Visit Website
                      </a>
                    </p>
                  )}
                </>
              ) : (
                <p>This seller is verified and trusted by our platform.</p>
              )}
              <p className="mt-2">
                Click &quot;View Store&quot; to see all products from this seller.
              </p>
            </div>
          </div>
        </div>

        {/* View More Products */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link href={`/seller/${seller._id}`}>
            <Button variant="outline" className="w-full">
              View All Products from This Seller
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
