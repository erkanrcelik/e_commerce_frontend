import type { Metadata } from 'next'

import { SellerPage } from '@/components/seller/seller-page'
import { getProductsByCategory } from '@/services/product.service'

export const metadata: Metadata = {
  title: 'Satıcı Profili - playableFactory',
  description: 'Satıcı bilgileri ve ürünleri',
  keywords: ['satıcı', 'profil', 'ürünler'],
}

/**
 * Seller Profile Page
 * 
 * Displays seller information and products
 */
export default async function SellerPageComponent() {
  // Mock seller data
  const seller = {
    id: 'seller-1',
    name: 'TechStore',
    slug: 'techstore',
    description: 'Premium electronics and gadgets store with the latest technology products.',
    rating: 4.8,
    totalReviews: 1247,
    totalProducts: 1250,
    memberSince: '2020',
    location: 'New York, USA',
    phone: '+1 555 123 4567',
    email: 'info@techstore.com',
    website: 'https://techstore.com',
    verified: true,
    responseTime: '2 hours',
    shippingTime: '1-2 business days',
    returnPolicy: '14 days',
    categories: ['Electronics', 'Smartphones', 'Laptops', 'Headphones']
  }

  // Get seller's products (mock data - all electronics products)
  const productsResponse = await getProductsByCategory('electronics')
  const sellerProducts = productsResponse.products

  return (
    <SellerPage
      seller={seller}
      products={sellerProducts}
    />
  )
} 