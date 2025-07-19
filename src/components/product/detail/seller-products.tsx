import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Product } from '@/types/product'

/**
 * Seller Products Props
 */
interface SellerProductsProps {
  /** Products from the same seller */
  products: Product[]
  /** Seller information */
  seller: {
    id: string
    name: string
    slug: string
  }
}

/**
 * Seller Products Component
 * 
 * Displays other products from the same seller.
 * 
 * Features:
 * - Seller's product carousel
 * - Product cards with pricing
 * - Navigation to seller page
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <SellerProducts 
 *   products={sellerProducts}
 *   seller={seller}
 * />
 * ```
 */
export function SellerProducts({ products, seller }: SellerProductsProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {seller.name} Diğer Ürünleri
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bu satıcının {products.length} ürünü daha
            </p>
          </div>
        </div>
        <Link href={`/seller/${seller.slug}`}>
          <Button variant="outline" size="sm">
            Tüm Ürünleri Gör
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                <Image
                  src={product.images[0]?.url || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 space-y-1">
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white text-xs">
                      Yeni
                    </Badge>
                  )}
                  {product.isOnSale && (
                    <Badge variant="destructive" className="text-xs">
                      İndirim
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 bg-white/80 dark:bg-gray-800/80">
                    <span className="sr-only">Favorilere Ekle</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      ({product.totalReviews})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900 dark:text-white">
                        ₺{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₺{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* View All Products */}
      <div className="text-center">
        <Link href={`/seller/${seller.slug}`}>
          <Button variant="outline" size="lg">
            {seller.name} Tüm Ürünlerini Gör ({products.length + 1} ürün)
          </Button>
        </Link>
      </div>
    </div>
  )
} 