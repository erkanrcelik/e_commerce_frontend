import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductDetailPage } from '@/components/product/detail'
import { getProductBySlug, getProductsByCategory } from '@/services/product.service'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    return {
      title: 'Ürün Bulunamadı - playableFactory',
      description: 'Aradığınız ürün bulunamadı.',
    }
  }

  return {
    title: `${product.name} - playableFactory`,
    description: product.description || `${product.name} ürününü keşfedin`,
    keywords: [product.name, product.category?.name, 'ürün', 'alışveriş'],
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map(img => img.url),
    },
  }
}

/**
 * Product Detail Page
 * 
 * Dynamic product detail page with comprehensive product information.
 * 
 * Features:
 * - Product image gallery
 * - Product information and pricing
 * - Customer reviews section
 * - Add to cart functionality
 * - Product specifications
 * - Related products
 * - Seller information
 * - Campaign details
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }

  // Get related products from same category
  const relatedProductsResponse = await getProductsByCategory(product.categoryId)
  const relatedProducts = relatedProductsResponse.products
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
    />
  )
} 