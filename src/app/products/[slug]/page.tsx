import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductDetailPage } from '@/components/product/detail'
import { CustomerProductService } from '@/services/customer-product.service'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    // Use the slug as product ID directly
    const product = await CustomerProductService.getProduct(slug)

    return {
      title: `${product.name} - playableFactory`,
      description: product.description || `Discover ${product.name}`,
      keywords: [product.name, product.category?.name, 'product', 'shopping'],
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.imageUrls,
      },
    }
  } catch (error) {
    console.error('  Failed to generate product metadata:', error)
    return {
      title: 'Product Not Found - playableFactory',
      description: 'The product you are looking for was not found.',
    }
  }
}

/**
 * Product Detail Page
 *
 * Dynamic product detail page with comprehensive product information.
 * Uses product ID directly from URL slug.
 * Only shows data that is returned by the API.
 *
 * Features:
 * - Product image gallery
 * - Product information and pricing
 * - Customer reviews section
 * - Add to cart functionality
 * - Product specifications
 * - Related products
 * - Seller information from product API
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  try {
    // Use the slug as product ID directly
    const product = await CustomerProductService.getProduct(slug)

    return <ProductDetailPage product={product} />
  } catch (error) {
    console.error('  Failed to fetch product data:', error)
    notFound()
  }
}
