import { Building2, Mail, MapPin, Phone, Star } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

/**
 * Seller Info Component
 * 
 * Displays seller information for a product
 */
export function SellerInfo() {
  // Mock seller data
  const seller = {
    id: 'seller-1',
    name: 'TechStore',
    rating: 4.8,
    totalReviews: 1247,
    location: 'İstanbul, Türkiye',
    phone: '+90 212 555 0123',
    email: 'info@techstore.com',
    verified: true,
    memberSince: '2020',
    totalProducts: 1250
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Satıcı Bilgileri
        </h2>
        <Link href={`/seller/${seller.id}`}>
          <Button variant="outline" size="sm">
            Satıcı Sayfasına Git
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seller Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {seller.name}
                  </h3>
                  {seller.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Doğrulanmış
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Üye olma: {seller.memberSince}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {seller.rating}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({seller.totalReviews} değerlendirme)
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Toplam {seller.totalProducts} ürün</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">
              İletişim Bilgileri
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {seller.location}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {seller.phone}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {seller.email}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                Satıcı ile İletişime Geç
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 