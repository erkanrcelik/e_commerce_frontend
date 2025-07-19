import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductListingLayout } from '@/components/product/listing'
import { getCategoryBySlug } from '@/services/category.service'
import { getProductsByCategory } from '@/services/product.service'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found - playableFactory',
      description: 'The requested category could not be found.',
    }
  }

  return {
    title: `${category.name} - playableFactory`,
    description: category.description || `Browse ${category.name} products`,
    keywords: [category.name, 'category', 'products', 'shop'],
  }
}

/**
 * Category Page
 * 
 * Dynamic category page with product listing.
 * 
 * Features:
 * - Category-specific product listing
 * - Advanced filtering and sorting
 * - Search functionality
 * - Pagination
 * - Category indicators and badges
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  
  if (!category) {
    notFound()
  }

  const productsResponse = await getProductsByCategory(slug)

  return (
    <ProductListingLayout
      initialProducts={productsResponse.products}
      title={category.name}
      description={category.description || `${category.name} kategorisindeki ürünleri keşfedin`}
      showCampaigns={true}
    />
  )
} 
