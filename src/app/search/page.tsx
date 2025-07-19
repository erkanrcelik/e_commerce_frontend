import type { Metadata } from 'next'

import { ProductListingLayout } from '@/components/product/listing'
import { getProducts } from '@/services/product.service'

export const metadata: Metadata = {
  title: 'Ürün Arama - playableFactory',
  description: 'Aradığınız ürünleri bulun ve karşılaştırın.',
}

/**
 * Search Page
 * 
 * Global search page with product listing.
 * 
 * Features:
 * - Search functionality
 * - Advanced filtering and sorting
 * - Pagination
 * - Search results display
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const searchQuery = searchParams.q || ''
  
  const productsResponse = await getProducts({
    search: searchQuery,
    page: 1,
    limit: 12
  })

  return (
    <ProductListingLayout
      initialProducts={productsResponse.products}
      title={searchQuery ? `"${searchQuery}" için arama sonuçları` : 'Ürün Arama'}
      description={searchQuery ? `"${searchQuery}" ile ilgili ürünler` : 'Aradığınız ürünleri bulun ve karşılaştırın'}
      showCampaigns={true}
      initialSearchQuery={searchQuery}
    />
  )
} 