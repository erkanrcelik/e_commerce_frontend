'use client'

import { CheckCircle, Heart, RotateCcw, Share2, Shield, Star, Truck } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Product } from '@/types/product'

import { CampaignInfo } from './campaign-info'
import { ProductImageGallery } from './product-image-gallery'
import { ProductReviews } from './product-reviews'
import { ProductSpecifications } from './product-specifications'
import { SellerInfo } from './seller-info'
import { SellerProducts } from './seller-products'

/**
 * Product Detail Page Props
 */
interface ProductDetailPageProps {
  /** Product to display */
  product: Product
  /** Related products to show */
  relatedProducts: Product[]
}

/**
 * Product Detail Page Component
 * 
 * Comprehensive product detail page with modern design.
 * 
 * Features:
 * - Product image gallery with zoom
 * - Product information and pricing
 * - Customer reviews with ratings
 * - Add to cart with quantity selector
 * - Product specifications table
 * - Related products carousel
 * - Seller information card
 * - Campaign details banner
 * - Social sharing
 * - Wishlist functionality
 * 
 * @example
 * ```tsx
 * <ProductDetailPage
 *   product={product}
 *   relatedProducts={relatedProducts}
 * />
 * ```
 */
export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link href="/" className="hover:text-purple-600">Home</Link></li>
            <li>/</li>
            <li><Link href={`/categories/${product.category?.slug}`} className="hover:text-purple-600">{product.category?.name}</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <ProductImageGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Campaign Badge */}
            {product.isOnSale && (
              <CampaignInfo 
                discountPercentage={discountPercentage}
                originalPrice={product.originalPrice}
              />
            )}

            {/* Product Title & Rating */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.averageRating} ({product.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <Badge variant="destructive" className="text-sm">
                    {discountPercentage}% Off
                  </Badge>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.isInStock ? (
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <span className="text-sm font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Product Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3"
                    >
                      -
                    </Button>
                    <span className="px-4 py-2 text-sm font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.isInStock}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWishlist}
                  className="px-4"
                  size="lg"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="px-4"
                  size="lg"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Over $150</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Secure Payment</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">SSL protected</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Easy Return</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Within 14 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Seller Information */}
        <SellerInfo />

        <Separator className="my-12" />

        {/* Product Specifications */}
        <ProductSpecifications product={product} />

        <Separator className="my-12" />

        {/* Customer Reviews */}
        <ProductReviews product={product} />

        <Separator className="my-12" />

        {/* Seller Products */}
        <SellerProducts 
          products={relatedProducts}
          seller={{
            id: 'seller-1',
            name: 'TechStore',
            slug: 'techstore'
          }}
        />
      </div>
    </div>
  )
} 